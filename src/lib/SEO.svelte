<script lang="ts">
  import type { MetaTagsProps } from 'svelte-meta-tags'
  import { MetaTags } from 'svelte-meta-tags'

  const metatags: MetaTagsProps = {
    title: 'EnergyBill - The better way to manage your energy choices',
    description:
      'Turn the tables on energy deregulation! Our patented technology finds the best energy prices in the retail market for homes and small businesses, guaranteeing you the lowest possible rate, always. We automatically switch you to new providers as needed to keep your bill at the minimum. See the cost of your energy usage in advance, manage and pay your bill through us, and never signup for an energy company again.',
    canonical: 'https://energybill.com',
    openGraph: {
      type: 'website'
    }
  }
</script>

<MetaTags {...metatags} />
