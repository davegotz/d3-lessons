<script>
    import { onMount } from 'svelte';
    import {
        ListItem,
        UnorderedList,
        CodeSnippet,
        Content,
    } from "carbon-components-svelte";
    import SiteHeader from "$lib/SiteHeader.svelte";
    import * as d3 from 'd3';

    let count, index, offset, progress;

    onMount(() => {
        // This is the data array which will be represented as a bar chart.
        let data = [4, 8, 15, 16, 23, 42];

        // Define an x and y scale.
        let x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, 500]);

        let y = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, 300]);

        // Select the chart svg which will be the container for the new bar chart
        let chart = d3.select(".chart");

        let bar_height = 20;
        let bar_spacing = 2;
        let text_spacing = 6;

        chart.selectAll("rect")
            .data(data).join("rect")
            .style("fill", "steelblue")
            .attr("x", 0)
            .attr("y", (d,i) => (bar_height+bar_spacing)*i)
            .attr("height", bar_height)
            .attr("width", d => d);

        // Select the chart svg which will be the container for the new bar chart
        chart = d3.select(".chart_scaled");

        // Update the bar height
        bar_height = y(1) - y(0) - bar_spacing;

        // Perform the data join and create rects for each item in our data array.
        chart.selectAll("rect")
            .data(data).join("rect")
            .style("fill", "steelblue")
            .attr("x", 0)
            .attr("y", (d,i) => y(i))
            .attr("height", bar_height)
            .attr("width", d => x(d));

        // Now the next version with text labels.
        chart = d3.select(".chart_with_text");

        // Perform the data join and create rects for each item in our data array.
        chart.selectAll("rect")
            .data(data).join("rect")
            .style("fill", "steelblue")
            .attr("x", 0)
            .attr("y", (d,i) => y(i))
            .attr("height", bar_height)
            .attr("width", d => x(d));

        // Perform the data join and create text elements for each item in our data array.
        chart.selectAll("text")
            .data(data).join("text")
            .style("fill", "white")
            .style("font-family", "sans-serif")
            .style("font-size", "16pt")
            .style("text-anchor", "end")
            .style("dominant-baseline", "middle")
            .attr("x", d => x(d)-text_spacing)
            .attr("y", (d,i) => y(i)+0.5*bar_height)
            .text(d => d);


        // Define an x and y scale.
        x = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, 500]);

        y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([300, 0]);

        // Select the chart svg which will be the container for the new bar chart
        chart = d3.select(".chart_final");

        // Define some layout parameters.
        let bar_width = x(1) - x(0) - bar_spacing;

        // Perform the data join and add the new rectangles
        chart.selectAll("rect")
            .data(data).join("rect")
            .style("fill", "steelblue")
            .attr("x", (d,i) => x(i))
            .attr("y", d => y(d))
            .attr("height", d => 300-y(d))
            .attr("width", bar_width);

        // Perform the data join again, this time to create the text labels to show the data values.
        chart.selectAll("text")
            .data(data).join("text")
            .style("fill", "white")
            .style("font-family", "sans-serif")
            .style("font-size", "16pt")
            .style("text-anchor", "middle")
            .style("dominant-baseline", "hanging")
            .attr("x", (d,i) => x(i) + 0.5*bar_width)
            .attr("y", d => y(d)+text_spacing)
            .text(d => d);

    });

</script>

<style>
    .chart {
        box-sizing:content-box;
        display:block;
    }
</style>

