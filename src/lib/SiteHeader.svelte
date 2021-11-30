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

<Header persistentHamburgerMenu={true} company="INLS 641" platformName="D3 Lessons" bind:isSideNavOpen>
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