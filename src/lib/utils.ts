/**
 * Returns the sum of element margins.
 * @param element element
 * @param properties margin properties to include
 * @returns the margin sum
 */
const margins = (element: Element, properties: string[]): number => {
  const style = window.getComputedStyle(element)

  return properties
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, 0)
}

/**
 * Returns the element width including margins.
 * @param element element
 * @returns the outer height
 */
export const outerWidth = (element: Element): number => {
  return (
    (element instanceof HTMLElement ? element.offsetWidth : 0) +
    (element instanceof SVGElement ? element.clientWidth : 0) +
    margins(element, ['left', 'right'])
  )
}

/**
 * Returns the element height including margins.
 * @param element element
 * @returns the outer height
 */
export const outerHeight = (element: HTMLElement): number => {
  return (
    (element instanceof HTMLElement ? element.offsetHeight : 0) +
    (element instanceof SVGElement ? element.clientHeight : 0) +
    margins(element, ['top', 'bottom'])
  )
}
