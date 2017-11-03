
/**
var main = function() {
      $('.dropdown-toggle').click(function() {
              $('.dropdown-menu').toggle();
                });
}

$(document).ready(main);
**/

svg = d3.select("body").append("svg").attr("height", "250px").attr("width", "250px")

svg.append("circle")
.attr("class", "logo")
.attr("cx", 125)
.attr("cy", 125)
.attr("r", 20)
//.style("fill", "transparent")       // this code works OK
.style("stroke", "black")     // displays small black dot
.style("stroke-width", 0.25)
.style("fill", "url(#image)")
/**
.on("mouseover", function(){ // when I use .style("fill", "red") here, it works 
    d3.select(this)
    .style("fill", "url(#image)");
})
.on("mouseout", function(){ 
    d3.select(this)
        .style("fill", "transparent");
});
// */
//
//document.getElementById("svg").onload = function() {myFunction()};









//function myFunction() {

var originX = 80;
var originY = 80;
var space = 60;
var circleData = [
   { "angle": 0, "radius": 20, "color" : "red" }, //angle = 0-360
//    { "angle": 45, "radius": 20, "color" : "orange" },
//    { "angle": 90, "radius": 20, "color" : "yellow" },
//    { "angle": 135, "radius": 20, "color" : "green" },
//    { "angle": 180, "radius": 20, "color" : "blue" },
//    { "angle": 225, "radius": 20, "color" : "purple" },
   { "angle": 270, "radius": 20, "color" : "brown" },
   { "angle": 315, "radius": 20, "color" : "black" }   ];






// var svg = d3.select("body").append("svg").attr("height", "450px").attr("width", "450px")

// svg.append("circle")
//          .attr("class", "logo")
//          .attr("cx", 25)
//          .attr("cy", 25)
//          .attr("r", 20)
//          .style("fill", "transparent")       // this code works OK
//          .style("stroke", "black")     // displays small black dot
//          .style("stroke-width", 0.25)
//          .style("fill", "url(#image)");
//         //  .on("mouseover", function(){ // when I use .style("fill", "red") here, it works 
//         //        d3.select(this)
//         //            .style("fill", "url(#image)");
//         //  })
//         //   .on("mouseout", function(){ 
//         //        d3.select(this)
//         //            .style("fill", "transparent");
//         //  });





// var svg = d3.select("body").append("svg").attr("height", "450px").attr("width", "450px")

// svg.append("circle")
// .attr("class", "logo")
// .attr("cx", 125)
// .attr("cy", 125)
// .attr("r", 20)
// //.style("fill", "transparent")       // this code works OK
// .style("stroke", "black")     // displays small black dot
// .style("stroke-width", 0.25)
// .style("fill", "url(#image)")









// var svg = d3.select("body").append("svg")
//                                      .attr("width",200)
//                                      .attr("height",200);

// var circleGroup = svg.append("g");

// //Circles added to the circleGroup
// var circles = circleGroup.selectAll("circle")
//                           .data(circleData)
//                           .enter()
//                           .append("circle");

// var circleAttributes = circles
//                        .attr("cx", function (d) { 
//                                var radians = d.angle * Math.PI / 180;
//                                return (originX + (space * Math.cos(radians))); })
//                        .attr("cy", function (d) { 
//                                var radians = d.angle * Math.PI / 180;
//                                return (originY - (space * Math.sin(radians))); })
//                        .attr("r", function (d) { return d.radius; })
//                 //        .style("fill", function (d) { return d.color; });
//                 //        .attr("fill", "url(#image)")
//                        .attr("fill", function(d, i){
//                                var url = "\"url(#image" + i + ")\"";
//                                console.log("MSVICK: url = " + url);
//                                return url;
//                         })
//                        .attr("stroke", "black");


// var circleGroup = circleGroup.attr("transform", "translate(20,0)");














// var chairOriginX = originX + ((60) * Math.sin(0));
// var chairOriginY = originY - ((60) * Math.cos(0));

// var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");
//var svg = d3.select('svg');
// var originX = 40;
// var originY = 40;
// var innerCircleRadius = 40;
// var outerCircleRadius = 60;

/*
var dataArray = [5,11,18];

var newX = 300;
svg.selectAll("circle.first") //Circle elements with class=first
    .data(dataArray)
    .enter().append("circle")
        .attr("class", "first")
        .attr("cx",function(d,i) { newX+=(d*3)+(i*20); return newX;}) //space out circles, giving room based on their size.
        .attr("cy", "100" )
        .attr("r",function(d){ return d*3;}); //If you're not using "i", you can leave it out.

*/

// var dataArray = [15];

// //var table = svg.append("circle").attr({
// var table = svg.selectAll("circle")
//     .data(dataArray)
//     .enter().append("circle")
//         .attr("cx", originX)
//         .attr("cy", originX)
//         .attr("r", innerCircleRadius)
//         .attr("fill", "red")
//         .attr("stroke", "black");

// var group = svg.append("g");

// //d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");

// var outerCircle = svg.selectAll("circle")
//     .data(dataArray)
//     .enter().append("circle")
//         .attr("cx", originX)
//         .attr("cy", originX)
//         .attr("r", outerCircleRadius)
//         .attr("fill", "none")
//         .attr("stroke", "black");


// var chairOriginX = originX + ((60) * Math.sin(0));
// var chairOriginY = originY - ((60) * Math.cos(0));

// var pointOnOuterCircle = d3.select("svg").append("circle").attr({
//         cx: chairOriginX,
//         cy: chairOriginY,
//         opacity: 0,
//         r: 5,
//         fill: "black"
// });

// var chairWidth = 20;
// var chair = svg.append("rect").attr({
//         x: chairOriginX - (chairWidth / 2),
//         y: chairOriginY - (chairWidth / 2),
//         width: chairWidth,
//         opacity: 0,
//         height: 20,
//         fill: "none",
//         stroke: "blue"
// });

// ANIMATIONS

// drawing outer circle
// outerCircle.transition().delay(500).duration(500).style("opacity", 1);

// // drawing point on outer circle
// pointOnOuterCircle.transition().delay(1000).duration(500).style("opacity", 1);

// // drawing chair on the point
// chair.transition().delay(1500).duration(500).style("opacity", 1);

// // rotating the chair
// var tween = function (d, i, a) {
// return d3.interpolateString("rotate(0, 200, 200)", "rotate(45, 200, 200)");
// }

// chair.transition().delay(2000).duration(500).attrTween("transform", tween);


// // fading out the intermediate objects
// pointOnOuterCircle.transition().delay(4000).duration(500).style("opacity", 0);
// outerCircle.transition().delay(4000).duration(500).style("opacity", 0);


//}







