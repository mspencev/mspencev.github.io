
var parseDate = d3.timeParse("%m/%d/%Y");


d3.csv("data/prices.csv")
    .row(function(d){return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};}) //transform the data, each row to an object
    .get(function(error,data){   //go fetch a csv file
        console.log(JSON.stringify(data));


        var height = 300;
        var width = 500;

        var maxPrice = d3.max(data,function(d){return d.price;});
        var minDate = d3.min(data, function(d){return d.month});
        var maxDate = d3.max(data, function(d){return d.month});


        //SCALES

        var yScale = d3.scaleLinear()
            .domain([0,maxPrice])
            .range([height, 0]);

        var xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, width]);

        //AXIS

        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);

        //PAGE ELEMENTS

        var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

        var margin = {left:50,right:50,top:40,bottom:0};

        var chartGroup = svg.append("g")
            .attr("transform", "translate("+margin.left+","+margin.top+")");


        //CHART LINE
        var line = d3.line()
            .x(function (d) {return xScale(d.month);})
            .y(function (d) {return yScale(d.price);});


        //ADD THINGS TO YOUR GROUP
        chartGroup.append("path")
            .attr("d", line(data));

        chartGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,"+height+")")
            .call(xAxis);

        chartGroup.append("g")
            .attr("class", "y axis")
            .call(yAxis);


    }); //end of get()