<svelte:head>
    <title>Let's Make a Bar Chart with SVG</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
    <h1>Let's Make a Bar Chart with SVG</h1>

    <p>This tutorial is Part 2 of a series that begins with <a href="/lets_make_a_bar_chart">the introductory Let's
        Make a Bar Chart lesson</a>.  In this followup, we'll switch from using basic DIV elements in a web page to
        using SVG (Scalable Vector Graphics). This will get us one big step closer to the full power of D3 to create highly graphical and
        interactive data visualizations.</p>

    <p>Before you begin, you should have a basic understanding of what SVG provides. There are
        online tutorials for SVG (e.g., <a href="https://www.w3schools.com/graphics/svg_intro.asp">here</a> and
        <a href="https://developer.mozilla.org/en-US/docs/Web/SVG">here</a>)
        that can be good background for what we'll discuss on here.</p>

    <p>For this lesson, the following key ideas are most important:</p>

    <UnorderedList style="margin-left:2em;">
        <ListItem>Browsers can render SVG "scenes" to create pictures embedded within a web page.</ListItem>
        <ListItem>A "scene" in SVG is defined as a hierarchy of elements as part of an HTML page.</ListItem>
        <ListItem>Browsers allow SVG scenes to be defined via a <code>&lt;svg&gt;</code> element. Other SVG elements can
            be added as children of this element to define a scene.
        </ListItem>
        <ListItem>SVG defines several types of elements including rect (for rectangles), circle, ellipse, line,
            polyline, polygon (like polyline, but creates a closed shape), and a general path for arbitrary shapes
            including curves.
        </ListItem>
    </UnorderedList>

    <h3>An SVG Element as a Container</h3>

    <p>In our <a href="lets_make_a_bar_chart">previous lesson</a>, we created a bar chart by appending a set of DIVs
        (one for each bar) to a parent DIV that was the overall container for the bar chart.

        In this example, we'll do something very similar. We'll add SVG rectangles (rect elements) to a parent SVG
        element. In the code snippet below, you'll see we now have a SVG element of class "chart." You can also see that
        we've assigned a height and width to the SVG element.  In this case, we'll create a chart that is 300x500
        pixels in size.</p>

    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <h3>Creating a D3 Selection</h3>

    <p>The next step is exactly the same as it was in our prior lesson. We
    <emph>select</emph> the "chart" SVG element and store this selection in a variable.  This is the selection
    we'll use when appending bars to our bar chart.</p>
        <CodeSnippet type="multi" hideCopyButton>&lt;html>
    <body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Select the chart svg which will be the container for the new bar chart
            let chart = d3.select(".chart");
        &lt;/script>

    &lt;/body>
&lt;/html>
        </CodeSnippet>

    <h3>Using the D3 Data Join to Add the Bars</h3>

    <p>Like last time, we'll use D3's <emph>data join</emph> to add bars to our chart.  However, this time we'll append
        SVG rect elements to the chart instead of DIVs.  Since we're using rect elements, we need to define the required
        attributes: <code>x</code>x, <code>y</code>, <code>width</code>, and <code>height</code>.  We also need to use
        the right CSS style attributes for SVG which differ a bit from how we style DIVs in traditional HTML. Finally, SVG
        rect elements can't contain text.  So we'll have to add text labels separately. For now, we just skip the text labels
        and focus on the bars. Otherwise, you should see this looks almost identical to what we had in <a href="lets_make_a_bar_chart">our previous lesson</a>.
        </p>

    <p>Here is the updated example using SVG rects to create a basic bar chart.</p>
    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js"&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Select the chart svg which will be the container for the new bar chart
            let chart = d3.select(".chart");

            // Define some layout parameters.
            let bar_height = 40;
            let bar_spacing = 2;

            // Perform the data join and add the new rectangles
            chart.selectAll("rect")
                .data(data).join("rect")
                    .style("fill", "steelblue")
                    .attr("x", 0)
                    .attr("y", (d,i) => (bar_height+bar_spacing)*i))
                    .attr("height", bar_height)
                    .attr("width", d => d);
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <p>Here is the output produced by the code above. We've added a think black border around the SVG element to let you
        see how it takes up 300x400 pixels, but the chart appears only in the top left.  To fix this, we'll want to use
        scales.
        </p>
    <svg class="chart" height="300" width="500" style="border:1px solid black;">
    </svg>


    <h3>Scales for the X and Y Axes</h3>

    <p>In this version of the chart, we have two axes: the <code>x</code> axis represents the value of the number;
        the <code>y</code> axis represents the index of the number in the array.  We use the y axis to position the
        bars to a fixed height of 20 in the previous step of this example.  Meanwhile, we used to raw data value to
        set the width of each bar. Now we're going to use D3 scales to make the charts take up the full height and width
        of the SVG element.  Let's create the two scales.</p>

<CodeSnippet type="multi" hideCopyButton>let x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 500]);

let y = d3.scaleLinear()
    .domain([0,data.length])
    .range([0,300]);
