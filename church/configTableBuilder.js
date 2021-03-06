
////////////////////////
// Establish Variables
////////////////////////
var rawDataObjects = [];
// rawDataObjects = [];

// Define the div for the tooltip
var toolTipDiv = d3.select("body").append("div")	
                    .attr("class", "tooltip")				
                    .style("opacity", 0);



var now = new Date();

var tableData = {}; //Key=table title, value = 3D array of data

updateTimestamp();

retrieveData();

function updateTimestamp(){
    var d = new Date();
    var dateEl = document.getElementById("date");
    dateEl.innerHTML = 'Last updated: ' + d.toLocaleString();
};


function retrieveData() {
    // Read the data from a CSV file
    d3.text('https://mspencev.github.io/church/tableData.csv', function(error, data){
    // d3.text('tableData.csv', function(error, data){ //for Firefox testing
        if (error) throw error;

        var rawData = d3.csvParse(data); //array of objects {LastName: ..., Other: Grayson Michael	M	0	5 Sep 2017} 
        //Example of other:  'Grayson Michael	M	0	5 Sep 2017'  (first name, middl, gender, age, b-day)

        rawDataObjects = rawData.map(function(entry){
            var lastName = entry.LastName;
            var other = entry.Other.trim().split('\t'); //["Grayson Michael", "M", "0", "5 Sep 2017"]
            var first = other[0].split(' ')[0]; //Don't need the middle name(s)
            var gender = other[1];
            var bDayStr = other[3];
            var bDay = new Date(bDayStr.trim());
            // console.log('Name: ', first, lastName);
            return {'name': first + ' ' + lastName + '.',
                     'gender': gender,
                     'bDay': bDay,
                     'age': getAge(bDay),
                     'grade': getGrade(bDay)
             }
        });

        createEmptyTableData();

        populateTableData(rawDataObjects);
        createTables(rawDataObjects);
        createAnchorLinks();
        runAdvancmentTableCode();

        // createAdvancementTable(advancementTableData, ['Months \nin class', 'Beehives/\nDeacons', 'Mia Maids/\nTeachers', 'Laurels/\nPriests'])
    });
};

function createEmptyTableData(){

    config.tables.forEach(function(tableConfig){

        var dataArray = [];
        for(var i =0; i < tableConfig.rows.length; ++i){
            dataArray[i] = []; //one array for each month
            for(var j =0; j < tableConfig.groups.length; ++j){
                dataArray[i][j] = []; //one array for each group (ex:[deacons/beehibes], [teachers/miamaids], [priests/laurels])
            }
        }
        tableData[tableConfig.title] = dataArray;
    }
)};

/**
 *  Populate the table data for each table -- a 3-D array: Month, Column, Cell Entry
 * 
 * The resulting table date might look something like this:
 *   [ 
 *     [ [ {Deacon1Info} ],[  ],[ {Priest1Info} ] ],  //for january
 *     [ [ {Deacon2Info}, {Beehive1Info} ],[ {MiaMaid1Info} ],[  ] ],  //February
 *     [ [  ],[  ],[  ] ],
 *     [ [ {Beehive21Info} ],[  ],[  ] ],  
 *     etc...
 *   ]
 */
function populateTableData(rawDataObjects) {

    //For each table config
    config.tables.forEach(function(tableConfig){

        var rawData = getRelevantData(tableConfig, rawDataObjects)
        rawData.map(function(entry){
            
            var month = entry.bDay.getMonth();
            var column = getAgeColumnIndex(entry.bDay, tableConfig);     
            // var monthInProgram = getMonthInProgram(bDay);      

            if(column < 0){
                //TODO add to incoming youth
            }
            else if(column >= tableConfig.groups.length) {
                //TODO add to recently graduated youth
            }
            else{
                tableData[tableConfig.title][month][column].push(entry);
                // advancementTableData[monthInProgram][column+1].push(name); //+1 for the column header
            }

        });
    });
};
    




/**
 *  Return an array of data, filtered by the given table config, so each 
 *  entry's age fits the table constraints.
 * 
 *  @param data - raw data
 */
function getRelevantData(tableConfig, data){

    var reduceMin = ( min, cur ) => Math.min( min, cur );
    var reduceMax = ( max, cur ) => Math.max( max, cur );

    var minAge = tableConfig.groups.map( item => item.minAge )
                            .reduce( reduceMin, Infinity );

    var maxAge = tableConfig.groups.map( item => item.maxAge )
                            .reduce( reduceMax, Infinity );

    return getDataByAge(minAge, maxAge, data);
};

function getDataByAge(minAge, maxAge, data){

    return data.filter(function(entry){

        return entry.age >= minAge && entry.age <= maxAge;
    });
};

function createTables(rawDataObjects){
    var self = this;

    config.tables.forEach(function(tableConfig, i){
        
        createTable(tableConfig, tableData[tableConfig.title], 'table'+i, i);

    });
};

