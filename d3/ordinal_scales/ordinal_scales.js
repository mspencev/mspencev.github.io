
var dataArray = [5,11,18];
var dataDays = ['Mon', 'Wed', 'Fri'];

//////////////////////////
//  HISTOGRAM
//////////////////////////



//create a color scale so we can color our bars

//With a scaleSequential scale, you supply an algorithm for each input data point to get your output data point (no range)
var rainbowScale = d3.scaleSequential(d3.interpolateRainbow)
    .domain([0, 10]);  //split the color range into 10 sections

//Or, if you wanted, you coudl create or use a pre-defined color scheme.  cat20 is a popular one:
var cat20 = d3.schemeCategory20;
console.log(cat20);

//scaleChromatic - Cyntha Brewer scale, - a plug-in for D3 version4

//Create an ordinal scale:
var xScale = d3.scaleBand()//d3.scaleOrdinal()  //try also scalePoint, with range([0,170]), or
    .domain(dataDays)
    //.range([25,85,145]);
    .range([0,170]) //170 pixels wide
    .paddingInner(0.1176); //we have 3 bars, 2 gaps, each gap is 10px.  the full width is 170, so about 11.76% is white space.


var xAxis = d3.axisBottom(xScale);


//Add an SVG
var svg = d3.select("body").append("svg")
    .attr("height","100%")
    .attr("width","100%");


//Add rectangles to our svg


svg.selectAll("rect") //Find the svg element and look for any "rect" elements, returning an array of what it finds.
    .data(dataArray)  //Binds data to the selection of graphical elements, 5 to the first, 11 to the next, 18 to the last.
                      //Since there are no rectangles to bind the data to, it creates an "enter" selection and
                      // adds the data to it.

    .enter() // the "enter" selection is all the data that does not match a found "rect". All three elements in this
             // case will be added to the enter selection because we will find no rects in svg.
    .append("rect") //adds (or appends) a rectangle to the enter selection ( for each item in the "enter" selection).
                    //it's this line that actually tells the code we are going to create rectangles--it could be any shape.
     //  Note if it found more rectangles than items in the data?  It would put the unmatched rectangle into a
     // "exit" selection.  Rather than an enter().append, you might see an exit().remove()

        //add minimum (manditory) attributes to define a rectangle: height,width,x,y (x,y defaults to 0,0)
        //.attr("height","200")  // not 200, want to make the height match the data point
        //.attr("width","50") //browse assumes pixels
        //.attr("x","20")  //Uh-oh, all rects will be on top of each other...
        //.attr("y","100");   //The 'y' positions the top-most part of bar, so invert the y by shifting it down.

        .attr("height",function(dataPoint, index){return dataPoint*15;})
        .attr("width","50") //browse assumes pixels
        .attr("x", function(dataPoint,index){return 60*index;}) //index = position of data point within the array
        .attr("y", function(d,i){ return 300-(d*15);})  //d*15 = bar height

        //Add optional attribute of fill to color it in:
        .attr("fill", function(d,i){return cat20[i];});
        // .attr("fill", function(d,i){return rainbowScale(i);});



svg.append("g")
    .attr("class", "x axis hidden")
    .attr("transform", "translate(0,300)")
    .call(xAxis);
