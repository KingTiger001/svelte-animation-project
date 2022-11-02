<script lang="ts">
  import Intro from '$lib/sections/Intro.svelte'
  import Divider from '$lib/sections/Divider.svelte'
  import HowItWorks from '$lib/sections/HowItWorks.svelte'
  import Overview from '$lib/sections/Overview.svelte'
  import FAQ from '$lib/sections/FAQ.svelte'
</script>

<section id="intro">
  <Intro />
</section>
<Divider />
<section id="howitworks">
  <HowItWorks />
</section>
<section id="overview">
  <Overview />
</section>
<section id="faq">
  <FAQ />
</section>

<style lang="postcss">
  section {
    @apply relative;
  }
  #intro {
    @apply bg-yellow pb-6 overflow-hidden;
    @screen md {
      @apply pb-20;
    }
  }
  #howitworks {
    @apply bg-green-light pt-20;
  }
  #overview {
    @apply bg-yellow py-20 overflow-hidden;
  }
  #faq {
    @apply text-green-light bg-dark;
    padding-bottom: 0.01rem;
  }
</style>
