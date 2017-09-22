var dataArray = [25,26,27,29,32,37,45,55,70,90,120,135,150,160,168,172,177,180];

var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013',
    '2014','2015','2016'];

///////////////////
//  PATH:  AREA  (chart)
///////////////////

var height = 200;
var width = 500;


var area = d3.area()
                .x(function(d,i){return i*20;})
                .y0(height) //Lower line (for example, the base line if this is a grph)
                .y1(function(d){return height - d;})   //Upper line

var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

svg.append("path")//SVG has a path element
    .attr("d", area(dataArray));
