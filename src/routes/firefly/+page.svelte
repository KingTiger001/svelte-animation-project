<script lang="ts">
  import Legal from '../../layouts/Legal.svelte'

  const noTypeCheck = (x: any) => x
</script>

<!-- we're using the Legal layout template, as per Andrew's request -->
<!-- nasty way to ignore properties -->
<!-- @see https://github.com/sveltejs/language-tools/issues/1026#issuecomment-1002839154 -->
<Legal
  {...noTypeCheck({
    title: 'Firefly',
    showQuestions: true
  })}
>
  <p>
    <strong>
      ** NOTE: This page is under active construction and will receive frequent updates.
    </strong>
  </p>

  <p>
    EnergyBill offers commercial engineering services for hire and frequently subcontracts with
    large firms in the energy industry. Firefly is one of our proprietary solutions for commercial
    clients. It is a patent-pending software platform for integrated engineering and management to
    support infrastructure projects, like electrical power, optimizing complex work processes for
    designing and maintaining critical infrastructure. It provides a technology framework that can
    be customized to the needs of specific entities, such as governments or utility companies, and
    related projects.
  </p>

  <p>
    The development of Firefly began in 2010 as part of engineering field operations in support of
    the US military in Afghanistan. Due to the physical dangers inherent in a warzone, the software
    was created to minimize time on the ground and optimize field work for maximum efficiency. With
    time, the software grew to bring these same optimizations to work done back in the office.
  </p>

  <p>
    The basic idea behind the technology is to optimize infrastructure projects by creating more
    intuitive software through virtualization. Additionally, Firefly acts as a data synchronization
    and integration tool. Despite the broad availability of computer technology, in 2010 and still
    today, most infrastructure projects heavily rely on manual “pen and paper” style and a variety
    of unconnected software programs. Firefly is the hub connecting these applications, increasing
    the efficiency of digitization and communication.
  </p>

  <p>
    <center>
      <img src="/images/firefly/logo.svg" alt="Firefly logo" width="150" height="150" />
    </center>
  </p>

  <p>
    One of the focal points of the application is a 3D virtual world that allows physical
    infrastructure assets to be modeled in the context of their real-world geodetic environment,
    respecting their geospatial relationships. Put plainly, a video-game-like visual interface
    allows users to see and interact with electrical power infrastructure, such as transmission
    towers and distribution poles, in a 3D virtual reality.
  </p>

  <p>
    <center>
      <img
        src="/images/firefly/tower1.png"
        alt="Modeled Transmission Towers"
        style="max-width: 100%; max-height: 100vh; margin: auto;"
      />
    </center>
  </p>

  <p>
    A user can walk through a power plant in 3D and interact with an object, for example by clicking
    on a pump motor, and access its asset tracking information and data sheets or create maintenance
    records for it, among other applications.
  </p>

  <p>
    <center>
      <img
        src="/images/firefly/valve1.png"
        alt="Modeled Switchyard"
        style="max-width: 100%; max-height: 100vh; margin: auto;"
      />
    </center>
  </p>

  <p>
    <center>
      <img
        src="/images/firefly/switchyard1.png"
        alt="Modeled Switchyard"
        style="max-width: 100%; max-height: 100vh; margin: auto;"
      />
    </center>
  </p>

  <p>
    Circuit diagrams can be drawn on the ground, directly on top of satellite imagery, and even
    automated, among other features. This facilitates a more intuitive experience for users,
    especially those who are less computer savvy and struggle with conventional tools. Engineers and
    electricians can design in a highly visual way that more closely matches their experience in the
    physical world, as opposed to using difficult interfaces like a spreadsheet or Autocad.
  </p>

  <!-- <p>
    <center>
      <img
        src="/images/firefly/circuit1.png"
        alt="Modeled Switchyard"
        style="max-width: 100%; max-height: 100vh; margin: auto;"
      />
    </center>
  </p> -->

  <p>Last Updated 4/13/22.</p>

  <p slot="got-questions">
    If you have any questions about Firefly or would like to arrange a demo, please contact
    EnergyBill.
  </p>
</Legal>

<style lang="postcss">
  /*  */
</style>
