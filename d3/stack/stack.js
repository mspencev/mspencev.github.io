var parseDate = d3.timeParse("%Y");

d3.xml("Exercise_Files/Ch_08/08_02/data2.xml").get(function(error, xml){


    var height = 200;
    var width = 500;
    var margin = {left:50,right:50,top:40,bottom:0};


    xml = [].map.call(xml.querySelectorAll("dat"), function(d) {
        return {
            date: parseDate(d.getAttribute("id")),
            top: +d.querySelector("top").textContent,
            middle: +d.querySelector("middle").textContent,
            bottom: +d.querySelector("bottom").textContent
        };
    });

    console.log(xml);

    //SCALES

    var xScale = d3.scaleTime()
        .domain(d3.extent(xml, function(d){return d.date;}))
        .range([0,width]);

    var yScale = d3.scaleLinear()
        .domain([0,d3.max(xml, function(d){return d.top+d.middle+d.bottom;})])
        .range([height,0]);

    var categories = ['top','middle','bottom'];

    //Create a stack generator
    var stack = d3.stack().keys(categories);

    //Create area generator
    var area = d3.area()
        .x(function(d){return xScale(d.data.date);})
        .y0(function(d){return yScale(d[0]);})
        .y1(function(d){return yScale(d[1]);});

    //Add an SVG
    var svg = d3.select("body").append("svg")
        .attr("height","100%")
        .attr("width","100%");

    //Create a group
    var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");

    var stacked =  stack(xml);


    //In D3 v4, no need to create the axis generator separately.
    chartGroup.append("g")
        .attr("class", "x axis")
        .attr("transform","translate(0,"+height+")")
        .call(d3.axisBottom(xScale));

    chartGroup.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale).ticks(5));

    //Option 1:  on gropu for all paths.
    //Add Path elements --note we're adding multiple paths
    // chartGroup.selectAll("path.area")
    //     .data(stacked)
    //     .enter().append("path")
    //         .attr("class", "area")
    //         .attr("d", function(d) {return area(d);}) //runs three times, each time d is an array of 26

    //Option 2:  add one group per path
    chartGroup.selectAll("g.area")
        .data(stacked)         //1) For every item in stacked...
        .enter().append("g")   //2) a append me a group and...
            .attr("class", "area")
        .append("path")            //and into each group append the path.
            .attr("class", "area")
            .attr("d", function(d) {return area(d);})



});