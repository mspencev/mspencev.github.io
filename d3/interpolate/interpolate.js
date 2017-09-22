var dataArray = [{x:5, y:5},{x:10, y:15},{x:20, y:7},{x:30, y:18},{x:40, y:10},{x:45, y:18}];
var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];


var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");


/////////////////////
//   PATH:  LINE
/////////////////////


//Path data = "Mx,y  Lx,y Lx,y, Lx,y z"  //M = move to, z = closes path w/ line to beginning

//Other letters may apply, such as C instead of L, which means curve to.

//See https://www.w3.org/TR/SVG/paths.html for more options

//Uppercase = absolute positioning
//Lowercase = relative positioning

//Usually, we don't write paths directly, but use a generator:  line generators, area generators, etc... (cord, symbol)



for( var p = 0; p < 6; p++){



    //Create a path generator (typically place at the top of the code)
    var line = d3.line() //Line is the D3 line generator that generates a PATH (not a line) -- not the SVG line element
    //Tell d3 how to compute each x and y
        .x(function(d,i){return d.x*6;})
        .y(function(d,i){return d.y*4;})
        // .curve(d3.curveStep);
        .curve(interpolateTypes[p]); //many options.  See https://github.com/d3/d3/blob/master/API.md and serach for "curve"

                                                   //see also http://bl.ocks.org

    var shiftX = p*250;
    var shiftY = 0;

    //Create a group, called group
    var chartGroup = svg.append("g").attr("class", "group" + p).attr("transform","translate("+shiftX+",0)");

    chartGroup.append("path") //SVG has a path element
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("d", line(dataArray)); //d = "data".  Call the line generator.
    // .attr("d", "M30,20L60,60L120,28L180,72L240,40L270,72"); //copy generated value in DOM, and it does the same thing.


    chartGroup.selectAll("circle.grp" + p)
        .data(dataArray)
        .enter().append("circle")
            .attr("class", function(d,i){return "grp"+i;})
            .attr("cx", function(d,i){return d.x*6;})
            .attr("cy", function(d,i){return d.y*4;})
            .attr("r", "2");


}