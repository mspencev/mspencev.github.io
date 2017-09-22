var data = [];

data[0] = [];
data[1] = [];
data[2] = [];
data[3] = [];

data[0][0] = [1,2,3];
data[0][1] = [4,5,6];
data[1][0] = [7,8];
data[1][1] = [9,10,11,12];
data[1][2] = [13,14,15];
data[2][0] = [16];
data[3][0] = [17,18];

//console.log(data);

var width = 1000;
var height = 240;
var barWidth = 100;
var barGap = 10;




var margin = {left:50,right:50,top:0,bottom:0};

var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

var firstGroups = chartGroup.selectAll("g")
	.data(data)
	.enter().append("g")
		.attr("class",function(d,i){ return "firstLevelGroup"+i; })
		.attr("transform",function(d,i){ return "translate("+(i*(barWidth+barGap))+",0)" ; })

//console.log(firstGroups);

var secondGroups = firstGroups.selectAll("g")
	//!! We're binding lower level data to lower-level elements!
	// notice we're binding data that we get from the parent elements (fristGroup--which has 4 "g"s)
	.data(function(d){ return d;})  //This returns 4 times because there are 4 "g"s in firstGropus
	.enter().append("g")
	//Think of the above as the "input" data -- each is an array of arrays.
		//--------------------------------------------------------------------------------
		//Think of below this line as dealing with the "ouptut" data. Data D3 has drilled into for us (drilled into the array)
		//  the data is just an array (not an array of arrays)

    	//this returns 7 times, 2 for first group, 3 for 2nd, then 1 and 1 for 3rd and 4th
		//"it drills down for us, automatically" from the parent's data, which is an array
		.attr("class",function(d,i,j){ return "secondLevelGroup"+i; })
		.attr("transform",function(d,i,j){ return "translate(0,"+(height-((i+1)*50))+")"; });

//console.log(secondGroups);

//Add one rectangle per second-level group:
secondGroups.append("rect")    //Run 7 times because -- appends one rect for each item in the group (there are 7)
	.attr("x",function(d,i){ return 0;})
	.attr("y","0")
	.attr("width",100)
	.attr("height",50)
	.attr("class","secondLevelRect");

//Add the circles
secondGroups.selectAll("circle")   //"input"
	//!! Again, we're binding to data from the parent (second-group), which has 7 elements
	.data(function(d){ return d; })  //d will be returned 7 times each an array of several numers -- it's passed "down the chain" from the d above
	.enter().append("circle")
	//We're filtering the circles, not the data
	.filter(function(d){return d > 10;}) //only add circles for values > 10 ; d here is just a number
		.attr("cx",function(d,i){ console.log(d);return ((i*21)+10); })  //"outpu"
		.attr("cy","25")
		.attr("r","10")


secondGroups.selectAll("text")
	.data(function(d){ return d; })
	.enter()
.append("text")
	.attr("x",function(d,i){ return ((i*21)+10); })
	.attr("y","25")
	.attr("class","txt")
	.attr("text-anchor","middle")
	.attr("dominant-baseline","middle")
	.text(function(d,i,nodes){console.log(nodes);return d;}); //nodes = new in D3 v4, it's node list of the parent.
