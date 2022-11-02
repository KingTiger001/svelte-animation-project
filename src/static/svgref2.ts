// based on https://dev.w3.org/SVG/modules/ref/master/ref2.js
// we additionally watch for param value changes and apply to the SVG document

/**
 * Set the value of a given element attribute.
 * @param el the element
 * @param attr the attribute
 * @param val the new value
 */
const setElement = (el: Element, attr: Attr, val: string): void => {
  if (el.localName === 'tref') {
    const t = document.createTextNode(val)
    el.parentNode?.replaceChild(t, el)
  } else {
    el.setAttributeNS(attr.namespaceURI, attr.name, val)
  }
}

/**
 * Watch a source element for changes to to a given attribute and
 * apply to the given destination attribute.
 * @param src the source element
 * @param name the source attribute name
 * @param dest the destination element
 * @param attr the destination attribute
 */
const watchElement = (src: Element, name: string, dest: Element, attr: Attr): void => {
  if (src == null) return
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === name) {
        setElement(dest, attr, src.getAttribute(name) ?? '')
      }
    })
  })
  observer.observe(src, { attributes: true })
}

/**
 * Get all references to a given DOM id and replace their values.
 * @param paramEl the source `<param>` element
 * @param id the id
 * @param val the new value
 */
const GetIdRefs = (paramEl: Element, id: string, val: string): void => {
  const elList = document.documentElement.getElementsByTagName('*')
  for (let i = 0, iLen = elList.length; iLen > i; i++) {
    const eachEl = elList.item(i)
    if (eachEl == null) continue
    for (let a = 0, aLen = eachEl.attributes.length; aLen > a; a++) {
      const attr = eachEl.attributes[a]
      if (attr?.value.includes('#' + id)) {
        setElement(eachEl, attr, val)
        watchElement(paramEl, 'value', eachEl, attr)
      }
    }
  }
}

/**
 * Get the parameters and initialise the values within the SVG document.
 */
const GetParams = (): void => {
  if (document?.defaultView == null) return
  const defs = document.getElementsByTagName('defs')[0]

  const refs = []
  const refList = defs.getElementsByTagName('ref')

  for (let r = refList.length - 1; r >= 0; r--) {
    const eachRef = refList.item(r)
    if (eachRef == null) continue
    const id = eachRef.getAttribute('id')
    const paramName = eachRef.getAttribute('param')
    let defaultVal = eachRef.getAttribute('default')
    if (defaultVal === '') {
      defaultVal = eachRef.firstChild?.nodeValue ?? ''
    }

    if (paramName != null) refs[paramName] = [eachRef, id, defaultVal, null, null]
  }

  const url = new URL(document.defaultView.location.href)
  url.searchParams.forEach((value, name) => {
    refs[name][2] = value
  })

  if (document.defaultView.frameElement !== null) {
    const params = document.defaultView.frameElement.getElementsByTagName('param')

    for (let i = 0, iLen = params.length; iLen > i; i++) {
      const eachParam = params[i]
      const name = eachParam.getAttribute('name')
      const value = eachParam.getAttribute('value')

      if (name == null) continue

      refs[name][2] = value
      refs[name][3] = eachParam
    }
  }

  Object.values(refs).forEach((eachParam) => {
    GetIdRefs(eachParam[3], eachParam[1], eachParam[2])
  })
}

GetParams()
