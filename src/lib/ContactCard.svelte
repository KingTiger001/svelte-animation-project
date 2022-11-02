<script lang="ts">
  import Email from '$lib/icons/Email.svelte'
  import Phone from '$lib/icons/Phone.svelte'

  export let type: 'email' | 'phone'
  export let href: string
</script>

<a {href} {...$$restProps}>
  <span>
    {#if type === 'email'}
      <Email />
    {:else if type === 'phone'}
      <Phone />
    {/if}
  </span>
  <h1><slot name="title">Title</slot></h1>
  <p><slot name="description">Description</slot></p>
  <p><slot name="action">Action</slot></p>
  <slot />
</a>

<style lang="postcss">
  a {
    @apply inline-block;
    --padding: 1.5rem !important;
    @apply px-6 py-6;
    @apply bg-white rounded-lg;
  }
  span {
    @apply w-12 h-12 p-3 rounded-lg z-20;
    @apply text-white bg-yellow;
    @apply flex justify-center items-center;
  }
  h1 {
    @apply pt-16;
    @apply font-bold text-2xl leading-9;
  }
  p {
    @apply font-proxima-nova text-lg leading-6;
    @screen sm {
      @apply font-proxima-nova text-xl leading-8;
    }
  }
  p:first-of-type {
    @apply pt-2;
  }
  p:nth-of-type(2) {
    @apply pt-5 text-yellow;
  }
  a:hover p:nth-of-type(2) {
    @apply text-yellow-dark;
  }
</style>
