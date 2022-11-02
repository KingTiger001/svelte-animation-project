<script lang="ts">
  import { onMount } from 'svelte'
  import { throttle } from 'lodash-es'
  import Steps from './Steps.svelte'

  const steps: HTMLElement[] = []
  let obj: HTMLObjectElement
  let currentIndex = 0

  const getIndex = (): number => {
    let index = 0
    const rectObj = obj.getBoundingClientRect()
    for (let i = 0; i < steps.length; i++) {
      const rectStep = steps[i].getBoundingClientRect()
      // < md breakpoint
      if (window.innerWidth < 768) {
        // has the bottom quarter of the step element gone past the bottom of the obj
        if (rectStep.bottom - rectStep.height / 4 <= rectObj.bottom) index = Math.min(i + 1, 2)
      } else {
        // has the top quarter of the step element gone past the middle of the obj
        if (rectStep.top + rectStep.height / 4 < rectObj.top + rectObj.height / 2) index = i
      }
    }
    return index
  }

  const updateStepImage = () => {
    currentIndex = getIndex()
  }

  const onScroll = () => updateStepImage()

  const onStepClick = (e: MouseEvent) => {
    if (e.shiftKey) {
      currentIndex = Math.max(currentIndex - 1, 0)
    } else {
      currentIndex = Math.min(currentIndex + 1, 2)
    }
    document.querySelector(`.step${currentIndex + 1}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  onMount(() => {
    updateStepImage()
  })
</script>

<svelte:window on:scroll={throttle(onScroll, 200)} />

<div class="wrapper">
  <!-- this <h1> is used for md- layouts -->
  <h1>How it works</h1>

  <!-- md- sticky wrapper -->
  <!-- md+ wrapper with sticky div -->
  <div class="swrapper" aria-hidden="true">
    <div>
      <div class="firefly" aria-hidden={currentIndex !== 2 ? 'true' : undefined}>
        <img
          src="/images/how-it-works/firefly.svg"
          alt="Firefly"
          width="68"
          height="68"
          aria-hidden="true"
        />
      </div>
      <Steps step={currentIndex + 1} bind:bind={obj} on:click={onStepClick} />
    </div>
    <div class="fader" aria-hidden="true" />
  </div>

  <div
    bind:this={steps[0]}
    class="step step1"
    aria-current={currentIndex === 0 ? 'true' : undefined}
  >
    <!-- this <h1> is used for md+ layouts -->
    <h1 aria-hidden="true">How it works</h1>
    <p>
      People want to save money and promote the environment, but they don't know how, and
      deregulation presents good opportunities for consumers to do both! Texas leads the country in
      wind generation and is on pace to do the same with solar because of the power of consumer
      choice.
    </p>
  </div>

  <p bind:this={steps[1]} class="step step2" aria-current={currentIndex === 1 ? 'true' : undefined}>
    Information is the key. Consumers may not understand how the market works, but we do! We
    constantly monitor the energy markets, leveraging data and technology to make deregulation work
    in your favor.
  </p>

  <p bind:this={steps[2]} class="step step3" aria-current={currentIndex === 2 ? 'true' : undefined}>
    By analyzing your energy usage and other things like weather, we forecast how much energy you’ll
    use and when. We show you the cost impact of your energy choices, automatically choose the
    cheapest energy plan on your behalf, continuously managing your contract enrollment, and much
    more.
  </p>
</div>

<style lang="postcss">
  .wrapper {
    @apply flex flex-col pb-20;
    @screen md {
      @apply grid grid-cols-2 items-center gap-y-8;
    }
    @screen lg {
      @apply gap-y-0;
    }
  }
  h1 {
    @apply font-bold;
    font-size: 40px;
    line-height: 54px;
  }
  .wrapper > h1 {
    @screen md {
      display: none;
    }
  }
  .step {
    @screen md {
      @apply flex flex-col justify-center;
    }
    @screen md {
      min-height: 639px;
    }
  }
  .step:not([aria-current]) p,
  p.step:not([aria-current]) {
    @apply text-dark text-opacity-40;
  }
  .step1 h1 {
    display: none;
    @screen md {
      @apply mb-6;
    }
    @screen md {
      display: initial;
    }
  }
  .step1 {
    @apply mt-12;
    @screen md {
      @apply mt-6 row-start-2 col-start-1;
    }
  }
  .step2 {
    @apply mt-20;
    @screen md {
      @apply m-0 row-start-3 col-start-1;
    }
  }
  .step3 {
    @apply mt-20;
    @screen md {
      @apply m-0 row-start-5 col-start-1;
    }
  }
  .swrapper {
    @apply sticky top-0;
    @screen md {
      @apply static h-full row-start-2 row-end-6 col-start-2;
    }
  }
  .swrapper > div:first-of-type {
    @apply bg-green-light;
    @screen md {
      @apply sticky;
    }
    @screen md {
      height: 639px;
      top: calc((100vh - 639px) / 2);
    }
  }
  .swrapper :global(object) {
    @apply pt-8 mx-auto;
    max-height: 50vh;
    @screen md {
      @apply w-full h-full max-h-full pt-0;
    }
  }
  .swrapper .fader {
    @apply absolute h-16 w-full;
    background-image: linear-gradient(
      rgba(var(--color-green-light-rgb), 1) 0%,
      rgba(var(--color-green-light-rgb), 0) 100%
    );
    @screen md {
      @apply hidden;
    }
  }
  p {
    @apply font-proxima-nova;
    font-size: 18px;
    line-height: 24px;
    @screen md {
      @apply pr-20;
    }
    @screen md {
      font-size: 20px;
      line-height: 32px;
    }
  }
  .firefly {
    @apply relative z-20 h-0 top-8 transition-opacity duration-1000;
    left: 10vw;
    @screen sm {
      left: 15vw;
    }
    @screen md {
      top: 9rem;
      left: -25px;
    }
    @screen lg {
      top: 5rem;
    }
    @screen xl {
      top: 2rem;
    }
  }
  .firefly[aria-hidden] {
    @apply opacity-0;
  }
  .firefly {
    width: 5.33%;
    @screen sm {
      width: 4.33%;
    }
    @screen md {
      width: 8.33%;
    }
  }
</style>
