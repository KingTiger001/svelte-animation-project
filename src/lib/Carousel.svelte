<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { outerWidth, outerHeight } from '$lib/utils'

  /** Direction of the carousel, default `horizontal` */
  export let direction: 'horizontal' | 'vertical' = 'horizontal'
  /** CSS transition timing function e.g. `linear`, `ease-in-out` */
  export let timingFunction = 'ease-in-out'
  /** CSS transition duration (ms) */
  export let duration = 500
  export let infinite = true
  export let autoplay = true
  export let autoplayDuration = 5000
  export const autoplayProgress = true
  export let arrows = true

  const dispatch = createEventDispatcher()

  let currentIndex = 0
  let elWrapper: HTMLDivElement
  let elCarousel: HTMLDivElement
  let motion: MediaQueryList
  let autoplayInterval: ReturnType<typeof setInterval>

  $: transitionProperty = direction === 'horizontal' ? 'left' : 'top'
  $: outerSize = direction === 'horizontal' ? outerWidth : outerHeight

  /**
   * Move to a given offset.
   * @param px the offset in `px`
   * @param animate `true` to animate the move, `false` otherwise
   */
  const moveTo = (px: number, animate = true): void => {
    if (elCarousel === undefined) return
    const transition =
      animate && motion?.matches ? `${transitionProperty} ${duration}ms ${timingFunction}` : 'none'
    elCarousel.style.webkitTransition = transition
    elCarousel.style.transition = transition
    elCarousel.style[transitionProperty] = `${px}px`
  }

  /**
   * Move to a given index.
   * @param index the index
   * @param animate `true` to animate the move, `false` otherwise
   */
  const moveToIndex = (index: number, animate = true): void => {
    if (elCarousel === undefined) return
    let offset = 0
    for (let i = 0; i < index; i++) {
      const item = elCarousel.children.item(i) as HTMLElement
      offset -= outerSize(item)
    }
    moveTo(offset, animate)
  }

  const onMove = (direction: number): void => {
    if (elCarousel === undefined) return
    if (infinite) {
      if ([0, elCarousel.children.length - 1].includes(currentIndex + direction)) {
        // (+) elCarousel.children.length - 2 -> 0
        // (-) 1 -> elCarousel.children.length - 1
        currentIndex += -Math.sign(direction) * (elCarousel.children.length - 2)
        moveToIndex(currentIndex, false)
      }
    }
    currentIndex =
      (currentIndex + direction + elCarousel.children.length) % elCarousel.children.length
    moveToIndex(currentIndex)
  }

  const onNext = (): void => {
    resetAutoplay()
    onMove(1)
  }

  const onPrev = (): void => {
    resetAutoplay()
    onMove(-1)
  }

  const stopAutoplay = () => {
    if (autoplayInterval === undefined) return
    dispatch('stop')
    clearInterval(autoplayInterval)
  }

  const resetAutoplay = () => {
    if (!autoplay) return
    stopAutoplay()
    dispatch('start')
    autoplayInterval = setInterval(() => {
      dispatch('start')
      onMove(1)
    }, autoplayDuration)
  }

  onMount(() => {
    motion = window.matchMedia('(prefers-reduced-motion: no-preference)')

    const observer = new ResizeObserver(() => {
      moveToIndex(currentIndex, false)
    })
    observer.observe(elWrapper)

    if (infinite) {
      const children = elCarousel.children
      const firstChild = children[0]
      const lastChild = children[children.length - 1]
      elCarousel.insertBefore(lastChild.cloneNode(true), firstChild)
      elCarousel.insertBefore(firstChild.cloneNode(true), lastChild.nextSibling)
      elCarousel.children[0].ariaHidden = 'true'
      elCarousel.children[elCarousel.children.length - 1].ariaHidden = 'true'
      moveToIndex(++currentIndex, false)
    }

    resetAutoplay()

    return () => {
      stopAutoplay()
      observer.disconnect()
    }
  })
</script>

<div bind:this={elWrapper}>
  <div bind:this={elCarousel}>
    <slot />
  </div>
  <div class="carousel-controls">
    {#if arrows}
      <span on:click={onPrev}>
        <slot name="prev">
          <button>Prev</button>
        </slot>
      </span>
      <span on:click={onNext}>
        <slot name="next">
          <button>Next</button>
        </slot>
      </span>
    {/if}
  </div>
</div>

<style lang="postcss">
  div {
    @apply relative;
  }
  div > div:first-of-type {
    @apply absolute w-full;
  }
  div > div:last-of-type {
    @apply flex flex-col items-end;
  }
  :global(.notransition),
  :global(.notransition) *,
  :global(.notransition *) {
    transition: none !important;
  }
</style>
