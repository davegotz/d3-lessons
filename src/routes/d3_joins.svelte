<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import {
        Content,
    } from "carbon-components-svelte";
    import SiteHeader from "$lib/SiteHeader.svelte";

    let count, index, offset, progress;
</script>

<style>
    section {
        height: 80vh;
        margin-left: 410px;
    }
</style>

<svelte:head>
    <title>D3 Joins: Coming Soon</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
<h1>D3 Joins: Coming Soon</h1>

    <p>Stay tuned for more D3 lessons. The next lesson to be released will focus on D3 joins.</p>
    <!--
   <div style="margin-top:1em;">
        <Scroller top="{0.15}" bottom="{0.8}" threshold="{0.5}" bind:count bind:index bind:offset bind:progress>
            <div slot="background">
                <svg style="border: 1px solid black;" width="400" height="400"></svg>
                <p>
                    This is the background content. It will stay fixed in place while the
                    foreground scrolls over the top.
                </p>

                <p>Section {index + 1} of {count} is currently active.</p>
                <p>Offset is {offset}, progress is {progress}.</p>
            </div>

            <div slot="foreground">
                <section>Data joins aren't too difficult.</section>
                <section>This is the second section.</section>
                <section>This is the third section.</section>
            </div>
        </Scroller>
   </div>
    -->
</Content>
