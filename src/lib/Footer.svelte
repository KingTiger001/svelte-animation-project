<script lang="ts">
  import { page } from '$app/stores'
  import { items } from '$lib/menu'
</script>


<ul aria-label="Menu items">
  {#each items as item}
    {@const itemURL = new URL(item.href, $page.url.origin)}
    {@const current = itemURL.pathname === `/${$page.routeId}` && !itemURL.hash}
    <li aria-current={current ? true : undefined}>
      <a href={item.href} rel={item.external ? 'external' : undefined} sveltekit:prefetch>
        {item.title}
      </a>
    </li>
  {/each}
  <li>© __COPYRIGHT_YEAR__ EnergyBill.com LLC</li>
</ul>

<style lang="postcss">
  ul {
    @apply px-1 py-4 flex flex-col gap-4;
    @screen md {
      @apply flex-row flex-wrap justify-center;
    }
  }
  li {
    @apply inline-block font-inter;
    font-size: 14px;
    line-height: 20px;
    width: max-content;
  }
  li:last-of-type {
    @apply uppercase;
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
