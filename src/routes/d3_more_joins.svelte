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
    let votes = [{color: "red", votes: 1},
        {color: "blue", votes: 2},
        {color: "green", votes: 3},
        {color: "purple", votes: 4},
        {color: "silver", votes: 5},
        {color: "pink", votes: 6}];

    let new_votes = [{color: "red", votes: 4},
        {color: "blue", votes: 3},
        {color: "black", votes: 2},
        {color: "orange", votes: 4}];

    let box_size = 50;

    let svg;

    onMount(() => {
        svg = d3.select("#example-box");

        svg.append("text")
            .attr("id", "array_label")
            .attr('y', box_size)
            .attr('x', 10)
            .text("nums = ");

        svg.selectAll(".data_box").data(nums).join("rect")
            .attr("class", "data_box")
            .attr('y', box_size-28)
            .attr('x', (d,i) => 60+i*box_size)
            .attr("height", box_size)
            .attr("width", box_size);

        svg.selectAll(".data_text").data(nums).join("text")
            .attr("class", "data_text")
            .attr('y', box_size)
            .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
            .text(d => d);

        svg.selectAll(".bar").data(votes).join("rect")
            .attr("class", "bar")
            .attr('y', d => 300 - d.votes*20)
            .attr('x', (d,i) => 30+i*(box_size+5))
            .attr("width", box_size)
            .attr("height", d => d.votes*20);
    });

    let change_section = (section) => {
        if (section == 0) {
            if (svg) {
                svg.selectAll(".color_text").transition().duration(500).attr("opacity",0).remove();
                svg.selectAll(".vote_text").transition().duration(500).attr("opacity",0).remove();

                svg.selectAll(".data_text").data(nums).join("text")
                    .attr("class", "data_text")
                    .attr('y', box_size)
                    .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                    .text(d => d)
                    .attr("opacity",0)
                    .transition().duration(500)
                        .attr("opacity",1);

                svg.select("#array_label")
                    .text("nums = ");

                svg.selectAll(".bar").transition().duration(500).style("fill", "black");
            }
        }
        else if (section == 1) {
            // Remove the numbers
            svg.selectAll(".data_text").transition().duration(500).attr("opacity",0).remove();

            svg.select("#array_label")
                .text("votes = ");

            // Ensure the boxes are present.
            svg.selectAll(".data_box").data(votes).join("rect")
                .attr("class", "data_box")
                .attr('y', box_size-28)
                .attr('x', (d,i) => 60+i*box_size)
                .attr("height", box_size)
                .attr("width", box_size);

            // Add the colors and votes
            svg.selectAll(".color_text").data(votes).join("text")
                .attr("class", "color_text")
                .attr('y', box_size-10)
                .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                .text(d => d.color)
                .attr("opacity",0)
                .transition().duration(500)
                    .attr("opacity",1);

            svg.selectAll(".vote_text").data(votes).join("text")
                .attr("class", "vote_text")
                .attr('y', box_size+10)
                .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                .text(d => d.votes)
                .attr("opacity",0)
                .transition().duration(500)
                    .attr("opacity",1);

            svg.selectAll(".bar").transition().duration(500).style("fill", "black");

        }
        else if (section == 2) {

            // Ensure the boxes are present.
            svg.selectAll(".data_box").data(votes).enter().append("rect")
                .attr("class", "data_box")
                .attr('y', box_size-28)
                .attr('x', (d,i) => 60+i*box_size)
                .attr("height", box_size)
                .attr("width", box_size)
                .attr("opacity",0)
                .transition().duration(500)
                .attr("opacity",1),

                // Update the data display for the colors and votes
            svg.selectAll(".color_text").data(votes).join(
                enter => enter.append("text")
                    .attr("class", "color_text")
                    .attr('y', box_size-10)
                    .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                    .text(d => d.color)
                    .attr("opacity",0)
                    .transition().duration(500)
                    .attr("opacity",1),
                update => update.text(d => d.color),
                exit => exit.remove()
            );

            svg.selectAll(".vote_text").data(votes).join(
                enter => enter.append("text")
                    .attr("class", "vote_text")
                    .attr('y', box_size+10)
                    .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                    .text(d => d.votes)
                    .attr("opacity",0)
                    .transition().duration(500)
                    .attr("opacity",1),
                update => update.text(d => d.votes),
                exit => exit.remove()
            );

            svg.selectAll(".bar").transition().duration(500).style("fill", (d)=>d.color);
        }
        else if (section == 3) {
            // Update the colors and votes
            svg.selectAll(".color_text").data(new_votes).join(
                enter => enter.append("text")
                    .attr("class", "color_text")
                    .attr('y', box_size-10)
                    .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                    .text(d => d.color)
                    .attr("opacity",0)
                    .transition().duration(500)
                        .attr("opacity",1),
                update => update
                    .text(d => d.color),
                exit => exit
                    .transition().duration(500)
                        .attr("opacity",0).remove()
            );

            svg.selectAll(".vote_text").data(new_votes).join(
                enter => enter.append("text")
                    .attr("class", "vote_text")
                    .attr('y', box_size+10)
                    .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                    .text(d => d.votes)
                    .attr("opacity",0)
                    .transition().duration(500)
                    .attr("opacity",1),
                update => update
                    .text(d => d.votes),
                exit => exit
                    .transition().duration(500)
                    .attr("opacity",0).remove()
            );

            // Update the boxes
            svg.selectAll(".data_box").data(new_votes).join(
                enter => enter.append("rect")
                    .attr("class", "data_box")
                    .attr('y', box_size-28)
                    .attr('x', (d,i) => 60+i*box_size)
                    .attr("height", box_size)
                    .attr("width", box_size),
                update => false,
                exit => exit
                    .transition().duration(500)
                    .attr("opacity",0).remove()
            );

            // Remove the selection box/label elements if they exist.
            svg.selectAll(".selection_box").transition().duration(500).style("opacity",0).remove();
            svg.selectAll(".selection_label").transition().duration(500).style("opacity",0).remove();
        }
        else if (section == 4) {
            if (svg.selectAll(".selection_box").empty()) {
                svg.append("rect")
                    .attr("class", "selection_box")
                    .attr('y', 175)
                    .attr('x', 25)
                    .attr('height', 130)
                    .attr('width', 335)
                    .style('fill', 'none')
                    .style('stroke', 'red')
                    .style('opacity', 0)
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("rect")
                    .attr("class", "selection_box")
                    .attr('y', 305)
                    .attr('x', 25)
                    .attr('height', 42)
                    .attr('width', 335)
                    .style('fill', 'pink')
                    .style('stroke', 'red')
                    .style('opacity', 0)
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("text")
                    .attr("class", "selection_label")
                    .attr('y', 320)
                    .attr('x', 195)
                    .style('text-anchor', "middle")
                    .style("opacity", 0)
                    .text("existing_rects is a D3 selection")
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("text")
                    .attr("class", "selection_label")
                    .attr('y', 338)
                    .attr('x', 195)
                    .style('text-anchor', "middle")
                    .style("opacity", 0)
                    .text("containing six rect elements.")
                    .transition().duration(500)
                    .style("opacity", 1);
            }

            svg.selectAll(".join_line").transition().duration(500).style("opacity",0).remove();
            svg.selectAll(".join_text").transition().duration(500).style("opacity",0).remove();
        }
        else if (section == 5) {
            svg.selectAll(".join_line").data(votes.slice(0,4)).join(
                enter => enter.append("line")
                    .style("stroke-width", 2)
                    .style("stroke-dasharray", "5 2")
                    .style("stroke", "red")
                    .attr("class", "join_line")
                    .attr('x1', (d,i) => 60+0.5*box_size+i*box_size)
                    .attr('y1', box_size-28+box_size)
                    .attr('x2', (d,i) => i>=2 ? 60+0.5*box_size+i*box_size : 30+i*(box_size+5)+0.5*box_size)
                    .attr('y2', (d,i) => i>=2 ? box_size+box_size : 300 - d.votes*20)
                    .style("opacity",0)
                    .transition().duration(500)
                    .style("opacity", 1),
                update => update.transition().duration(500)
                    .attr('x1', (d,i) => 60+0.5*box_size+i*box_size)
                    .attr('y1', box_size-28+box_size)
            );
            svg.append("text")
                .attr("class", "join_text")
                .attr("x", 182)
                .attr("y", 114)
                .text("?")
                .style("opacity",0)
                .transition().duration(500)
                .style("opacity", 1);
            svg.append("text")
                .attr("class", "join_text")
                .attr("x", 232)
                .attr("y", 114)
                .text("?")
                .style("opacity",0)
                .transition().duration(500)
                .style("opacity", 1);

            if (svg.selectAll(".selection_box").empty()) {
                svg.append("rect")
                    .attr("class", "selection_box")
                    .attr('y', 175)
                    .attr('x', 25)
                    .attr('height', 130)
                    .attr('width', 335)
                    .style('fill', 'none')
                    .style('stroke', 'red')
                    .style('opacity', 0)
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("rect")
                    .attr("class", "selection_box")
                    .attr('y', 305)
                    .attr('x', 25)
                    .attr('height', 42)
                    .attr('width', 335)
                    .style('fill', 'pink')
                    .style('stroke', 'red')
                    .style('opacity', 0)
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("text")
                    .attr("class", "selection_label")
                    .attr('y', 320)
                    .attr('x', 195)
                    .style('text-anchor', "middle")
                    .style("opacity", 0)
                    .text("existing_rects is a D3 selection")
                    .transition().duration(500)
                    .style("opacity", 1);

                svg.append("text")
                    .attr("class", "selection_label")
                    .attr('y', 338)
                    .attr('x', 195)
                    .style('text-anchor', "middle")
                    .style("opacity", 0)
                    .text("containing six rect elements.")
                    .transition().duration(500)
                    .style("opacity", 1);
            }

            svg.selectAll(".bar").data(votes,d=>d.color).join(
                enter => enter.append("rect")
                    .attr('class', 'bar')
                    .attr('y', d => 300 - d.votes*20)
                    .attr('x', (d,i) => 30+i*(box_size+5))
                    .attr("width", box_size)
                    .attr("height", d => d.votes*20)
                    .style("fill", d => d.color)
                    .style("opacity", 0)
                    .transition().delay(0).duration(500)
                    .style("opacity", 1),
                update => update.transition().delay(0).duration(500)
                    .attr('y', d => 300 - d.votes*20)
                    .attr("height", d => d.votes*20),
                exit => exit.transition().duration(500)
                    .style("opacity", 0)
                    .remove()
            );
        }
        else if (section == 6) {
            // Update the bar heights and colors.
            svg.selectAll(".bar").data(new_votes,d=>d.color).join(
                enter => enter.append("rect")
                    .attr('class', 'bar')
                    .attr('y', d => 300 - d.votes*20)
                    .attr('x', (d,i) => 30+i*(box_size+5))
                    .attr("width", box_size)
                    .attr("height", d => d.votes*20)
                    .style("fill", d => d.color)
                    .style("opacity", 0)
                    .transition().delay(2000).duration(1000)
                        .style("opacity", 1),
                update => update.transition().delay(1000).duration(1000)
                    .attr('y', d => 300 - d.votes*20)
                    .attr("height", d => d.votes*20),
                exit => exit.transition().duration(1000)
                    .style("opacity", 0)
                    .remove()
            );

            svg.selectAll(".join_line").transition().delay(0).duration(500).style("opacity",0).remove();
            svg.selectAll(".join_text").transition().delay(0).duration(500).style("opacity",0).remove();
            svg.selectAll(".selection_box").transition().delay(0).duration(500).style("opacity",0).remove();
            svg.selectAll(".selection_label").transition().delay(0).duration(500).style("opacity",0).remove();
        }
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
    :global(.color_text) {
        text-anchor: middle;
    }
    :global(.vote_text) {
        text-anchor: middle;
    }


</style>

<svelte:head>
    <title>D3 Joins: The Basics</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
<h1>More D3 Joins: Enter, Update, and Exit</h1>
    <div style="margin-top:1em;">
        <Scroller top="{0.15}" bottom="{0.8}" threshold="{0.5}" bind:count bind:index bind:offset bind:progress>
            <div style="float: right" slot="background">
                <svg id="example-box" style="border: 1px solid lightgray;" width="400" height="400"></svg>
            </div>
            <div slot="foreground">
                <section><h3>Getting Started</h3>
                    In <a href="/d3_joins">the previous lesson on the basics of D3 data joins</a>, we introduced the code
                    below which creates a bar chart to represent the <code>num</code> data array.
                    <b/>
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // The data array<br/>
                            let nums = [1, 2, 3, 4, 5, 6];<br/>
                            <br/>
                            // This will create an empty selection since we have no rectangles yet!<br/>
                            let existing_rects = d3.select("svg").selectAll("rect");<br/>
                            <br/>
                            // Perform the data join<br/>
                            let data_join_result = existing_rects.data(nums);<br/>
                            <br/>
                            // Join the unmatched data items to new rectangles.<br/>
                            data_join_result.join("rect")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.style("fill", "black")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('x', (d,i) => i*55)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("width", 50);<br/>
                        </code>
                    </div>
                    As a review, we accomplished this via a sequence of four steps:
                    <p/>
                    <ul>
                        <li style="margin-left:10px;">1. Get an array of data to visualize (in this case, the variable <code>num</code>).</li>
                        <li style="margin-left:10px;">2. Select the existing rectangles (initially an empty selection since we haven't created any rectangles yet).</li>
                        <li style="margin-left:10px;">3. Perform the data join to connect the data array to the selection of rectangles.</li>
                        <li style="margin-left:10px;">4. Add rectangles for the new items found in the data join.</li>
                    </ul>
                    <p/>
                    This works well enough when we start with a blank SVG element, but we don't always and with a blank
                    visualization. In particular, when data is dynamic we need a slightly more
                    complex approach that can update an existing chart.
                    <p style="font-weight: bold;">Scroll through the rest of this page to see data joins work when data
                        is dynamic.</p>
                </section>
                <section><h3>Dynamic Data</h3>
                    Generally speaking, we can think of any update of a visualization (either the initial drawing of the
                    shapes, or updates of the shapes to reflect a change in data) using a very similar workflow as in
                    the basic data join. In fact, the first three steps are exactly the same!
                    <p/>
                    <ul>
                        <li style="margin-left:10px;">1. Get an array of data to visualize (in this case, the variable <code>num</code>.</li>
                        <li style="margin-left:10px;">2. Select the existing rectangles (initially an empty selection, since the visualization has no rectangles at first, since we haven't created them yet).</li>
                        <li style="margin-left:10px;">3. Perform the data join to connect the data array to the selection of rectangles.</li>
                    </ul>
                    <p/>
                    The fourth step, however, becomes more complicated.  <span style="font-weight:bold;">Why?</span> Because "adding new bars" is only one of three possible changes to the visualization.  We might also
                    need to remove bars from the visualization, or update the size of existing bars.
                    <p/>
                    To see why this is the case, let's complicate our original example slightly. Instead of a simple array of
                    numbers as our data, suppose we have data for a poll of kindergarten students about their favorite
                    colors.  The data might look like this:
                    <p/>
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // The data array<br/>
                            let votes = [&lcub;color: "red", votes: 1&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "blue", votes: 2&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "green", votes: 3&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "purple", votes: 4&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "silver", votes: 5&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "pink", votes: 6&rcub;];<br/>
                            <br/>
                        </code>
                    </div>
                </section>
                <section><h3>An Updated Visualization: Color-Coded Bars</h3>
                    Updating our code for creating the visualization slightly, we can now create a color-coded bar chart.
                    <b/>
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // This will create an empty selection since we have no rectangles yet!<br/>
                            let existing_rects = d3.select("svg").selectAll("rect");<br/>
                            <br/>
                            // Perform the data join<br/>
                            let data_join_result = existing_rects.data(votes);<br/>
                            <br/>
                            // Join the unmatched data items to new rectangles.<br/>
                            data_join_result.join("rect")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.style("fill", (d) => d.color)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('x', (d,i) => i*55)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("width", 50);<br/>
                        </code>
                    </div>
                    <p/>
                </section>
                <section><h3>A New Vote &rarr; New Data!</h3>
                    Now let's imagine that we ask a brand new class of students about their favorite colors and gather the following results.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                    <code>
                        // The data array<br/>
                        let votes = [&lcub;color: "red", votes: 4&rcub;,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "blue", votes: 3&rcub;,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "black", votes: 2&rcub;,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "orange", votes: 4&rcub;];<br/>
                        <br/>
                    </code>
                    </div>
                    Notice that our data array is now quite different from our visualization.  The data array has
                    4 items instead of 6, some colors have gone away while others have appeared, and even colors
                    that remain (e.g., red) have a different number of votes.
                    <p/>
                    To update our visualization to reflect the new data from the new poll, we need to do more than just add
                    rectangles to the visualization.  We need to add some new bars (black and orange), remove some others (green, purple, silver, and pink), and update the size of others (red and blue).
                    <p/>
                    Luckily, this is something the D3 join process will do for us.
                </section>
                <section><h3>The First Step: Data and D3 Selection</h3>
                    The data join process begins by identifying two data structures: (1) the data array that you wish
                    to visualize, and (2) a selection of graphical objects that represent the corresponding data in the
                    existing visualization.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // The data array<br/>
                            let votes = [&lcub;color: "red", votes: 4&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "blue", votes: 3&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "black", votes: 2&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "orange", votes: 4&rcub;];<br/>
                            <br/>
                            // Select the existing bar chart rectangles. We have six existing rectangles!<br/>
                            let existing_rects = d3.select("svg").selectAll("rect");<br/>
                        </code>
                    </div>
                    <p/>
                    In our code, this means we need (1) the <code>votes</code> data array with our new voting data, and (2)
                    the value of the <code>existing_rects</code> variable which contains a D3 selection of all of the
                        rectangles that currently exist in our existing bar chart prior to our update for the new data.
                    <p/>
                    <center>
                        <img style="height: 160px;" src="/select.png">
                    </center>
                </section>
                <section><h3>The Second Step: Data Join to Determine the Enter, Update, and Exit Selections</h3>
                    Next, we D3 to perform a data join using the .data(...) method. This connects the data array
                    to the D3 selection of graphical objects.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // Perform the data join<br/>
                            let data_join_result = existing_rects.data(votes, d=>d.colors);<br/>
                        </code>
                    </div>
                    Notice the extra parameter to the .data(...) method: <code>d=>d.colors</code>?  It's a <span style="font-weight:bold;">key function</span> that tells D3 to use the color
                    attribute to find corresponding data elements and graphic objects.  It identifies the "unique ID" for each data element in our array.
                    The data join process creates three distinct
                    sub-selections as a result:
                    <p/>
                    <ul>
                        <li style="margin-left:10px;">1. The <span style="font-weight:bold;">enter selection</span>, containing new data items for which new graphical objects must be added to the visualization.  These are data points that should be <span style="font-weight:bold;">entering</span> the visualization.</li>
                        <li style="margin-left:10px;">2. The <span style="font-weight:bold;">exit selection</span>, containing old graphical objects for which data no longer exits in the data array. These are graphical objects that should be <span style="font-weight:bold;">exiting</span> the visualization.</li>
                        <li style="margin-left:10px;">3. The <span style="font-weight:bold;">update selection</span>, containing existing graphical objects for which there is also a corresponding data object. These are graphical objects that should remain in the visualization, but be <span style="font-weight:bold;">updated</span> to reflect any changes in data.</li>
                    </ul>
                    <p/>
                    In this example, the enter selection contains Orange and Black: new colors which need to be added to the visualization.  The exit selection contains Green, Purple, Silver, and Pink: colors that are currently represented in the visualization but which no longer exist in the updated data array.  Finally, the update selection includes Red and Blue: colors which existed in the first data array and continue to exist in the new data array (even if the vote counts have changed).
                    <center><img style="height: 160px;" src="/join.png"></center>
                </section>
                <section><h3>The Final Step: Updating the Visualization</h3>
                    As the final step in updating our visualization, we must specify what to do for the three enter,
                    exit, and update selections. This is done using the same .join(...) method we used in the basic
                    example, but with more specific instructions.
                    for the .join(...) method in D3 is apply the specified code to the enter selection.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // Update the visualization.<br/>
                            data_join_result.join(<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;enter => enter.append("rect")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.style("fill", (d) => d.color)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('x', (d,i) => i*55)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("width", 50),<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;update => update<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.style("fill", (d) => d.color)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d.votes*20),<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;exit => exit<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.remove()<br/>
                            );<br/>
                        </code>
                    </div>
                </section>
                <section><h3>Putting it All Together</h3>
                    Here are all the steps put together into a single script.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // The data array<br/>
                            let votes = [&lcub;color: "red", votes: 4&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "blue", votes: 3&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "black", votes: 2&rcub;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lcub;color: "orange", votes: 4&rcub;];<br/>
                            <br/>
                            // Select the existing bar chart rectangles. We have six existing rectangles!<br/>
                            let existing_rects = d3.select("svg").selectAll("rect");<br/>
                            <br/>
                            // Perform the data join<br/>
                            let data_join_result = existing_rects.data(votes, d=>d.color);<br/>
                            <br/>
                            // Update the visualization.<br/>
                            data_join_result.join(<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;enter => enter.append("rect")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.style("fill", (d) => d.color)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('x', (d,i) => i*55)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("width", 50),<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;update => update<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.style("fill", (d) => d.color)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d.votes*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d.votes*20),<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;exit => exit<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.remove()<br/>
                            );<br/>
                        </code>
                    </div>
                <h3>Next Steps...</h3>
                <p/>
                Want to experiment with an interactive version of this program? <a href="https://glitch.com/edit/#!/d3-joins-enter-update-exit">Click here</a>!
                <p/>
                    This lesson introduces the concepts of the enter, update, and exit selections using the .join(...)
                    method introduced in recent versions of D3 as a simpler alternative to the original D3 data join
                    API. <a href="https://glitch.com/edit/#!/d3-joins-enter-update-exit-legacy">An interactive version of this same program but using the legacy enter/update/exit API from
                        D3's earlier versions is also available</a>. Current versions of D3 support both the new and old APIs,
                    and you'll see examples with both if you search online for documentation or tutorials.
                </section>
            </div>
        </Scroller>
    </div>
</Content>
