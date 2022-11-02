<script lang="ts">
  export let step: number
  export let bind: HTMLObjectElement = null

  const onClick = (e: MouseEvent) => {
    const copy = new MouseEvent(e.type, e)
    bind.dispatchEvent(copy)
  }

  const onLoad = () => {
    bind.contentDocument.documentElement.onclick = onClick
  }
</script>

<!-- pass the `click` event upwards -->
<object
  bind:this={bind}
  type="image/svg+xml"
  data="/images/how-it-works/steps.svg"
  title=""
  on:load={onLoad}
  on:click
>
  <param name="class" value="step{step}" />
</object>
