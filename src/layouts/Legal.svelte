<script lang="ts">
  export let title: string
  export const name: string = ''
  export const site: string = ''
  export const siteAddress: string = ''
  export const securityEmail: string = ''
  export let effectiveDate: string
  export let showQuestions = true
  // effective date shouldn't include time(zone), so ensure that yyyy-mm-dd is the same globally
  // @see https://stackoverflow.com/questions/29174810/javascript-date-timezone-issue
  // @see https://stackoverflow.com/a/29185654
  $: _effectiveDate = effectiveDate?.replace('T00:00:00.000', 'T12:00:00.000')
</script>

<section>
  <h1>{title}</h1>

  <slot />

  {#if effectiveDate}
    <br />
    <p>
      Effective
      <time datetime={new Date(_effectiveDate).toISOString().split('T')[0]}>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(_effectiveDate))}
      </time>
    </p>
  {/if}

  {#if showQuestions}
    <div>
      <h2>Got Questions</h2>
      <slot name="got-questions">
        <p>
          If you have questions or concerns regarding our Privacy Policy, Terms of Service, or
          anything else dealing with our security or information handling practices please contact
          EnergyBill.
        </p>
      </slot>
      <a class="btn btn-primary" href="mailto:questions@energybill.com">
        Mail questions@energybill.com
      </a>
    </div>
  {/if}
</section>

<style lang="postcss">
  section {
    @apply relative pt-8;
  }
  h1 {
    @apply font-bold text-center text-[40px] leading-[54px];
    @apply py-6 z-20;
    @screen sm {
      @apply text-[40px] leading-[54px];
    }
  }
  section :global(p),
  section :global(li) {
    @apply font-proxima-nova text-xl leading-8;
  }
  section :global(ol > li::before),
  section :global(p) {
    @apply py-4;
  }
  section :global(ul > li) {
    @apply py-1.5;
    @apply py-0;
  }
  section :global(h2),
  section > :global(ol > li::marker),
  section > :global(ol > li::before),
  section > :global(ol > li > :first-child) {
    @apply font-bold text-[24px] leading-[36px];
    @apply py-4;
  }
  section :global(ul) {
    @apply pb-4 pl-8 list-disc;
  }
  section :global(ol) {
    counter-reset: item;
  }
  section :global(ol > li) {
    counter-increment: item;
    @apply table;
  }
  section :global(ol > li::before) {
    content: counters(item, '.');
    @apply table-cell pr-[0.5em];
  }
  /* top level list item marker has trailing `.` */
  section > :global(ol > li::before) {
    content: counters(item, '.') '.';
  }
  section :global(ol > li::before),
  section :global(ol > li > :first-child),
  section :global(ol > li > text) {
    @apply align-top;
  }
  section :global(a):not(.btn) {
    @apply text-yellow;
  }
  section :global(a:hover):not(.btn) {
    @apply text-yellow-dark;
  }
  div {
    @apply relative mt-8 pt-10 pb-14;
  }

  div:before {
    content: '';
    @apply absolute w-screen h-full bg-yellow -z-10;
    /* offset padding to achieve true left-0 */
    @apply -translate-x-[var(--padding)];
    /* offset parent padding */
    @apply -translate-y-10;
  }
  a {
    @apply inline-block mt-4;
  }
</style>
