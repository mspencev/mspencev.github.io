var w = 1050,
    h = 580;
var minZoom;
var maxZoom;

var svg = d3.select( "body" )
  .append( "svg" )
  .attr( "width", w )
  .attr( "height", h );



// Define the div for the tooltip
var toolTipDiv = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

var g = svg.append( "g" );

var projection = d3.geoEquirectangular()
  .scale( 150 )
  .rotate( [0, 0] )
  .center( [0, 0] )
  .translate( [w/2,h/2] );

var geoPath = d3.geoPath()
    .projection( projection );

let countriesGroup;

function zoomed() {
  t = d3.event.transform;
  if(countriesGroup){
    // countriesGroup.attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
  }
  
}

// Define map zoom behaviour
var zoom = d3
  .zoom()
  .on("zoom", zoomed);

let mapEl = document.getElementById("map-holder");
minZoom = Math.max(mapEl.offsetWidth / w, mapEl.offsetHeight / h);
maxZoom = 100 * minZoom;

// define X and Y offset for centre of map to be shown in centre of holder
midX = (mapEl.offsetWidth - minZoom * w) / 2;
midY = (mapEl.offsetHeight - minZoom * h) / 2;
// change zoom transform to min zoom and centre offsets
svg.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));


function getTextBox(selection) {
  selection
    .each(function(d) {
      d.bbox = this
        .getBBox();
      })
  ;
}

var geoJson;
var familyJson;

// get map data
d3.json(
// //   "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json", function(json) {
    "https://mspencev.github.io/d3/map/family/custom50.json", function(json) {
    // "custom50.json", function(json) {
    geoJson = json;

    fetchFamilyTree();
});

function fetchFamilyTree() {
    d3.json("https://mspencev.github.io/d3/map/family/family.json", function(err, json) {
      if(err) console.log("error fetching data");

        familyJson = json;
        renderMap();
    });
}

function renderMap(){
  
    
    countriesGroup = g.attr("id", "map");
    // add a background rectangle
    countriesGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h);

//   countries = g.selectAll( "path" )
  countries = countriesGroup.selectAll( "path" )
    .data( geoJson.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ccc" )
    .attr( "d", geoPath )
    .attr("id", function(d, i) {
        return "country" + d.properties.iso_a3;
      })
    .attr("class", "country")
    .on("mouseover", function(d, i) {
        d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
    })
    .on("mouseout", function(d, i) {
        d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
    });

  // feature/country. This will contain the country name and a background rectangle
  // Use CSS to have class "countryLabel" initially hidden
  countryLabels = countriesGroup
    .selectAll("g")
    .data(geoJson.features)
    .enter()
    .append("g")
    .attr("class", "countryLabel")
    .attr("id", function(d) {
      return "countryLabel" + d.properties.iso_a3;
    })
    .attr("transform", function(d) {
      return (
        "translate(" + geoPath.centroid(d)[0] + "," + geoPath.centroid(d)[1] + ")"
      );
    })
    // add mouseover functionality to the label
    .on("mouseover", function(d, i) {
        d3.select(this).style("display", "block");
    })
    .on("mouseout", function(d, i) {
          d3.select(this).style("display", "none");
    })
    // add an onlcick action to zoom into clicked country
    .on("click", function(d, i) {
        d3.selectAll(".country").classed("country-on", false);
        d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
      boxZoom(geoPath.bounds(d), geoPath.centroid(d), 20);
    });
  // add the text to the label group showing country name
  countryLabels
    .append("text")
    .attr("class", "countryName")
    .style("text-anchor", "middle")
    .attr("dx", 0)
    .attr("dy", 0)
    .text(function(d) {
      return d.properties.name;
    })
    .call(getTextBox);
  // add a background rectangle the same size as the text
  countryLabels
    .insert("rect", "text")
    .attr("class", "countryLabelBg")
    .attr("transform", function(d) {
      return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
    })
    .attr("width", function(d) {
      return d.bbox.width + 4;
    })
    .attr("height", function(d) {
      return d.bbox.height;
    });
    
  renderLines();
  renderMarkers();

};

