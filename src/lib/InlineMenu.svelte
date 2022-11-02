<script lang="ts">
  import { page } from '$app/stores'
  import { items } from '$lib/menu'
</script>

<ul aria-label="Links menu">
  {#each items as item}
    {@const itemURL = new URL(item.href, $page.url.origin)}
    {@const current = itemURL.pathname === `/${$page.routeId}` && !itemURL.hash}
    {#if !item.external && !itemURL.hash}
      <li aria-current={current ? true : undefined}>
        <a href={item.href} rel={item.external ? 'external' : undefined} sveltekit:prefetch>
          {item.title}
        </a>
      </li>
    {/if}
  {/each}
</ul>

<style lang="postcss">
  ul {
    @apply flex flex-col items-center gap-4;
    @screen md {
      @apply flex-row flex-wrap justify-center;
    }
  }
  li {
    @apply inline-block w-max z-10;
    @apply font-inter text-sm leading-5;
  }
  li[aria-current] {
    @apply pointer-events-none;
  }
  li[aria-current] > a,
  a:hover {
    @apply text-yellow;
  }
  a[rel='external']:first-of-type {
    @apply font-bold;
  }
</style>