</CodeSnippet>

    <p>Now we can use the <code>x</code> scale to map data values to the range 0-500 on the x axis.  For
    the y axis, we can determine the height of a single bar by calculating the difference between y(1) and y(0) (i.e., the
    y axis positions for the first two bars.  We further subtract the <code>bar_spacing</code> variable to leave a
    small gap between the bars.</p>

    <p>At ths point, all we need to do is insert these scales into our overall web page and use them when setting the
        position and width of the <code>rect</code>s.</p>

    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Define an x and y scale.
            let x = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, 500]);

            let y = d3.scaleLinear()
                .domain([0, data.length])
                .range([0, 300]);

            // Select the chart svg which will be the container for the new bar chart
            let chart = d3.select(".chart");

            // Define some layout parameters.
            let bar_spacing = 2;
            let bar_height = y(1) - y(0) - bar_spacing;

            // Perform the data join and add the new rectangles
            chart.selectAll("rect")
                .data(data).join("rect")
                    .style("fill", "steelblue")
                    .attr("x", 0)
                    .attr("y", (d,i) => y(i))
                    .attr("height", bar_height)
                    .attr("width", d => x(d));
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <p>Nice! Now we have our chart so far! This version will re-scale as new data items are added to the array so that
    it will always fit within the 300x500 SVG area. Sweet!</p>
    <svg class="chart_scaled" height="300" width="500" style="border:1px solid black;">
    </svg>

    <h3>Adding Text Labels</h3>
    <p>The next step is to add our text labels. Text in SVG has its own element type. We can append
        these to the bar chart just like we did with the rectangles. We just need to make sure we assign values
        for the various text attributes that SVG defines for us.  We add some style settings to right align the
        text at the end of the bars.  We could also set a class for these text elements and use standard CSS
        to specify these style attributes.</p>


    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Define an x and y scale.
            let x = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, 500]);

            let y = d3.scaleLinear()
                .domain([0, data.length])
                .range([0, 300]);

            // Select the chart svg which will be the container for the new bar chart
            let chart = d3.select(".chart");

            // Define some layout parameters.
            let text_spacing = 4;
            let bar_spacing = 2;
            let bar_height = y(1) - y(0) - bar_spacing;

            // Perform the data join and add the new rectangles
            chart.selectAll("rect")
                .data(data).join("rect")
                    .style("fill", "steelblue")
                    .attr("x", 0)
                    .attr("y", (d,i) => y(i))
                    .attr("height", bar_height)
                    .attr("width", d => x(d));

            // Perform the data join again, this time to create the text labels to show the data values.
            chart.selectAll("text")
                .data(data).join("text")
                    .style("fill", "white")
                    .style("font-family", "sans-serif")
                    .style("font-size", "16pt")
                    .style("text-anchor", "end")
                    .style("dominant-baseline", "middle")
                    .attr("x", d => x(d)-text_spacing)
                    .attr("y", (d,i) => y(i)+0.5*bar_height)
                    .text(d => d);
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>
    <svg class="chart_with_text" height="300" width="500" style="border:1px solid black;">
    </svg>

    <h3>Now with Vertical Bars</h3>
    <p>Using SVG for a simple chart like this might seem unnecessary. We could, after all, use the same DIV-based approach
        we followed in the first lesson in this series to create a similar chart with just a few tweaks to sizes and the
        layout.  The full power of SVG, however, is that we can use arbitrary shapes and arbitrary layout options.  For
        example, a vertical bar chart would be a little more difficult to with plain old DIVs.  Let's take a look at a
        slightly modified version of our SVG-based chart which results in a vertical bar version.</p>

    <p>We essentially swap the <code>x</code> and <code>y</code> scales in this version, reflecting the fact that a vertical
    bar chart uses height to encode values.</p>


    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        &lt;svg class="chart" height="300" width="500">
        &lt;/svg>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Define an x and y scale.
            let x = d3.scaleLinear()
                .domain([0, data.length])
                .range([0, 500]);

            let y = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([300, 0]);

            // Select the chart svg which will be the container for the new bar chart
            let chart = d3.select(".chart");

            // Define some layout parameters.
            let text_spacing = 4;
            let bar_spacing = 2;
            let bar_width = x(1) - x(0) - bar_spacing;

            // Perform the data join and add the new rectangles
            chart.selectAll("rect")
                .data(data).join("rect")
                .style("fill", "steelblue")
                .attr("x", (d,i) => x(i))
                .attr("y", d => y(d))
                .attr("height", d => 300-y(d))
                .attr("width", bar_width);

            // Perform the data join again, this time to create the text labels to show the data values.
            chart.selectAll("text")
                .data(data).join("text")
                .style("fill", "white")
                .style("font-family", "sans-serif")
                .style("font-size", "16pt")
                .style("text-anchor", "middle")
                .style("dominant-baseline", "hanging")
                .attr("x", (d,i) => x(i) + 0.5*bar_width)
                .attr("y", d => y(d)+text_spacing)
                .text(d => d);

        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <p>Here is the final chart with vertical bars.</p>
        <svg class="chart_final" height="300" width="500" style="border:1px solid black;">
        </svg>

    <h3>Next Steps...</h3>
    <p>Want to experiment with an interactive version of this program? <a href="https://glitch.com/edit/#!/lets-make-a-bar-chart-with-svg">Click here</a>!</p>

    <p>Ready to learn more? Check out the other lessons on this site using the menus at the top.  More lessons will be added over time.</p>
</Content>