function renderMarkers() {
  // add circles to svg
  svg.selectAll("circle")
    .data(familyJson).enter()
      .append("circle")
        .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
        .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
        .attr('class', 'marker')
        .on("mouseover", function(d) {		
          toolTipDiv.style("opacity", 1.0)
          toolTipDiv.html(function(){
              return 'Name: ' + d.name + '<br>Birth: ' + 
                      d.city + ', ' + d.year;
          })
              .style("left", (d3.event.pageX + 10) + "px")		
              .style("top", (d3.event.pageY - 20) + "px");	
          })					
      .on("mouseout", function(d) {		
          toolTipDiv.style("opacity", 0)
      });   
}

function renderLines() {

  let lines = getLines();

  svg.selectAll("line")
    .data(lines).enter()
      .append("line")
        .attr("x1", function (d) { return d.x1; })
        .attr("y1", function (d) { return d.y1; })
        .attr("x2", function (d) { return d.x2; })
        .attr("y2", function (d) { return d.y2; })
        .attr("class", function (d) { return d.isDad? "line-dad" : "line-mom"});
}

function getLines() {
  let lines = [];

  familyJson.forEach(function(person){ 
    let id = person.id;
    let dad = familyJson.find(function(p) { 
      return p.id === person.dad;
    }); 
    let mom = familyJson.find(function(p) { 
      return p.id === person.mom;
    });
    let personPt = projection([person.lon, person.lat]);

    if(dad){ 
      let dadPt = projection([dad.lon, dad.lat]);
      lines.push({
        "x1": personPt[0],
        "y1": personPt[1],
        "x2": dadPt[0],
        "y2": dadPt[1],
        "isDad": true
      });
    }

    if(mom){
      let momPt = projection([mom.lon, mom.lat]);
      lines.push({
        "x1": personPt[0],
        "y1": personPt[1],
        "x2": dadPt[0],
        "y2": dadPt[1],
        "isDad": false
      });
    }

  });
  return lines;
}

// zoom to show a bounding box, with optional additional padding as percentage of box size
function boxZoom(box, centroid, paddingPerc) {

  let svgEl = document.getElementsByTagName("svg");

  minXY = box[0];
  maxXY = box[1];
  // find size of map area defined
  zoomWidth = Math.abs(minXY[0] - maxXY[0]);
  zoomHeight = Math.abs(minXY[1] - maxXY[1]);
  // find midpoint of map area defined
  zoomMidX = centroid[0];
  zoomMidY = centroid[1];
  // increase map area to include padding
  zoomWidth = zoomWidth * (1 + paddingPerc / 100);
  zoomHeight = zoomHeight * (1 + paddingPerc / 100);
  // find scale required for area to fill svg
  maxXscale = svgEl.offsetWidth / zoomWidth;
  maxYscale = svgEl.offsetHeight / zoomHeight;
  zoomScale = Math.min(maxXscale, maxYscale);
  // handle some edge cases
  // limit to max zoom (handles tiny countries)
  zoomScale = Math.min(zoomScale, maxZoom);
  // limit to min zoom (handles large countries and countries that span the date line)
  zoomScale = Math.max(zoomScale, minZoom);
  // Find screen pixel equivalent once scaled
  offsetX = zoomScale * zoomMidX;
  offsetY = zoomScale * zoomMidY;
  // Find offset to centre, making sure no gap at left or top of holder
  dleft = Math.min(0, svgEl.offsetWidth / 2 - offsetX);
  dtop = Math.min(0, svgEl.offsetHeight / 2 - offsetY);
  // Make sure no gap at bottom or right of holder
  dleft = Math.max(svgEl.offsetWidth - w * zoomScale, dleft);
  dtop = Math.max(svgEl.offsetHeight - h * zoomScale, dtop);
  // set zoom
  svg
    .transition()
    .duration(500)
    .call(
      zoom.transform,
      d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale)
    );
}
