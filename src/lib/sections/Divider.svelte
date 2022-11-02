<div>
  <p>
    Acting as your agent, EnergyBill represents you, the consumer. We are not a utility company. Our
    aim is to provide an independent, consumer friendly and simplified process for complete energy
    bill management.
  </p>
</div>

<style lang="postcss">
  div {
    background-image: linear-gradient(
      rgb(var(--color-yellow-rgb)) 0%,
      rgb(var(--color-yellow-rgb)) 50%,
      rgb(var(--color-green-light-rgb)) 50%,
      rgb(var(--color-green-light-rgb)) 100%
    );
  }
  p {
    @apply mx-5 px-8 py-4 rounded-2xl font-bold text-yellow bg-dark-level1;
    height: 100%;
    font-size: 18px;
    line-height: 30px;
    @screen sm {
      @apply mx-auto;
    }
    @screen md {
      @apply px-16 py-12;
    }
    @screen sm {
      max-width: 576px;
    }
    @screen lg {
      @apply px-16 py-12;
    }
    @screen lg {
      max-width: 976px;
      font-size: 21px;
      line-height: 30px;
    }
  }
</style>
