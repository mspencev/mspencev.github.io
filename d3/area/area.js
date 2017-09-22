var dataArray = [25,27,29,32,37,45,55,70,90,120,135,150,160,168,172,177,180];

var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013',
    '2014','2015','2016'];

///////////////////
//  PATH:  AREA  (chart)
///////////////////

var height = 200;
var width = 500;

//We need this to convert our x-data to dates
var parseDate = d3.timeParse("%Y");

console.log(d3.max(dataYears, function(d){return parseDate(d);}));

////////////////////
// SCALES
////////////////////

//Create a Scale: maps from our y-axis data to the pixel location of that data
// All scales have:  1) type of scale 2) domain (input) 3) range (output)
//   Note: domain = min/max of data;  range = min/max pixel location
var yScale = d3.scaleLinear()
    //.domain([0, 180])
    .domain([0, d3.max(dataArray)])
    .range([0, height]); //invert because browser draws from top to bottom

//check the scale mapping
console.log(yScale(0));  //maps to 200
console.log(yScale(90));  //maps to 100
console.log(yScale(180)); //maps to 0


var xScale = d3.scaleTime()
    .domain(d3.extent(dataYears, function(d){return parseDate(d);}))
    .range([0,width]);

//Check the mapping
// console.log(xScale(parseDate('2010')));
// console.log( d3.extent(dataYears, function(d){return parseDate(d);}));
// for( var i = 0; i < 17; ++i){
//     console.log("i = 0: " + xScale(parseDate(dataYears[i])));
// }

var margin = {left:50,right:50,top:40,bottom:0};

////////////////////
// AXIS GENERATORS
////////////////////

//Create an axis generator
var yAxis = d3.axisLeft(yScale) //Left means line up the numbers on the left side of the axis
            .ticks(3) //Suggesting the number of ticks (may actually have more, so it's a multiple of a nice even nubmer)
            .tickPadding(10)
            .tickSize(8);

var xAxis = d3.axisBottom(xScale); //Left means line up the numbers on the left side of the axis


////////////////////
// AREA GENERATOR
////////////////////

//Create an area generator
var area = d3.area()
                //.x(function(d,i){return i*20;})
                .x(function(d,i){return xScale(parseDate(dataYears[i])); })
                .y0(height) //Lower line (for example, the base line if this is a graph)
                .y1(function(d){return yScale(d);})   //Upper line

////////////////////
// MAIN TAG
////////////////////

//Create our main SVG tag
var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

////////////////////
// GROUP THINGS TOGETHER
////////////////////

//Create a group element in svg ("g" is SVG's name for a group, so this has to be "g")
var chartGroup = svg.append("g")
    //Use transform to move the group where we want it.
    .attr("transform", "translate("+margin.left+","+margin.top+")");

//Add a path to the group, populated with the area generator
chartGroup.append("path")//SVG has a path element
    .attr("d", area(dataArray));

//Add the y scale to the group (which itself is a group--hence this second 'g'--populated with the axis generator)
chartGroup.append("g")
    .attr("class", "axis y") //"axis<space>y" means we'er applying both the axis and the y class
    .call(yAxis);

//Add the x scale to the group
chartGroup.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0,"+height+")")
    .call(xAxis);