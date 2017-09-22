/////////////////////
// D3 LAYOUTS
/////////////////////


/////////////////////
// HIERARCHICAL LAYOUT
/////////////////////

var height = 200;
var width = 500;
var margin = {left:50,right:50,top:40,bottom:0};

//Generate a tree layout
var tree = d3.tree().size([width,height]);

var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");

d3.json('treeData.json').get(function (error, data) {

    //Give the root data
    var root = d3.hierarchy(data[0]); //D3 works out tree relationships (parents/children, desendents etc...)

    tree(root);

    //Add circles
    chartGroup.selectAll("circle")
        .data(root.descendants())
        .enter().append("circle")
        .attr("cx",function(d){return d.x;})
        .attr("cy",function(d){return d.y;})
        .attr("r","5");

    //Add the paths
    chartGroup.selectAll("path")
        .data(root.descendants().slice(1)) //we always need one less line than dots.  D3 layout says that every dot
        //has a corresponding line, apart form the root.   So, we're safe to get rid of the root.
        .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d){return "M"+d.x+","+d.y+"C"+d.parent.x+","+d.parent.y;} );//move to x,y and draw a line to the parent


    // console.log(root);
})