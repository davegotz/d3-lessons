<script>
    import SiteHeader from "$lib/SiteHeader.svelte";
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";
</script>

<svelte:head>
    <title>INLS 641 Visual Analytics Lessons</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
    <h1>Welcome</h1>
    <p style="margin-top:1em;">This website contains a set of lessons developed primarily for students taking INLS 641 Visual Analytics at the UNC School
        of Information and Library Science. However, they are freely accessible and available to everyone.  Have fun learning!</p>

    <p style="font-weight: bold; margin-top:1em;">Use the menus at the top to select a lesson.</p>

    <h3>About this Site</h3>

    <p style="margin-top:1em;">These lessons are designed as instructional material to supplement the wonderfully
    detailed documentation provided by the D3 library, as well as the large number of tutorials/howtos/lessons already
        available on the web about D3 and other visual analytics topics. Those resources are incredibly valuable.
        However, the many resources available online are also complicated by the use of different versions of D3, different
        platforms (e.g., github, bl.locks.org, gist, Observable), and often combine many different topics in ways that
        can impede learning. These existing examples may also use special APIs, include syntax specific to a particular platform, or have
        other caveats which can make them problematic for those just getting started.</p>

    <p style="margin-top:1em;">The lessons on this website are designed to provide simple examples that are free from special syntax and compatible with
        a common version of D3 (as used in the current semester of INLS 641). If you are a student and have questions, please ask
        via our classroom forum.</p>

    <p style="margin-top:1em;">Visiting these pages but not taking the class? Great! Hopefully you find them helpful.
        If so, feel free to share these with others. The more learning the better!</p>
</Content>
