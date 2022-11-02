<script lang="ts">
  import SplashPage from '$lib/SplashPage.svelte'
  import ContactCard from '$lib/ContactCard.svelte'
</script>

<!-- for background at parent dimensions -->
<div aria-hidden="true" />

<section>
  <SplashPage>
    <h1>We'd love to hear from you</h1>

    <p>Our friendly team is always here to chat.</p>

    <ul>
      <li>
        <ContactCard type="email" href="mailto:questions@energybill.com" rel="external">
          <span slot="title">Send an email</span>
          <span slot="description">Speak to our friendly team</span>
          <span slot="action">questions@energybill.com</span>
        </ContactCard>
      </li>
      <li>
        <ContactCard type="phone" href="tel:+18308226114" rel="external">
          <span slot="title">Call us</span>
          <span slot="description">Mon-Fri from 8AM to 5PM CST</span>
          <span slot="action">+1 (830) 822-6114</span>
          <tel />
        </ContactCard>
      </li>
    </ul>
  </SplashPage>
</section>

<style lang="postcss">
  div::before {
    content: '';
    @apply absolute w-full h-full top-0 bottom-0 -z-10;
    @apply bg-yellow;
  }
  section > :global(div) {
    @apply mx-auto;
  }
  h1 {
    @apply pt-6;
    @apply font-bold text-[40px] leading-[54px];
    @screen sm {
      @apply pt-[2.3rem];
      @apply text-center;
    }
    @screen xl {
      @apply text-[58px] leading-[72px] text-left;
      @apply pt-16;
    }
  }
  p {
    @apply pt-6;
    @apply font-proxima-nova text-lg leading-6;
    @screen sm {
      @apply text-center;
    }
    @screen xl {
      @apply text-left;
    }
  }
  ul {
    @apply pt-8 pb-5;
    @apply flex flex-col justify-center items-center gap-[18px];
    @screen sm {
      @apply py-16;
    }
    @screen md {
      @apply flex-row items-stretch;
    }
    @screen xl {
      @apply justify-start;
    }
  }
  li {
    @apply grow;
    @apply min-h-[272px] max-w-[335px] w-full;
    @screen sm {
      @apply min-h-[288px] max-w-[286px] w-fit;
    }
  }
  li > :global(a) {
    @apply h-full w-full;
  }
</style>
