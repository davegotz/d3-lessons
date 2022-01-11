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

        svg = d3.select("#example-box");


        svg.append("text")
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
    });

    let change_section = (section) => {
        if (section == 0) {
            if (svg) {
                svg.selectAll(".bar").data(nums).join("rect")
                    .transition().duration(500)
                    .attr('y', d => 300 )
                    .attr("height", d => 0)
                    .remove();

                svg.select(".goal_label")
                    .transition().duration(500)
                    .style("opacity", 0)
                    .remove();
            }
        }
        else if (section == 1) {
            svg.selectAll(".bar").data(nums).join("rect")
                .attr("class", "bar")
                .attr('y', d => 300)
                .attr('x', (d,i) => 30+i*(box_size+5))
                .attr("height", d => 0)
                .attr("width", box_size)
                .transition().duration(500)
                    .attr('y', d => 300 - d*20)
                    .attr("height", d => d*20);

            svg.append("text")
                .attr("class", "goal_label")
                .attr('y', 330)
                .attr('x', 195)
                .style('text-anchor', "middle")
                .style("opacity",0)
                .text("The Goal: A Simple Bar Chart")
                .transition().duration(500)
                    .style("opacity", 1);
        }
        else if (section == 2) {
            svg.selectAll(".bar").data(nums).join("rect")
                .transition().duration(500)
                .attr('y', d => 300 )
                .attr("height", d => 0)
                .remove();

            svg.select(".goal_label")
                .transition().duration(500)
                .style("opacity", 0)
                .remove();

            svg.selectAll(".selection_box")
                .transition().duration(500)
                .style("opacity", 0)
                .remove();
            svg.selectAll(".selection_label")
                .transition().duration(500)
                .style("opacity", 0)
                .remove();
        }
        else if (section == 3) {
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
                .style("opacity",0)
                .text("existing_rects is an empty selection")
                .transition().duration(500)
                .style("opacity", 1);

            svg.append("text")
                .attr("class", "selection_label")
                .attr('y', 338)
                .attr('x', 195)
                .style('text-anchor', "middle")
                .style("opacity",0)
                .text("containing zero rect elements.")
                .transition().duration(500)
                .style("opacity", 1);


            svg.selectAll(".join_line")
                .transition().duration(500)
                    .style("opacity", "0")
                    .remove();
            svg.selectAll(".join_text")
                .transition().duration(500)
                .style("opacity", "0")
                .remove();

        }
        else if (section == 4) {
            svg.selectAll(".join_line").data(nums).join(
                enter => enter.append("line")
                    .style("opacity",0)
                    .style("stroke-width", 2)
                    .style("stroke-dasharray", "5 2")
                    .style("stroke", "red")
                    .attr("class", "join_line")
                    .attr('x1', (d,i) => 60+0.5*box_size+i*box_size)
                    .attr('y1', 3*box_size-17)
                    .attr('x2', (d,i) => 60+0.5*box_size+i*box_size)
                    .attr('y2', 1.5*box_size)
                    .transition().duration(500)
                        .style("opacity", 1),
                update => update.transition().duration(500)
                        .attr('x1', (d,i) => 60+0.5*box_size+i*box_size)
                        .attr('y1', 3*box_size-17)
            );

            svg.selectAll(".join_text").data(nums).join("text")
                .style("opacity",0)
                .attr("class", "join_text")
                .style('text-anchor', "middle")
                .attr('y', 3*box_size)
                .attr('x', (d,i) => 60+0.5*box_size+i*box_size)
                .text("?")
                .transition().duration(500)
                    .style("opacity", 1);


            svg.selectAll(".bar")
                .transition().duration(500)
                .style("opacity", 0).remove();

           let labels = ["existing_rects is an empty selection", "containing zero rect elements."];
            svg.selectAll(".selection_label").data(labels).text(d=>d);
        }
        else if (section == 5) {
            svg.selectAll(".bar").data(nums).join("rect")
                .attr("class", "bar")
                .attr('y', d => 300)
                .attr('x', (d,i) => 30+i*(box_size+5))
                .attr("height", d => 0)
                .attr("width", box_size)
                .transition().delay((d,i)=>i*50).duration(500)
                    .attr('y', d => 300 - d*20)
                    .attr("height", d => d*20);

            svg.selectAll(".join_text").transition().duration(500).style("opacity", 0).remove();

            svg.selectAll(".join_line").data(nums).join(
                null,
                update => {
                    update.transition().delay((d,i)=>i*50).duration(500)
                        .attr('x1', (d,i) => 55+i*(box_size+5))
                        .attr('y1', (d,i) => 300-d*20)

                }
            );

            let labels = ["existing_rects is now a selection","with six rect elements."];
            svg.selectAll(".selection_label").data(labels).text(d=>d);
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


</style>

<svelte:head>
    <title>D3 Joins: The Basics</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
<h1>D3 Joins: The Basics</h1>

   <div style="margin-top:1em;">
        <Scroller top="{0.15}" bottom="{0.8}" threshold="{0.5}" bind:count bind:index bind:offset bind:progress>
            <div style="float: right" slot="background">
                <svg id="example-box" style="border: 1px solid lightgray;" width="400" height="400"></svg>
                <!--p>Section {index + 1} of {count} is currently active.</p>
                <p>Offset is {offset}, progress is {progress}.</p-->
            </div>

            <div slot="foreground">
                <section><h3>Getting Started</h3>
                    Suppose we started with an array of numbers, which we'll define using a variable named <code>nums</code>.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>let nums = [1, 2, 3, 4, 5, 6];</code>
                    </div>
                    In the figure to the right, we represent this data array using a sequence of red boxes.
                    <p/>
                    Now let's assume that our goal is to create a bar chart to visualize these values. What should we do
                    first?
                    <p/>
                    <p style="font-weight: bold;">Scroll through the rest of this page to see each step in the process.</p>
                </section>
                <section><h3>The Goal</h3>
                    Our goal is to create a sinple bar chart. We'll create a series of bars (like the black bars in
                    the figure to the right) such that we have one bar for each number in the <code>nums</code> array.
                    The height of each bar will need to be proportional to the value of its corresponding number.
                    <p/>
                    Again, this is our goal. To start, however, we only have the array of numbers. We have some work to
                    do to create the corresponding bars.
                </section>
                <section><h3>The Data</h3>
                    The first step is actually already done! We need to define an array of the data that we wish to
                    visualize. In this case, we have a simple array of numbers stored in the variable <code>nums</code>.
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            <span style="font-weight:bold;">
                            // The data array<br/>
                            let nums = [1, 2, 3, 4, 5, 6];<br/>
                            </span>
                        </code>
                    </div>
                    <p/>
                    More generally, we can work with any array of data. It might be an array of numbers like in this
                    example, or it could be an array of objects created by parsing a CSV and applying a few filters to
                    work with only a subset of the original data. Or it could be an array populated by a remote query
                    against a relational database.
                    <p/>In one way or another, we want to create a data array as our first step.

                </section>
                <section><h3>Joining Data to Graphics with Selections</h3>
                    To create a visualization with D3, we need to think in terms of
                    <span style="font-weight:bold">data joins</span>. This is a concept that is at the heart of the D3
                    library, and it comes up in almost everything you do with D3. We'll talk about the simplest
                    form of a data join in this example. More complex situations will be covered in other examples.
                    <p/>
                    At its heart, a data join connects two types of things:
                    <OrderedList style="margin-left:2em;">
                        <ListItem>A data element</ListItem>
                        <ListItem>A visual element</ListItem>
                    </OrderedList>
                    <p/>
                    The data elements are in our <code>nums</code> array. However, the visual elements don't yet exist! After
                    all, that's what we're trying to create!  Eventually, we'll represent each number visually using
                    <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect">SVG rect elements</a>. These
                    allow us to draw rectangles of arbitrary shapes and sizes.  But these rectangles don't exist in our
                    visualization yet.
                    <p/>
                    Nonetheless, to perform a data join we need to refer to both the data elements and our visual
                    elements <span style="font-weight:bold;">even if one of those is empty.</span>  Therefore, we need
                    create what


                    D3 calls a <span style="font-weight:bold">selection</span> of our rectangles. Since we don't have
                    any rectangles yet, the selection will be empty. It's D3's way of representing our situation: we
                    want to have rectangles eventually but right now we don't have any.
                    <p/>
                    <div style="margin:10px; padding:10px; background-color: lightgray">
                        <code>
                            // The data array<br/>
                            let nums = [1, 2, 3, 4, 5, 6];<br/>
                            <br/>
                            <span style="font-weight:bold;">
                            // This will create an empty selection!<br/>
                            let existing_rects = d3.select("svg").selectAll("rect");
                            </span>
                        </code>
                    </div>
                </section>
                <section><h3>Performing the Data Join</h3>
                    Now that we have both <code>nums</code> and <code>existing_rects</code>, we have variables
                    representing the two sets of ingredients we
                    need to perform a data join:
                <OrderedList style="margin-left:2em;">
                    <ListItem>Data elements (in this case, numbers)</ListItem>
                    <ListItem>Visual elements (in this case, rect elements)</ListItem>
                </OrderedList>
                <p/>
                We now connect these two variables using the D3 selection's <code>.data(...)</code> function. Here are
                    the three lines of code we've discussed so far:
                <div style="margin:10px; padding:10px; background-color: lightgray">
                    <code>
                        // The data array<br/>
                        let nums = [1, 2, 3, 4, 5, 6];<br/>
                        <br/>
                        // This will create an empty selection since we have no rectangles yet!<br/>
                        let existing_rects = d3.select("svg").selectAll("rect");<br/>
                        <br/>
                        <span style="font-weight:bold;">
                        // Perform the data join<br/>
                        let data_join_result = existing_rects.data(nums);
                        </span>
                    </code>
                </div>
                Of course, our <code>nums</code> array has 6 items while the <code>existing_rects</code> selection has
                    zero. This mismatch in the number of items (6 data items but 0 visual items) means that there are 6
                    data items for which we don't have a corresponding visual element.
                    <p/>
                    These 6 data items with no matching visual element are indicated by dashed lines and question marks
                    in the figure to the right.
                </section>
                <section><h3>Adding new Rectangles</h3>
                    All that's left is to join the 6 un-matched data items produced by the previous step with new
                    rectangles to represent them in our visualization. These new rectangles will make up our bar chart.
                    <p/>
                    We use the D3 selection's <code>.join(...)</code> function for this. We specify the type of element
                    we wish to add (in this case, SVG rect elements) and define the required attributes: x, y, height,
                    width. Some, such as width, are constants. Others, such as the bar height, are functions of the
                    individual data elements (<code>d</code>) or the position of those elements in the <code>nums</code>
                    array (<code>i</code>).
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
                            <span style="font-weight:bold;">
                            // Join the unmatched data items to new rectangles.<br/>
                            data_join_result.join("rect")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.style("fill", "black")<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('x', (d,i) => i*55)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr('y', d => 300 - d*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("height", d => d*20)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;.attr("width", 50);<br/>
                            </span>
                        </code>
                    </div>
                    <h3>Next Steps...</h3>
                    <p/>
                    Want to experiment with an interactive version of this program? <a href="https://glitch.com/edit/#!/d3-joins-the-basics">Click here</a>!
                    <p/>
                    As mentioned previously, this lesson introduces the simplest form of D3 data join.  <a href="d3_more_joins">The next lesson will go
                        more into joins in more depth</a> by introducing the Enter, Update, and Exit concepts.
                </section>
            </div>
        </Scroller>
   </div>
</Content>
