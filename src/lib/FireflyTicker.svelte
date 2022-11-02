<div class="contracts">
  <img
    src="/images/intro/contracts.svg"
    alt="List of energy contract price charts"
    width="560"
    height="520"
  />
  <img src="/images/intro/pipe.svg" alt="" width="91" height="31" aria-hidden="true" />
</div>


</div>

<style lang="postcss">
  .contracts {
    @apply absolute top-24 right-0;
    /* position of contracts ticker */
    --width: min(50%, 280px);
    --right: min(14%, 40px);
    width: calc(var(--width) + var(--right));
  }
  .contracts > img,
  .contracts::after {
    width: calc(100% - var(--right));
  }
  .contracts > img:first-of-type {
    @apply opacity-20;
  }
  /* fader */
  .contracts::after {
    @apply absolute;
    top: 0;
    content: '';
    z-index: 1;
    pointer-events: none;
    background-image: linear-gradient(
      rgba(var(--color-yellow-rgb), 1) 0%,
      rgba(var(--color-yellow-rgb), 0) 100%
    );
    height: 2em;
  }
  /* pipe */
  .contracts > img:last-of-type {
    width: calc(50% + var(--right) / 2);
    margin-left: calc((100% - var(--right)) / 2);
    /* reduce gap between ticker and pipe */
    transform: translateY(-2px);
  }
  .firefly {
    @apply absolute right-0 bottom-0 overflow-hidden;
    --width: min(60%, 1238px);
    width: var(--width);
    --right: calc(var(--width) * -0.188082177393946);
  }
  /* main */
  .firefly > img {
    @apply relative;
    right: var(--right);
  }
</style>
