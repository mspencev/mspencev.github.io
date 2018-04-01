

d3.selectAll('.expanding1')
.on('click', function(d){
    
    if(d3.select('.hideable1').classed('hidden')){
        d3.select('.hideable1').classed('hidden', false);
        d3.select('.hideable1').classed('nothidden', true);
    }
    else{
        d3.select('.hideable1').classed('hidden', true);
        d3.select('.hideable1').classed('nothidden', false);
    }
});

d3.selectAll('.expanding2')
.on('click', function(d){
    
    if(d3.select('.hideable2').classed('hidden')){
        d3.select('.hideable2').classed('hidden', false);
        d3.select('.hideable2').classed('nothidden', true);
    }
    else{
        d3.select('.hideable2').classed('hidden', true);
        d3.select('.hideable2').classed('nothidden', false);
    }
});


d3.selectAll('.expanding3')
.on('click', function(d){
    
    if(d3.select('.hideable3').classed('hidden')){
        d3.select('.hideable3').classed('hidden', false);
        d3.select('.hideable3').classed('nothidden', true);
    }
    else{
        d3.select('.hideable3').classed('hidden', true);
        d3.select('.hideable3').classed('nothidden', false);
    }
});

d3.selectAll('.expanding')
    .on('click', function(d){
        
        if(d3.select('.hideable').classed('hidden')){
            d3.select('.hideable').classed('hidden', false);
            d3.select('.hideable').classed('nothidden', true);

        }
        else{
            d3.select('.hideable').classed('hidden', true);
            d3.select('.hideable').classed('nothidden', false);
        }

        // if(d3.select('.hideable').classed('hidden')){
        //     d3.select('.hideable').classed('hidden', false);
        //     d3.select('.hideable').classed('nothidden', true);

        // }
        // else{
        //     d3.select('.hideable').classed('hidden', true);
        //     d3.select('.hideable').classed('nothidden', false);
        // }


        // d3.select('.mark')
        //     .transition()
        //     .duration(750)
        //     .attr('height', 0)
        //     .remove();

        // d3.selectAll('.mark')
        // .transition()
        // .duration(500)
        // .easeLinear()
        // // if playing is true, these should animate 
        // // if playing is false, these should not animate
        // .attr("height", function(d) { return d.height; })

        // d3.select('.hiding')
        //     // .style('height', 40)          // position the circle at 40 on the x axis
        //     .transition()             // apply a transition
        //     .ease(d3.easeLinear)           // control the speed of the transition
        //     .duration(1000)           // apply it over 2000 milliseconds
        //     .style('height', '0%')          // move the circle to 920 on the x axis
            // .transition()             // apply a transition
            // .ease(d3.easeLinear)           // control the speed of the transition
            // .duration(1000)           // apply it over 2000 milliseconds
            // .style('height', '0%');          // return the circle to 40 on the x axis
        // .on("end", repeat);  

    // d3.timer.flush();

        //This JQUery way works
        // $('.expanding').delay(950).slideUp(100);
        // if($('.mark').is(":visible")){
        //     $('.mark').hide('slide', {direction:'up'},200);
        // }
        // else{
        //     $('.mark').show('slide', {direction:'up'},200);

        // }
    });


d3.select('#ib-learning-btn')
    .on('click', function(){

        d3.select('#test-btn').transition()
    .style("color", "red"); 
        // var t = d3.transition()
        //     .duration(750)
        //     .ease(d3.easeLinear);

        // d3.selectAll(".apple").transition(t)
        // $('#filter-cmds').delay(150).slideUp(100);
        // $('#filter-side-body').hide('slide', {direction:'left'},200);
    });