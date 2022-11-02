<script lang="ts">
  import { onMount } from 'svelte'
  import { outerWidth } from '$lib/utils'
  import { throttle } from 'lodash-es'

  interface Tab {
    title: string
    description: string
  }

  const tabs: Tab[] = [
    {
      title: 'Dissect retail markets',
      description: 'Better understand retail energy markets and how their rate structures work.'
    },
    {
      title: 'Know your energy usage',
      description: 'Learn about your energy usage in terms that you can understand - dollars!'
    },
    {
      title: 'Energy pricetag',
      description: 'Increase the intelligence of your smart appliances with price information.'
    },
    {
      title: 'A smarter home',
      description: 'Leverage your smart thermostat to save money and stay within a home budget.'
    }
  ]

  let idxCurrent = 0
  let list: HTMLDivElement
  let motion: MediaQueryList

  // transition settings
  const DURATION_MS = 1000
  const TIMING_FUNCTION = 'ease-in-out'

  // autoplay
  let interval: ReturnType<typeof setInterval>
  const PAUSE_DURATION_MS = 10000
  let delayUntil: number

  const isMoving = () => window.innerWidth < 768

  const initInterval = () => {
    clearInterval(interval)
    delayUntil = 0
    const ms = isMoving() ? 4000 : 2000
    interval = setInterval(() => next(), ms)
  }

  const moveTo = (idx: number, behavior: 'auto' | 'smooth' = 'smooth'): void => {
    if (!list) return

    if (!isMoving()) {
      if (list.style.left !== '0px') {
        list.style.transition = 'none'
        list.style.left = '0px'
      }
      return
    }
    let offset = 0
    for (let i = 0; i < idx; i++) {
      offset -= outerWidth(list.children.item(i) as HTMLElement)
    }
    list.style.transition =
      behavior === 'smooth' && motion.matches ? `left ${DURATION_MS}ms ${TIMING_FUNCTION}` : 'none'
    list.style.left = `calc(${offset}px - (${idx} * 1rem))`
  }

  const next = () => {
    moveTo(idxCurrent + 1)
    if (idxCurrent === tabs.length - 1) setTimeout(() => moveTo(0, 'auto'), DURATION_MS)
    idxCurrent = (idxCurrent++ + 1) % tabs.length
  }

  const onTabClick = (idx: number) => {
    clearInterval(interval)
    // resume rotation in...
    delayUntil = Date.now() + PAUSE_DURATION_MS
    setTimeout(() => {
      if (Date.now() >= delayUntil && delayUntil !== 0) initInterval()
    }, PAUSE_DURATION_MS)
    moveTo(idx)
    idxCurrent = idx
  }

  const onResize = () => {
    initInterval()
    moveTo(idxCurrent, 'auto')
  }

  onMount(() => {
    motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    initInterval()
    return () => clearInterval(interval)
  })
</script>

<svelte:window on:resize={throttle(() => onResize(), 250)} />

