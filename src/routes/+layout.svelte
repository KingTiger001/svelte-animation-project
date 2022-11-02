<script lang="ts">
  import SEO from '$lib/SEO.svelte'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'

  import { scrolledDown, scrolledUp } from '$lib/stores'
  import { throttle } from 'lodash-es'

  import '$css/tailwind.css'

  import '$fonts/ProximaNova.css'
  import '@fontsource/inter/variable.css'
  import '@fontsource/open-sans/variable.css'
  import '@fontsource/roboto-slab/variable.css'

  const fontsPreload = [
    import('$fonts/ProximaNova-Regular.woff2'),
    import('$fonts/ProximaNova-Bold.woff2'),
    import('@fontsource/inter/files/inter-latin-variable-wghtOnly-normal.woff2'),
    import('@fontsource/open-sans/files/open-sans-latin-variable-wghtOnly-normal.woff2'),
    import('@fontsource/roboto-slab/files/roboto-slab-latin-variable-wghtOnly-normal.woff2')
  ]

  let header: HTMLElement
  const stickyOffset = 400
  let sticky = false
  let forceSticky = false
  let scrolling: Boolean | undefined = true
</script>

<svelte:window
  on:scroll={throttle(() => {
    // activate sticky when `stickyOffset` past the height of the header
    // (this gives the browser time to process the scroll events)
    sticky = forceSticky || window.scrollY > header.clientHeight + stickyOffset
    // force sticky when scrolling back up to the top (through the header)
    forceSticky ||= sticky
    scrolling = window.scrollY <= header.clientHeight
    // reset when back at the top
    if (window.scrollY === 0) {
      sticky = false
      forceSticky = false
    }
  }, 200)}
/>

<svelte:head>
  {#await Promise.all(fontsPreload) then fonts}
    {#each fonts as font}
      {@const href = font.default}
      {@const type = `font/${href.split('.').pop()}`.toLowerCase()}
      <link rel="preload" {href} as="font" {type} crossOrigin="anonymous" />
    {/each}
  {/await}
</svelte:head>

<SEO />

<header
  bind:this={header}
  class:sticky
  class:scrolling
  class:scrolled-down={$scrolledDown}
  class:scrolled-up={$scrolledUp}
>
  <Nav />
</header>

<main>
  <slot />
</main>

<footer>
  <Footer />
</footer>

<style lang="postcss">
  :global(html) {
    /* this fixes a 100vw issue, removing the horizontal scrollbar */
    @apply overflow-x-hidden;
  }
  :global(body) {
    @apply flex flex-col min-h-screen;
    @apply m-0 font-roboto-slab text-dark;
    min-width: 300px;
    --max-content-width: 1200px;
    --color-dark-rgb: 39, 37, 46;
    --color-dark-level1-rgb: 52, 50, 59;
    --color-dark-level2-rgb: 58, 56, 66;
    --color-yellow-rgb: 230, 178, 9;
    --color-yellow-dark-rgb: 99, 71, 0;
    --color-blue-rgb: 32, 165, 214;
    --color-green-rgb: 137, 176, 39;
    --color-green-light-rgb: 209, 240, 219;
    --color-purple-rgb: 123, 97, 255;
    --color-red-rgb: 244, 116, 87;
  }
  header :global(nav),
  main :global(section),
  footer {
    --content-padding: 1rem;
    --padding: var(--content-padding);
    padding-left: var(--padding) !important;
    padding-right: var(--padding) !important;
    @screen sm {
      --content-padding: max(calc((100% - var(--max-content-width)) / 2), 1rem);
    }
  }
  header {
    /* nav height since it's absolute position */
    @apply h-[71.3167px];
    @screen md {
      @apply h-[unset];
    }
  }
  header,
  header > :global(nav) {
    @apply transition-transform duration-300 ease-in-out;
  }
  header.sticky {
    @apply top-0 z-40;
  }
  header:not(.sticky),
  header:not(.sticky) > :global(nav) {
    /* stops bare background when scrolling to top quickly */
    @apply transition-none;
  }
  header:not(.scrolling):not(.sticky),
  .sticky.scrolled-down:not(.scrolling),
  .sticky.scrolled-down:not(.scrolling) > :global(nav) {
    /* need to include mobile menu dropdown */
    @apply -translate-y-[600%];
    @screen sm {
      @apply -translate-y-full;
    }
  }
  .sticky.scrolled-up {
    @apply translate-y-0;
  }
  main {
    @apply relative grow;
  }
</style>
