<script lang="ts">
  import { GET_STARTED_HREF } from '$lib/config'
</script>

<div class="wrapper">
  <aside>
    <div class="contracts">
      <img
        src="/images/intro/contracts.svg"
        alt="List of energy contract price charts"
        width="560"
        height="520"
      />
      <img src="/images/intro/pipe.svg" alt="" width="91" height="31" aria-hidden="true" />
    </div>
    <div class="main">
      <span>
        <img
          src="/images/intro/main.svg"
          alt="Firefly lit from spotlight underneath "
          width="2850"
          height="1664"
        />
      </span>
    </div>
  </aside>
  <div>
    <h1>The better way to manage your energy choices</h1>
    <p>
      Turn the tables on energy deregulation! Our patented technology finds the best energy prices
      in the retail market for homes and small businesses, guaranteeing you the lowest possible
      rate, always.
    </p>
    <p>
      We automatically switch you to new providers as needed to keep your bill at the minimum. See
      the cost of your energy usage in advance, manage and pay your bill through us, and never
      signup for an energy company again.
    </p>
    <a class="btn btn-primary" href={GET_STARTED_HREF} rel="external">Get started</a>
    <p>US PATENT #10,073,426 • #10,816,948 • #11,429,075 • more pending</p>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    @apply grid grid-cols-1;
    @screen md {
      @apply grid-cols-2 mt-10;
    }
  }
  aside {
    @screen md {
      @apply col-start-2 row-start-1;
    }
  }
  .wrapper div {
    @apply grid grid-cols-1;
    @screen md {
      @apply col-start-1 row-start-1;
    }
  }
  .contracts {
    --width: min(100%, var(--max-content-width));
  }
  .contracts img,
  .contracts::after {
    @apply absolute top-4 right-4 opacity-20;
    width: calc(var(--width) * 0.38);
    @screen md {
      @apply top-20;
    }
    @screen md {
      width: calc(var(--width) * 0.2333);
    }
    @screen md {
      @apply right-8;
    }
  }
  .contracts::after {
    opacity: initial;
    content: '';
    z-index: 1;
    pointer-events: none;
    background-image: linear-gradient(
      rgba(var(--color-yellow-rgb), 1) 0%,
      rgba(var(--color-yellow-rgb), 0) 100%
    );
    height: 2em;
    @screen sm {
      height: 3em;
    }
    @screen md {
      height: 4em;
    }
  }
  .contracts img:last-of-type {
    width: calc(var(--width) * 0.2333);
    transform: translate(calc(var(--width) * 0.19), calc(var(--width) * 4.41));
    opacity: initial;
    @screen md {
      width: calc(var(--width) * 0.15);
      transform: translate(calc(var(--width) * 0.26), calc(var(--width) * 4.2));
    }
  }
  .main {
    height: 100%;
  }
  .main span {
    @apply relative;
    width: 207.4%;
    top: 2.45rem;
    left: -4.5rem;
    z-index: 2;
    @screen sm {
      left: -7rem;
    }
    @screen md {
      @apply inline-block mt-auto;
    }
    @screen md {
      top: 7.45rem;
      left: -3rem;
    }
  }
  h1 {
    @apply font-bold;
    font-size: 40px;
    line-height: 54px;
    @screen lg {
      @apply mt-6;
    }
    @screen lg {
      font-size: 58px;
      line-height: 72px;
    }
  }
  a {
    @apply inline-block row-start-2 self-center mt-8;
    @screen md {
      @apply row-start-4 mr-auto;
    }
  }
  p {
    @apply py-4 font-proxima-nova text-dark;
    font-size: 18px;
    line-height: 24px;
    @screen md {
      font-size: 20px;
      line-height: 32px;
    }
  }
  p:last-of-type {
    @apply font-open-sans text-yellow-dark;
    @screen md {
      /* add half the bottom padding of section id="intro" */
      @apply translate-y-10;
    }
    @screen lg {
      font-size: 16px;
      line-height: 28px;
    }
  }
</style>
