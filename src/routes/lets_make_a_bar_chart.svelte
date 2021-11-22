<script>
    import { onMount } from 'svelte';
    import {
        CodeSnippet,
        Content,
    } from "carbon-components-svelte";
    import SiteHeader from "$lib/SiteHeader.svelte";
    import * as d3 from 'd3';
    import copy from "clipboard-copy";

    let count, index, offset, progress;

    onMount(() => {
        // This is the data array which will be represented as a bar chart.
        let data = [4, 8, 15, 16, 23, 42];

        // Select the chart div which will be the container for the new bar chart
        let chart = d3.select(".chart");

        chart.selectAll("div")
            .data(data)
            .join("div")
            .style("background", "steelblue")
            .style("color", "white")
            .style("text-align", "right")
            .style("font", "10px sans-serif")
            .style("padding", "3px")
            .style("margin", "1px")
            .style("width", d => d+"px")
            .text(d => d);

        let x = d3.scaleLinear()
            .domain([0,d3.max(data)])
            .range([0,500]);
        // Select the chart div which will be the container for the new bar chart
        chart = d3.select(".chart_final");

        chart.selectAll("div")
            .data(data)
            .join("div")
            .style("background", "steelblue")
            .style("color", "white")
            .style("text-align", "right")
            .style("font", "10px sans-serif")
            .style("padding", "3px")
            .style("margin", "1px")
            .style("width", d => x(d)+"px")
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
    <title>Let's Make a Bar Chart</title>
</svelte:head>

<SiteHeader></SiteHeader>
<Content>
    <h1>Let's Make a Bar Chart</h1>

    <p>This brief introduction to D3 provides an example of how to use D3 to create a simple bar chart. It will show to
        map an array of data to a set of bars (represented as DIVs on a web page) where the lengths of the bars
        represent the values found in the data.</p>

    <p>The example on this page is based on <a href="https://observablehq.com/@d3/lets-make-a-bar-chart">the official
        D3.js tutorial</a> of the same name which
        can be found on Observable. Observable notebooks are a fun and powerful tool for experimenting with data using
        JavaScript. However, they also introduce their own syntax and quirks. In this tutorial, we try to strip away all
        of those "special" coding practices and show how to achieve the result in plain JavaScript.</p>

    <p>Note that this is just the first of a set of examples in the Let's Make a Bar Chart series. Be sure to view them
        all using the menus at the top!</p>

    <h3>Starting with Data</h3>

    <p>In this example, we will create a bar chart to represent an array of numbers. We'll start with a simple
        array of numbers. Our goal will be to create a bar chart to display these numbers in a web page.</p>

    <CodeSnippet type="multi" hideCopyButton>let data = [4, 8, 15, 16, 23, 42];</CodeSnippet>

    <h3>Data in a Web Page</h3>

    <p>Suppose the data above was defined within a simple web page using the script tag as shown below. You'll notice that
        the D3 library is also included since we'll be using that to create the bar chart. By including the D3 library,
        a global variable named <code>d3</code> is defined. That global variable gives
        us access to all of d3's functionality.</p>
        <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        <div class="chart">
        </div>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];
        &lt;/script>
    &lt;/body>
&lt;/html>
        </CodeSnippet>

    <p>If you look closely at the code above, you will also see that there is a <code>div</code> at the bottom of the
        page with class "chart". This is the place on the page where we'll add the bar chart. We'll accomplish this by
        adding new elements to the web page as children of this "chart" <code>div</code>. For each bar in the bar chart,
        we'll append to the page a new <code>div</code> whose width is proportional to the corresponding number in the
        <code>data</code> array.</p>

    <h3>Creating a D3 Selection</h3>

    <p>Before we can append a set of new <code>div</code> elements (one for each value in the data array) to the "chart"
    <code>div</code>, we need to <emph>select</emph> the "chart" div and store this selection in a variable.  Then we
    can use that variable when we append the new elements we need to create the bars.</p>

    <p>D3 makes it easy to select an item from a web page using an element type, a class name, or an element ID.  D3
        uses the same notation that CSS uses for classes (a . prefix) and IDs (a # prefix).  So, if we want to select
        the "chart" div, we can reference it as ".chart" as follows: <code>d3.select(".chart")</code>.  The code
        below shows this selection statement within the larger web page.
         </p>
        <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        <div class="chart">
        </div>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Select the chart div which will be the container for the new bar chart
            let chart = d3.select(".chart");
        &lt;/script>

    &lt;/body>
&lt;/html>
</CodeSnippet>


    <h3>Using the D3 Data Join to Add the Bars</h3>

    <p>We're now ready to create the main elements o the bar chart using D3's <emph>data join</emph>.  The data join is
        perhaps the most important a core concept behind D3. It allows us to connect a selection of elements in our web
        page to an array of data, deriving properties of the web page elements from that data (e.g., the width of a
        <code>div</code> based on the value of a number in a data array).</p>

    <p>We begin with the <code>chart</code> variable which is a D3 selection containing the element which will be the
        container for our bar chart. We then use D3's <code>.selectAll(...)</code> to select all <code>div</code> elements
        that within <code>chart</code>.  This call to <code>chart.selectAll("div")</code> will return an empty selection
        because the <code>chart</code> div is initially empty in our web page.</p>

    <p>We next add a call to D3's <code>.data(...)</code> on that empty selection to link it with the data array we aim
        to visualize in the bar chart.  In the code listing below, you'll see <code>chart.selectAll("div").data(data)</code>
        for this step.  Next, we call <code>.join("div")</code> which tells D3 that we want to append new <code>div</code>
        elements for each new data item.  You can read more about the
        <a href="https://github.com/d3/d3-selection/blob/main/README.md#selection_join">join function in D3's documentation</a>
        or <a href="https://observablehq.com/@d3/selection-join">via a short tutorial on Observable.</a></p>

    <p>The remaining code for this section sets a number of style attributes for each div that is added to the web page.
    It sets some constant values that are the same for all bars (e.g., background color and font), as well as some attributes
    that are data-driven. Notice that the width and text values are "functions of d" in the code below. This is what gives
    D3 (data-driven documents) it's name! New document elements (in this case, divs) are added to represent the
    items in the data array, and the properties of those elements are determined by the values of those items in the
    data array.</p>

    <p>Here is the entire example so far, and below the code you'll see the output that this code creates.</p>
    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js"&lt;/script>

        <div class="chart">
        </div>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Select the chart div which will be the container for the new bar chart
            let chart = d3.select(".chart");

            // Perform the data join and create divs for each item in our data array.  Notice that both the width
            // and the text for each div are derived as a function of the data.  The other style attributes are
            // data independent.
            chart.selectAll("div")
                .data(data).join("div")
                    .style("background", "steelblue")
                    .style("color", "white")
                    .style("text-align", "right")
                    .style("font", "10px san-serif")
                    .style("padding", "3px")
                    .style("margin", "1px")
                    .style("width", d => d+"px")
                    .text(d => d);
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <p>Here is the output produced by this code. You'll see we have 6 divs, one for each item in our data array.  The
        divs have numbers corresponding to the values in the data array, and the width of each bar measured in pixels is
        equal to the values in the data array. Our first bar chart! But it's really narrow... so we still have some work
        to do.</p>
    <div class="chart">
    </div>


    <h3>Creating a Scale</h3>

    <p>In the previous section, we created a set of <code>div</code> elements and set the width of each to the same
        value as the numbers in the data array.  This worked, but notice how narrow the chart is!  Since our data's max
        value is just 42, our chart is just 42 pixels across.  That's pretty small on a normal monitor.  It sure would
        be nice to create a bigger chart... say 500 pixels across.</p>

    <p>D3 provides a different types of <emph>scales</emph> (linear, log, power, etc.) which make this type of process
        easy to accomplish. To use it, we need to know both the <emph>domain</emph> and the <emph>range</emph>
        for the scale. The domain is the extent of the data values we want to represent. In this case, we want our bars to
        represent data values from 0 to the maximum value in the data array (42). The range is the number of pixels used
        to represent these values. We will base this on the width of the chart on the screen. If we aim to make a chart
        that is 500 pixels wide, then we want a data value of 0 to map to a bar that is 0 pixels wide, and the maximum
        value in the data array (42) to map to a bar that is 500 pixels wide.</p>

    <p>We can define a D3 scale to accomplish this using linear interpolation as shown below. We store our scale in a
        variable named <code>x</code> because it represents the scale for the horizontal x axis of our bar chart.</p>
<CodeSnippet type="multi" hideCopyButton>
let x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 500]);
</CodeSnippet>

    <p>All we need to do is insert this scale into our overall web page and use it when setting the width of the
        <code>div</code>s.</p>

    <CodeSnippet type="multi" hideCopyButton>&lt;html>
    &lt;body>
        &lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>

        <div class="chart">
        </div>

        &lt;script>
            // This is the data array which will be represented as a bar chart.
            let data = [4, 8, 15, 16, 23, 42];

            // Define an x scale.
            let x = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, 500]);

            // Select the chart div which will be the container for the new bar chart
            let chart = d3.select(".chart");

            chart.selectAll("div")
                .data(data).join("div")
                    .style("background", "steelblue")
                    .style("color", "white")
                    .style("text-align", "right")
                    .style("font", "10px san-serif")
                    .style("padding", "3px")
                    .style("margin", "1px")
                    .style("width", d => x(d)+"px")
                    .text(d => d);
        &lt;/script>
    &lt;/body>
&lt;/html>
    </CodeSnippet>

    <p>That's it!  Here is what our final chart looks like once we've used a scale to give 500 pixels in width.</p>
    <div class="chart_final">
    </div>

    <h3>Next Steps...</h3>
    <p>Want to experiment with an interactive version of this program? <a href="https://glitch.com/edit/#!/lets-make-a-bar-chart">Click here</a>!</p>

    <p>Ready to learn more? <a href="/lets_make_a_bar_chart_svg">Click here to try creating a version of this chart with SVG</a>!</p>
</Content>