<div class="wrapper">
  <!-- screenshots for md+ -->
  <div>
    {#each tabs as _, i}
      <img
        src="/images/overview/slide{i + 1}.svg"
        alt="Mobile app screenshot for item {i + 1}"
        width="323"
        height="662"
        aria-current={idxCurrent === i ? 'true' : undefined}
      />
    {/each}
  </div>
  <div bind:this={list} role="list" aria-label="List of tabs" style="--items: {tabs.length}">
    {#each tabs as tab, i}
      <div role="listitem" aria-current={idxCurrent === i} on:click={() => onTabClick(i)}>
        <!-- screenshot for md- -->
        <img
          src="/images/overview/slide{i + 1}.svg"
          alt="Mobile app screenshot for item {i + 1}"
          width="323"
          height="662"
        />
        <h2>{tab.title}</h2>
        <p>{tab.description}</p>
      </div>
    {/each}
    <!-- md-: add first item to end for infinite scroll -->
    <div
      role="listitem"
      aria-current={idxCurrent === 0}
      aria-hidden="true"
      on:click={() => onTabClick(0)}
    >
      <img
        src="/images/overview/slide{1}.svg"
        alt="Mobile app screenshot for item {1}"
        width="323"
        height="662"
      />
      <h2>{tabs[0].title}</h2>
      <p>{tabs[0].description}</p>
    </div>
  </div>
  <!-- dots -->
  <div>
    {#each tabs as _, i}
      <span aria-current={idxCurrent === i ? 'true' : undefined} on:click={() => onTabClick(i)} />
    {/each}
  </div>
</div>

<style lang="postcss">
  .wrapper {
    @apply relative;
    @screen md {
      @apply flex items-center;
    }
  }
  .wrapper > div:first-of-type {
    @apply hidden;
    @screen md {
      @apply relative flex items-center;
    }
    @screen md {
      min-width: 50%;
      height: 500px;
      background: url('/images/overview/bg.svg') no-repeat center;
    }
    @screen lg {
      height: 675px;
    }
  }
  .wrapper > div:first-of-type > img {
    @screen md {
      @apply w-auto max-h-full mx-auto;
    }
  }
  .wrapper > div:first-of-type > img:not([aria-current='true']) {
    @screen md {
      @apply hidden;
    }
  }
  .wrapper::before {
    @apply block absolute w-full h-full;
    content: '';
    max-height: 394px;
    background: url('/images/overview/bg.svg') no-repeat top;
    @screen md {
      @apply hidden bg-none;
    }
  }
  [role='list'] {
    @apply relative flex flex-row gap-4;
    --item-width: max(calc(100vw - 2rem), 268px);
    /* #items + 1 for infinite scroll */
    /* item widths + gaps */
    width: calc((var(--items) + 1) * var(--item-width) + var(--items) * 1rem);
    @screen sm {
      --item-width: calc(100vw - 10rem);
    }
    @screen md {
      @apply flex-col flex-grow gap-0 w-full pl-16;
    }
    @screen lg {
      @apply pl-32;
    }
  }
  [role='listitem'] {
    width: var(--item-width);
    min-height: 525px;
    transition: opacity 0.3s ease-in-out;
    @screen md {
      @apply w-full py-6;
    }
    @screen md {
      min-height: initial;
    }
  }
  [role='listitem']:hover {
    @apply cursor-pointer;
  }
  /* infinite scroll - repeat of 1st item */
  [role='listitem']:last-of-type {
    @screen md {
      @apply hidden;
    }
  }
  [role='listitem']:not(:last-of-type):not(:nth-last-of-type(2)) {
    @screen md {
      border-bottom: 1px solid rgba(var(--color-yellow-dark-rgb), 0.3);
    }
  }
  [role='listitem'][aria-current='false'] {
    @screen md {
      @apply opacity-30;
    }
  }
  [role='listitem'] > img {
    @apply w-auto mx-auto;
    max-height: 394px;
    @screen md {
      @apply hidden;
    }
  }
  h2 {
    @apply mt-5 mb-2 font-bold;
    font-size: 24px;
    line-height: 36px;
    @screen md {
      @apply mt-0;
    }
    @screen xl {
      font-size: 32px;
      line-height: 48px;
    }
  }
  img {
  }
  p {
    @apply text-white font-black;
    font-size: 18px;
    line-height: 24px;
    @screen xl {
      font-size: 20px;
      line-height: 32px;
    }
  }
  h2,
  p {
    @apply mx-auto;
    max-width: 375px;
    @screen sm {
      @apply text-center;
    }
    @screen md {
      @apply text-left;
    }
    @screen md {
      max-width: initial;
    }
  }
  .wrapper > div:last-of-type {
    @apply mt-4 flex flex-row justify-center gap-2;
    @screen md {
      @apply hidden;
    }
  }
  span {
    @apply w-9 h-1.5 border-2 rounded border-yellow-dark bg-yellow-dark cursor-pointer transition-colors duration-500;
  }
  span[aria-current='true'] {
    @apply border-white bg-white;
  }
</style>
