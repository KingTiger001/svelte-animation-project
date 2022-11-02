<script lang="ts">
  import { page } from '$app/stores'
  import Logo from './Logo.svelte'
  import InlineMenu from '$lib/InlineMenu.svelte'
  import { LOGIN_HREF, GET_STARTED_HREF } from '$lib/config'
  import { throttle } from 'lodash-es'
  import { scrolledDown, scrolledUp } from '$lib/stores'

  let lastScrollTop = 0

  const onScroll = () => {
    const scrollTop = window.scrollY

    if (scrollTop < lastScrollTop) {
      $scrolledDown = undefined
      $scrolledUp = true
    } else {
      $scrolledUp = undefined
      $scrolledDown = true
    }

    lastScrollTop = scrollTop
  }
</script>

<svelte:window on:scroll={throttle(() => onScroll(), 200)} />

<nav>
  <a class="logo" href="/">
    <!-- primary = text-dark, secondary = text-white -->
    <Logo primaryColor="rgb(39, 37, 46)" secondaryColor="rgb(255, 255, 255)" />
  </a>
  <input id="menu-toggle" type="checkbox" />
  <label for="menu-toggle" aria-label="Toggle menu">
    <span class="menu-button" aria-hidden="true" />
  </label>
  <ul>
    <li><a href="/#howitworks">How It Works</a></li>
    <!-- <li><a href="">Savings Calculator</a></li> -->
  </ul>
  <ul>
    <li>
      <a class="btn btn-secondary" href={LOGIN_HREF} rel="external">Log In</a>
    </li>
    <li><a class="btn btn-primary" href={GET_STARTED_HREF} rel="external">Get started</a></li>
  </ul>
  {#if ['privacy', 'terms', 'firefly'].includes($page.routeId)}
    <div>
      <InlineMenu />
    </div>
  {/if}
</nav>

<style lang="postcss">
  nav {
    @apply grid grid-cols-6 items-center bg-yellow;
    @apply absolute w-full z-40;
    @screen md {
      @apply static;
    }
  }
  .logo {
    @apply inline-block col-start-1 col-span-4;
    width: 200px;
    @apply pb-6;
    @apply translate-y-[1.15rem];
    @screen md {
      @apply col-start-3 col-span-2 ml-2 pb-8;
      /* since only a single item */
      @apply mx-auto;
    }
    @screen md {
      width: 240px;
    }
    /* exclude when only a single item */
    /* @screen lg {
      @apply ml-24;
    } */
  }
  input {
    display: none;
    @screen md {
      display: none;
    }
  }
  label {
    @apply relative cursor-pointer;
    @apply col-start-6 justify-self-end flex items-center bg-yellow-dark bg-opacity-10;
    width: 60px;
    height: 44px;
    border-radius: 6px;
    @screen md {
      display: none;
    }
  }
  label:hover {
    @apply bg-yellow-dark;
  }
  .menu-button,
  .menu-button::before,
  .menu-button::after {
    @apply w-[24px] h-[2.5px] mx-auto;
    @apply bg-current;
    @apply rounded-sm;
    @media (prefers-reduced-motion: no-preference) {
      @apply transition-all duration-300;
    }
  }
  .menu-button {
    @apply relative;
  }
  .menu-button::before,
  .menu-button::after {
    content: '';
    @apply absolute;
  }
  .menu-button::before {
    @apply -translate-y-1.5;
  }

  .menu-button::after {
    @apply translate-y-1.5;
  }
  input:checked + label > .menu-button::before {
    @apply translate-y-0;
    @apply rotate-[45deg];
  }
  input:checked + label > .menu-button {
    background: rgba(255, 255, 255, 0);
  }
  input:checked + label > .menu-button::after {
    @apply translate-y-0;
    @apply rotate-[-45deg];
  }
  ul {
    @apply box-border list-none;
    @apply inline-flex;
    @screen md {
      @apply flex;
    }
  }
  input:checked ~ ul:first-of-type {
    @apply my-2;
  }
  input:checked ~ ul:nth-of-type(2) {
    @apply mt-2 mb-4;
  }
  input:checked ~ div {
    @apply py-4;
  }
  input:not(:checked) ~ div {
    @screen md {
      @apply py-4;
    }
  }
  ul:first-of-type {
    @apply col-start-1 col-span-full text-base flex-col;
    font-size: 16px;
    line-height: 28px;
    @screen md {
      @apply col-start-1 col-span-2 flex-row justify-self-start gap-5 mt-0;
    }
    @screen md {
      grid-row: 1;
    }
  }
  ul:nth-of-type(2) {
    @apply col-start-1 col-span-full flex-col gap-4;
    @screen md {
      @apply col-start-5 col-span-full flex-row justify-self-end mb-0;
    }
    @screen md {
      grid-row: 1;
    }
  }
  li {
    @apply p-0 text-center;
  }
  li:hover {
    @apply text-white;
  }
  ul:first-of-type li {
    @apply my-1;
  }
  a {
    @apply inline-block no-underline;
    @screen md {
      display: initial;
    }
  }
  .btn-primary {
    @apply text-white;
  }
  ul,
  div :global(ul) {
    @apply overflow-hidden max-h-screen;
    @media (prefers-reduced-motion: no-preference) {
      @apply transition-all duration-300;
    }
    @screen md {
      @apply overflow-visible;
    }
  }
  input:not(:checked) ~ ul,
  input:not(:checked) ~ div :global(ul) {
    @apply max-h-0;
    @screen md {
      @apply max-h-screen;
    }
  }
  div {
    @apply relative col-span-full;
  }
  div::before {
    content: '';
    @apply absolute w-screen left-0 top-0 bottom-0 z-10;
    @apply -translate-x-[var(--padding)];
    @apply bg-white;
    /* cover stray pixel at bottom */
    @apply translate-y-px;
  }
</style>
