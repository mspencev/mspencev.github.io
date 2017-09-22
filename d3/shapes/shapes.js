
var dataArray = [5,11,18];

//////////////////////////
//  HISTOGRAM
//////////////////////////

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
        .attr("fill", "red");


//////////////////////////
//  CIRCLES
//////////////////////////


var newX = 300;
svg.selectAll("circle.first") //Circle elements with class=first
    .data(dataArray)
    .enter().append("circle")
        .attr("class", "first")
        .attr("cx",function(d,i) { newX+=(d*3)+(i*20); return newX;}) //space out circles, giving room based on their size.
        .attr("cy", "100" )
        .attr("r",function(d){ return d*3;}); //If you're not using "i", you can leave it out.


//////////////////////////
//  ELLIPSES
//////////////////////////


newX = 600;
//svg.selectAll("circle.second") //Circle elements with class=second
svg.selectAll("ellipse")
    .data(dataArray)
    //.enter().append("circle")
        //.attr("class", "second")
    .enter().append("ellipse")
        .attr("cx",function(d,i) { newX+=(d*3)+(i*20); return newX;}) //space out circles, giving room based on their size.
        .attr("cy", "100" )
        .attr("rx",function(d){ return d*3;}) //If you're not using "i", you can leave it out.
        .attr("ry", "30");


//////////////////////////
//  LINES
//////////////////////////


newX = 900;
svg.selectAll("line")
    .data(dataArray)
    .enter().append("line")
        // .style("stroke", "blue")    //Or, could use a direct attribute:  .attr("stroke", "blue"). STyle takes presidence
        // .attr("stroke-width", "2")
        // instead, I set these values in the .css file:  line { stroke: red; }
        // NOTE:  order of presidence:  style, css, attribute
        //        Rule of thumb:  use css first, then attribute, then style (if you have to)
        .attr("x1", newX )
        .attr("y1", function(d,i) { return 80+(i*20);} )
        .attr("x2", function(d,i) { return newX+d*15;} )
        .attr("y2", function(d,i) { return 80+(i*20);} );



//////////////////////////
//  TEXT
//////////////////////////



// svg.append("text")
//     .attr("x", newX)  //Bottom-left by default, but can configure with text-anchor and dominant-baseline
//     .attr("y", 150)
//     .attr("fill","none")
//     .attr("stroke","blue")
//     .attr("stroke-width","2")
//     .attr("font-size", "30")
//     .attr("text-anchor", "start")  //change where the "x" is relative to the text
//     .attr("dominant-baseline", "middle") //change where the "y" is relative to the text
//     .text("Start"); //Each character is a shape!  That can be stretched or rotated
//
// svg.append("text")
//     .attr("x", newX)
//     .attr("y", 180)
//     .attr("fill","blue")
//     .attr("stroke","none")
//     .attr("font-size", "30")
//     .attr("text-anchor", "middle") //or end
//     .attr("dominant-baseline", "middle") //verticle alignment
//     .text("Middle");
//
// svg.append("text")
//     .attr("x", newX)
//     .attr("y", 210)
//     .attr("fill","none")
//     .attr("stroke","blue")
//     .attr("font-size", "30")
//     .attr("dominant-baseline", "middle") //verticle alignment
//     .text("End");


// OR...

var textArray = ["Start", "Middle", "End"];

svg.append("text").selectAll("tspan")
    .data(textArray)
    .enter().append("tspan")
    .attr("x", newX)  //Bottom-left by default, but can configure with text-anchor and dominant-baseline
    .attr("y", function(d,i){return 150+(30*i);})
    .attr("fill","none")
    .attr("stroke","blue")
    .attr("stroke-width","2")
    .attr("font-size", "30")
    .attr("text-anchor", "start")  //change where the "x" is relative to the text
    .attr("dominant-baseline", "middle") //change where the "y" is relative to the text
    .text(function(d){return d;});



//////////////////////////
//  PATH (POLYLINE/POLYGON not as useful as PATH
//////////////////////////

//Path data = "Mx,y  Lx,y Lx,y, Lx,y z"  //M = move to, z = closes path w/ line to beginning

//Other letters may apply, such as C instead of L, which means curve to.

//See https://www.w3.org/TR/SVG/paths.html for more options

//Uppercase = absolute positioning
//Lowercase = relative positioning

//Usually, we don't write paths directly, but use a generator:  line generators, area generators, etc...

// see interpolate.js