function createTable(tableConfig, data, tableId, i){
    
    var tableContainer = d3.select('#table-container');

    tableContainer.append('div')
        .text(tableConfig.title)
        .attr('class', 'table-title')
        .attr('id', 'tableTitle'+ i)
        .append('a')
            .attr('class', 'anchor')
            .attr('href', '#date')
            .style('padding-left', '20px')
            .text('(top)');

    var table = tableContainer.append('table')
                    .attr('class', 'youth-table')//'table table-striped table-bordered table-condensed')
                    .attr('id',tableId);
    var thead = table.append('thead')
    var	tbody = table.append('tbody');

    // append the header row
    var hrow = thead.append('tr'); //to support the row header, we want: <thead> <tr> <td></td> <th>...</th> <th>...</th>...
    hrow.selectAll('th')
        .data(tableConfig.groups).enter()
        .append('th').append('pre')
        .text(function (group) { return group.name; });

    // Insert a header cell for the month's row header
    hrow.insert('th', ":first-child")


    // create the table
    //Thanks to:  http://jsfiddle.net/f4vAm/1/ for getting me started
    tbody.selectAll("tr")                 
        .data(data)
        .enter()  //for each row of data (one for each month)...
            .append("tr")  //add a row header
                .attr('class', function(d, i){
                    var cls = 'row-header';
                    if(i == now.getMonth()){
                        cls += ' curr-row';
                    }
                    return cls;
                })
            .selectAll("td")   
            .data( function(d,i,j) { 
                return d; } ) 
            .enter()  //for each column 
                .append("td")   //add a td
                .selectAll('div')
                .data(function(d){
                    return d;}) 
                .enter()  // for each cell value
                    .append('div')    // add a div with the value (the name)
                        .attr('class', function(d, i){
                            return d.gender + '-class' + ' name';
                        })             
                        .text( function(d,i,j) { 
                            return d.name + ' ('+d.age+')'; } )
                        .style("cursor", "default")
                        .on("mouseover", function(d) {		
                            // toolTipDiv.transition()		
                            //     .duration(10)		
                            toolTipDiv.style("opacity", 1.0)
                            toolTipDiv.html(function(){
                                var date = d.bDay;
                                return 'Age: ' + d.age + '<br>B-day: ' + 
                                        tableConfig.rows[date.getMonth()] + '  ' + date.getDate() +
                                        '<br>Grade (calc): ' + d.grade;
                            })	
                                .style("left", (d3.event.pageX + 10) + "px")		
                                .style("top", (d3.event.pageY - 20) + "px");	
                            })					
                        .on("mouseout", function(d) {		
                            toolTipDiv.style("opacity", 0)

                        });

        //Now add the row header values
        d3.selectAll('#' + tableId + ' .row-header')
            .each(function(d, i){
                d3.select(this) // Transform to d3 Object
                   .insert('td', ":first-child")
                    .text(function(d){
                        return tableConfig.rows[i];
                    });
            })
};

/**
 * returns column index for age, based on the given table config.
 */
 function getAgeColumnIndex(bDay, tableConfig){
    var age = getAge(bDay),
        colIndex = -1,
        transitionOnBDay = tableConfig.transitionOnBday;

    if(!transitionOnBDay){
        age = getAgeOnJan1st(bDay);
    }

    return tableConfig.groups.findIndex(function(group){
            return (age >= group.minAge && age <= group.maxAge);
    });        
};

/**
 * Return the age based on the given birth day Date.
 */
function getAge(bDay){
    var year = bDay.getFullYear(),
        month = bDay.getMonth(),
        date = bDay.getDate(),
        nowMonth = now.getMonth();

    var age = now.getFullYear() - year;
    if(nowMonth < month){
        age -= 1;
    }
    if(nowMonth === month){
        if(now.getDate() < date){
            age -= 1;
        }
    }
    return age;
};

function hadBirthdayThisYear(bDay){
    if(bDay.getMonth() < now.getMonth()){
        return true;
    }
    else if(bDay.getMonth() > now.getMonth()){
        return false;
    }
    else{
        if(bDay.getDate() <= now.getDate()){
            return true;
        }
        return false;
    }
};

function getAgeOnJan1st(bDay){
    var age = getAge(bDay);
    if(hadBirthdayThisYear(bDay)){
        return age - 1;
    }
    return age;
}


function getGrade(bDay){
    var age = getAge(bDay);
    var bdayMonth = bDay.getMonth();
    var cutOffMonth = config.cutOffDate.getMonth();
    var nowMonth = now.getMonth();
    var grade = age - 5;

    if(bdayMonth >= cutOffMonth){
        grade = grade - 1;
    }
    return grade;
}

function createAnchorLinks(){
    d3.select('#anchors').selectAll("a")                 
        .data(config.tables)
        .enter()  //for each table config
            .append("a")  //add a row header
                .attr('href', function(d, i){
                    return '#tableTitle' + i;
                })
                .attr('class', 'anchor')
                .style('display',' block')
                .text(function(d){
                    return d.title;
                })
}
