<script>
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        Modal,
        SkipToContent,
        SideNav,
        SideNavMenuItem,
        SideNavItems,
        SideNavMenu,
    } from "carbon-components-svelte";

    let isSideNavOpen, open;
</script>

<Header persistentHamburgerMenu={true} company="INLS 641" platformName="Visual Analytics Lessons" bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>

    <HeaderNav>
        <HeaderNavItem href="/" text="Home" />
        <HeaderNavMenu text="Getting Started">
            <HeaderNavItem href="/lets_make_a_bar_chart" text="Let's Make a Bar Chart" />
            <HeaderNavItem href="/lets_make_a_bar_chart_svg" text="Now a Bar Chart with SVG" />
        </HeaderNavMenu>
        <HeaderNavMenu text="Data Joins">
            <HeaderNavItem href="/d3_joins" text="D3 Joins" />
            <HeaderNavItem href="/d3_more_joins" text="Enter, Update, Exit" />
        </HeaderNavMenu>
        <HeaderNavMenu text="Examples">
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/1c6a57de799f131e63cdf5ab4fe10d87" text="Bar Chart using HTML" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/bc5faf37be4a31e49575d394e9f4b611" text="Bar Chart using SVG" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/bf5ac2f5e0a147afb338adfd2d2b4e96" text="X and Y Axes" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/2c9f6e5efc6425290500c7dc0be56703" text="Basic Line Chart" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/75df9c9a2d01adc950301974fb750afd" text="Curved Line Chart" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/e5a018cc2c8edfe143d5137c04f0c347" text="Curved Area Chart" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/a020277b90c5eac4e1de3d8e34396c5b" text="Tooltips" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/c066b21ebd4430ea8d54ba0ad708b78c" text="Choropleth World Map" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/ef1461a472fa27773fd3ff00683cfec9" text="Choropleth US Map" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/b40382ae2d21734109901c9cb683f7ce" text="Choropleth NC Map" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/01b034218686c5486082996e5218fd2c" text="Street Map for Chapel Hill, NC" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/6f8a1f052fa467f7ce1f863830d51066" text="Symbol US Map"/>
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/1ddaedaadd5122fdce7bb4306708664e" text="Brushing a Scatterplot" />
            <HeaderNavItem href="https://blocks.roadtolarissa.com/davegotz/c15f68fb7a50c867801373bd2f864fdc" text="D3 Dispatch and Coordinated Views" />
        </HeaderNavMenu>
        <HeaderNavItem on:click={()=>{open = true}} text="About..." />
    </HeaderNav>

    <SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
            <SideNavMenuItem href="/" text="Home" />
            <SideNavMenu text="Getting Started">
                <SideNavMenuItem href="/lets_make_a_bar_chart" text="Let's Make a Bar Chart" />
                <SideNavMenuItem href="/lets_make_a_bar_chart_svg" text="Now a Bar Chart with SVG" />
            </SideNavMenu>
            <SideNavMenu text="Data Joins">
                <SideNavMenuItem href="/d3_joins" text="D3 Joins" />
                <SideNavMenuItem href="/d3_more_joins" text="Enter, Update, Exit" />
            </SideNavMenu>
            <SideNavMenu text="Examples">
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/1c6a57de799f131e63cdf5ab4fe10d87" text="Bar Chart using HTML" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/bc5faf37be4a31e49575d394e9f4b611" text="Bar Chart using SVG" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/bf5ac2f5e0a147afb338adfd2d2b4e96" text="X and Y Axes" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/2c9f6e5efc6425290500c7dc0be56703" text="Basic Line Chart" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/75df9c9a2d01adc950301974fb750afd" text="Curved Line Chart" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/e5a018cc2c8edfe143d5137c04f0c347" text="Curved Area Chart" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/a020277b90c5eac4e1de3d8e34396c5b" text="Tooltips" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/c066b21ebd4430ea8d54ba0ad708b78c" text="Choropleth World Map" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/ef1461a472fa27773fd3ff00683cfec9" text="Choropleth US Map" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/b40382ae2d21734109901c9cb683f7ce" text="Choropleth NC Map" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/01b034218686c5486082996e5218fd2c" text="Street Map for Chapel Hill, NC" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/6f8a1f052fa467f7ce1f863830d51066" text="Symbol US Map" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/1ddaedaadd5122fdce7bb4306708664e" text="Brushing a Scatterplot" />
                <SideNavMenuItem href="https://blocks.roadtolarissa.com/davegotz/c15f68fb7a50c867801373bd2f864fdc" text="D3 Dispatch and Coordinated Views" />
            </SideNavMenu>
            <SideNavMenuItem on:click={()=>{isSideNavOpen = false; open = true}} text="About..." />
        </SideNavItems>
    </SideNav>
</Header>

<Modal passiveModal bind:open modalHeading="About D3 Lessons" on:open on:close>
    <p>
        This website has been developed by David Gotz at the University of
        North Carolina at Chapel Hill.  It draws heavily on the official D3 documentation and tutorials.  This resource
        is only possible thanks to the vibrant D3 community which has produced such wealth of examples and detailed
        documentation for the D3 library.
    </p>
    <p>
        Have suggestions? Corrections? Please visit <a href="https://vaclab.unc.edu/gotz/">David Gotz's website</a> for
        contact information, and to learn more details about his teaching and
        research.
    </p>
</Modal>