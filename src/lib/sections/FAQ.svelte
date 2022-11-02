<script lang="ts">
  import Carousel from '$lib/Carousel.svelte'
  import Clock from '$lib/icons/Clock.svelte'
  import ArrowUp from '$lib/icons/ArrowUp.svelte'
  import ArrowDown from '$lib/icons/ArrowDown.svelte'
  import { GET_STARTED_HREF } from '$lib/config'

  interface FAQ {
    q: string
    a: string
  }

  const faqs: FAQ[] = [
    {
      q: 'Whoa my bill sure is high! How much will I spend tomorrow?',
      a: 'Like a pricetag at the grocery store, we can tell you the cost of your energy choices in advance.'
    },
    {
      q: 'How am I supposed to know which is the right power company for me? There are too many options.',
      a: 'Exactly! Let us choose the most cost-effective energy provider for you.'
    },
    {
      q: 'I want to lower my bills but feel lost, and I am too busy!',
      a: 'Many approaches to energy savings fail for this reason. EnergyBill simplifies your life.'
    },
    {
      q: 'How much will I actually save by turning up the temperature a few degrees?',
      a: 'We will tell you, to the penny.'
    },
    {
      q: 'Can I do anything more with all these "smart" devices, or are they just trendy gadgets?',
      a: 'EnergyBill brings true intelligence to your smart home.'
    }
  ]

  let or: HTMLDivElement

  const onStop = () => {
    or.classList.remove('animate')
  }

  const onStart = () => {
    or.classList.remove('animate')
    // eslint-disable-next-line no-unused-expressions
    or.offsetHeight // Trigger a reflow, flushing the CSS changes
    or.classList.add('animate')
  }
</script>

<h1>Ever wondered...</h1>

<div class="ol" role="list" aria-label="List of FAQs">
  <div class="fade" aria-hidden="true" />
  <div class="or" aria-hidden="true">
    <!-- back -->
    <div>Or ...</div>
    <!-- front -->
    <div bind:this={or} class="animate">Or ...</div>
  </div>
  <Carousel
    direction="vertical"
    autoplay={true}
    autoplayDuration={5500}
    on:stop={onStop}
    on:start={onStart}
  >
    {#each faqs as faq}
      <div class="li" role="listitem">
        <h2>{faq.q}</h2>
        <p>{faq.a}</p>
      </div>
    {/each}
    <button slot="prev" aria-label="Previous">
      <ArrowUp />
    </button>
    <button slot="next" aria-label="Next">
      <ArrowDown />
    </button>
  </Carousel>
  <div class="firefly-ne" aria-hidden="true" />
  <div class="firefly-sw" aria-hidden="true" />
</div>

<p>You bet, we've heard it many times! Let us help you better manage your energy comsumption.</p>

<a class="btn" href={GET_STARTED_HREF} rel="external">Get started</a>

<p>
  <span aria-hidden="true">
    <Clock />
  </span>
  Open an account in minutes
</p>

<style lang="postcss">
  h1 {
    @apply pt-20 font-bold text-center;
    font-size: 40px;
    line-height: 54px;
    @screen md {
      @apply pt-40;
    }
    @screen md {
      font-size: 58px;
      line-height: 82px;
    }
  }
  .ol {
    @apply relative pt-8 mx-auto font-bold overflow-hidden;
    height: 24.5rem;
    max-width: calc(510px + 10rem);
    @screen md {
      @apply pt-12 px-20;
    }
  }
  /* the absolutely positioned elements */
  .fade,
  .or {
    @screen md {
      /* inherit padding and offset this */
      @apply px-[inherit] -translate-x-20;
    }
  }
  .fade {
    @apply absolute w-full h-full z-10 pointer-events-none;
    background-image: linear-gradient(
      rgba(var(--color-dark-rgb), 1) 0%,
      rgba(var(--color-dark-rgb), 0) 8%,
      rgba(var(--color-dark-rgb), 0) 70%,
      rgba(var(--color-dark-rgb), 0.65) 80%,
      rgba(var(--color-dark-rgb), 1) 100%
    );
    /* cover the parent padding */
    --padding-top: 2rem;
    height: calc(100% + var(--padding-top));
    @apply -translate-y-[var(--padding-top)];
    @screen md {
      --padding-top: 3rem;
    }
  }
  .li {
    @apply mb-12 px-8 py-6 rounded-2xl bg-yellow-dark;
    /* height: 204px; */
    height: 235px;
    font-size: 18px;
    line-height: 24px;
    @screen md {
      @apply px-16 py-8;
    }
    @screen md {
      font-size: 18px;
      line-height: 28px;
      height: 250px;
    }
    @screen lg {
      font-size: 20px;
      line-height: 30px;
    }
  }
  .li > h2 {
    @apply font-black;
  }
  .li > p {
    @apply pt-5 text-yellow;
  }
  .ol + p {
    @apply pt-12 pb-8 mx-auto font-bold text-center;
    max-width: 590px;
    font-size: 18px;
    line-height: 30px;
    @screen md {
      @apply pt-16;
    }
    @screen md {
      font-size: 21px;
      line-height: 30px;
    }
  }
  a,
  a:visited {
    @apply block w-max mx-auto text-dark bg-yellow;
  }
  a:hover {
    @apply text-white bg-yellow-dark;
  }
  .ol ~ p:last-of-type {
    @apply mt-4 mb-20 font-open-sans text-center text-yellow flex items-center justify-center gap-1;
    font-size: 16px;
    line-height: 28px;
    @screen md {
      @apply mb-10;
    }
  }
  span {
    @apply inline-block h-6 w-6;
  }
  :global(.carousel-controls) {
    @apply absolute -right-14 text-green-light overflow-visible;
    top: 5.25rem;
  }
  button {
    @apply hidden;
    @screen md {
      @apply inline-block;
    }
  }
  button > :global(svg) {
    @apply w-10 h-10;
  }
  .or {
    @apply absolute w-full py-3 mx-auto pointer-events-none;
    margin-top: 14.5rem;
    font-size: 20px;
    line-height: 32px;
    @screen md {
      margin-top: 15.25rem;
    }
  }
  .or > :nth-child(1) {
    @apply w-max mx-auto text-yellow;
  }
  .or > :nth-child(2) {
    @apply absolute w-max m-auto py-[inherit] left-0 right-0 top-0 bottom-0 text-green-light;
    clip-path: inset(0 0 0 0%);
  }
  @media (prefers-reduced-motion: no-preference) {
    .animate {
      animation: progress 5.5s linear 0s;
    }
    @keyframes progress {
      0% {
        clip-path: inset(0 0 0 0%);
      }
      100% {
        clip-path: inset(0 0 0 100%);
      }
    }
  }
  .firefly-ne,
  .firefly-sw {
    @apply hidden;
    @apply relative z-20;
    @screen md {
      display: block;
      background: url('/images/firefly.svg');
    }
  }
  .firefly-ne {
    @screen md {
      @apply w-20 h-20 transform -rotate-45;
    }
    @screen md {
      margin-left: auto;
      top: -22rem;
      right: -3rem;
    }
  }
  .firefly-sw {
    @screen md {
      @apply w-12 h-12 transform rotate-45;
    }
    @screen md {
      top: -12.75rem;
      left: -4.5rem;
    }
  }
</style>
