<script lang="ts">
  import FireflyTicker from '$lib/FireflyTicker.svelte'
</script>

<div class="container">
  <div>
    <slot />
  </div>
  <aside>
    <FireflyTicker />
  </aside>
</div>

<style lang="postcss">
  .container {
    @screen xl {
      @apply flex;
    }
  }
  .container > div {
    @apply inline-block w-full align-top z-10;
    @screen xl {
      @apply w-1/2;
    }
  }
  aside {
    @apply hidden;
    @screen xl {
      @apply inline-block w-1/2;
    }
  }
</style>
