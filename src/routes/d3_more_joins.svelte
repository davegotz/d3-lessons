<script>
    import {onMount} from "svelte";
    import SiteHeader from "$lib/SiteHeader.svelte";
    import Scroller from "@sveltejs/svelte-scroller";
    import {
        Content, ListItem, OrderedList,
    } from "carbon-components-svelte";
    import * as d3 from "d3";

    let count, index=0, offset, progress;

    let nums = [1, 2, 3, 4, 5, 6];
    let box_size = 50;

    let svg;

    onMount(() => {
    });

    let change_section = (section) => {
    }

    $: change_section(index);

</script>

<style>
    section {
        height: 80vh;
        margin-right: 410px;
        line-height: 1.4;
    }

    :global(.data_box) {
        stroke: red;
        fill: lightpink;
    }

    :global(.data_text) {
        text-anchor: middle;
    }


</style>

<svelte:head>
    <title>D3 Joins: The Basics</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
<h1>More D3 Joins: Enter, Update, and Exit</h1>

    Coming soon!
</Content>
