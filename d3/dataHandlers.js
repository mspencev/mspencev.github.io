var parseDate = d3.timeParse("%m/%d/%Y");




// Under the covers of all these convenience methods
// d3.request(url)
//     .row(function(d){*format row*}) //for csv/tsv only,
//     .get(callback)

////////////////////
/// READ IN CSV Data
////////////////////

d3.csv("prices.csv")
    .row(function(d){return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};}) //transform the data, each row to an object
    .get(function(error,data) {

        console.log(data);

        //Nest the data by month
        var nestedByMonth = d3.nest()
                            //Key tells D3 how we want to group the data. Most of the time you'd enter a function in
                            // here telling D3 what to do per row.
                            .key(function(d){ return d.month.getMonth();})
                            .entries(data); //entries is the array of the data we want to nest

        console.log(nestedByMonth);

        //Nest the data by month
        var nestedByYear = d3.nest()
                            .key(function(d){ return d.month.getFullYear();})
                            .entries(data);

        console.log(nestedByYear);

    });

////////////////////
/// READ IN TSV Data (Tab Separated Value)
//////////////////
//
d3.tsv("data/data.tsv")
    .row(function(d){return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};}) //transform the data, each row to an object
    .get(function(error,data) {

        // console.log(data)
    });

////////////////////
/// READ IN DSV Data (Dilimited Separated Value)
////////////////////

//Identify the delimiter for the file:
var psv = d3.dsvFormat("|"); //pipe-separated value

d3.text("data/data.txt")
    .get(function(error,data) {

        var rows = psv.parse(data);
        var newRows = [];
        for(var p = 0; p < rows.length; p++){
            newRows.push({month: parseDate(rows[p].month),
                price: Number(rows[p].price.trim().slice(1))});
        }

        // console.log(newRows);

    });

////////////////////
/// READ IN JSON Data
////////////////////

d3.json("data/treeData.json").get(function (error, data) {


    // console.log(data[0]);
    // console.log(data[0].children);
    // console.log(data[0].children[0].children[1].name);
});

////////////////////
/// READ IN XML Data
////////////////////

////////////////////
/// READ IN PLAIN TEXT Data
////////////////////

////////////////////
/// READ IN HTML Data
////////////////////
d3.html("http://enable-cors.org").get(function(error,data){   //site must have cross-origin request setting set.


    var frag = data.querySelector("div");
    console.log(frag);
});

////////////////////
/// READ IN Database
////////////////////
//use a server-side language, such as PHP to query the database, then PHP provides the javascript the data