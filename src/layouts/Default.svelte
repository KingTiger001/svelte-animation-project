<!--
TypeScript is not supported in MDsveX pre 1.0
@see https://github.com/pngwn/MDsveX/issues/357
@see https://github.com/pngwn/MDsveX/issues/116

Workaround: just wrap the required layout with a vanilla JS layout.
 -->
<script>
  // @ts-nocheck
  import Legal from './Legal.svelte'

  export let layout
</script>

{#if layout === 'legal'}
  <Legal {...$$props}>
    <slot />
  </Legal>
{:else}
  <slot />
{/if}
