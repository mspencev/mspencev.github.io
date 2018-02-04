

function runAdvancmentTableCode(){
   
    //Create the 3-d data array.
    var advancementTableData = []; //3D array:  month x group(ex: deacon/beehive) x names in group
    for(var i=0; i < 24; ++i){
        advancementTableData[i] = []; //24 months per group
        for(var j =0; j < 3; ++j){    //4 instead of 3 so we'll have a column header for the row header
            advancementTableData[i][j] = [];
            if(j === 0){
                advancementTableData[i][j][0] = i;
            }
        }
    }
       
    populateAdvancementTable();

    createAdvancementTable();

    createAnchorLink();

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
    function populateAdvancementTable() {
        
            var rawData = getDataByAge(12, 18, rawDataObjects)
            rawData.map(function(entry){
                
                var column = getColumnIndex(entry.bDay);     
                var monthInProgram = getMonthInProgram(entry.bDay);      

                advancementTableData[monthInProgram][column].push(entry); 
                
            });
    
    };
    
     /**
     * returns column index for age (0, 1, 2).  
     *         Or, -1 if youth is too young, and 3 if too old.
     */
    function getColumnIndex(bDay){
        var age = getAge(bDay);

        if(age >= 12 && age <= 13){
            return 0;
        }
        else if(age >= 14 && age <= 15){
            return 1;
        }
        else if(age >= 16 && age <= 18){
            return 2;
        }

        if(age < 12){
            return -1;
        }
        if(age > 18){
            return 3;
        }
        
    };

    
    /**
     * Just like birthday table, but the values for the firt row header column 
     * are already in the data table, and there are 24 rows.
     */
    function createAdvancementTable(){

        var columns = ['Months \nin class', 'Beehives/\nDeacons', 'Mia Maids/\nTeachers', 'Laurels/\nPriests'];

        var tableContainer = d3.select('#table-container');

        //Title
        tableContainer.append('div')
            .text('YM/YW Advancement')
            .attr('class', 'table-title')
            .attr('id', 'advancementTable')
            .append('a')
                .attr('class', 'anchor')
                .attr('href', '#date')
                .style('padding-left', '20px')
                .text('(top)');

        var table = tableContainer.append('table')
                        .attr('class', 'youth-table')//'table table-striped table-bordered table-condensed')
                        .attr('id','advancementTable');
        var thead = table.append('thead')
        var	tbody = table.append('tbody');

        // append the header row
        var hrow = thead.append('tr'); //to support the row header, we want: <thead> <tr> <th></th> <th>...</th> <th>...</th>...
        hrow.selectAll('th')
            .data(columns).enter()
            .append('th').append('pre')
                .text(function (column) { return column; });

        // create the table
        //Thanks to:  http://jsfiddle.net/f4vAm/1/ for getting me started
        tbody.selectAll("tr")                 
            .data(advancementTableData)
            .enter()  //for each row of data (one for each month)...
                .append("tr")  //add a row header
                    .attr('class', 'row-header')
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
                                if(!d.gender){
                                    return '';
                                }
                                return d.gender + '-class' + ' name';
                            })             
                            .text( function(d,i,j) {
                                if(!d.name) {
                                    return '';
                                }
                                return d.name + ' ('+d.age+')'; } )
                            .style("cursor", "default")
                            .on("mouseover", function(d) {		
                                // toolTipDiv.transition()		
                                //     .duration(10)		
                                toolTipDiv.style("opacity", 1.0)
                                toolTipDiv.html(function(){
                                    if(!d.bDay){
                                        return '';
                                    }
                                    var date = d.bDay;
                                    return 'Age: ' + d.age + '<br>B-day: ' + 
                                            // tableConfig.rows[date.getMonth()] + '  ' + date.getDate() +
                                            '<br>Grade (calc): ' + d.grade;
                                })
                                    .style("left", (d3.event.pageX + 10) + "px")		
                                    .style("top", (d3.event.pageY - 20) + "px");	
                                })					
                            .on("mouseout", function(d) {		
                                // toolTipDiv.transition()		
                                //     .duration(10)		
                                toolTipDiv.style("opacity", 0)
                                    // .style("cursor", "default"); 		

                            });

            //Now add the row header values
            d3.selectAll('#advancementTable .row-header')
                .each(function(d, i){
                    d3.select(this) // Transform to d3 Object
                    .insert('td', ":first-child")
                        .text(function(d){
                            return i;
                        });
                });

    }
    

function createAnchorLink(){
    d3.select('#anchors')
            .append("a")  //add a row header
                .attr('href', '#advancementTable')
                .attr('class', 'anchor')
                .style('display',' block')
                .text(function(d){
                    return 'YM/YW Advancement';
                })
}



    /**
     * returns column index for age (0, 1, 2).  
     *         Or, -1 if youth is too young, and 3 if too old.
     */
    function getAgeColumnIndex(bDay){
        var age = getAge(bDay);

        if(age >= 12 && age <= 13){
            return 0;
        }
        else if(age >= 14 && age <= 15){
            return 1;
        }
        else if(age >= 16 && age <= 18){
            return 2;
        }

        if(age < 12){
            return -1;
        }
        if(age > 18){
            return 3;
        }
        
    };

    /**
     * Returns a number between 0 and 23, identifying 
     * an index into the rows that represent the number of 
     * months a person has been in an organization (each 
     * organization has a 2-year age span)
     */
    function getMonthInProgram(bDay){
        var yearInProg = getAge(bDay) % 2;
        var bdayMonths = bDay.getMonth();
        var bdayDate = bDay.getDate();

        var nowMonths = now.getMonth();
        var nowDate = now.getDate();
        
        var delta; //number months between now and birthday
        if(bdayMonths > nowMonths){
            var delta = (11 - bdayMonths)  + nowMonths;
            if(nowDate >= bdayDate){
                delta = delta + 1;
            }
        }
        else if(bdayMonths < nowMonths){
            var delta = nowMonths - bdayMonths;
            if(nowDate < bdayDate){
                delta = delta - 1;
            }
        }
        else{
            if(bdayDate > nowDate){
                delta = 11;
            }
            else{
                delta = 0;
            }
        }

        if(yearInProg === 1){
            delta = delta + 12;
        }
        return delta;
    }
}
