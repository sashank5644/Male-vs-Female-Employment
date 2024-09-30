var female_data;
var male_data;
var svg;
var innerWidth;
var innerHeight;
var margin;

document.addEventListener('DOMContentLoaded', function () {
   
    svg = d3.select('#llpChart');
    const width = +svg.style('width').replace('px', '')
    const height = +svg.style('height').replace('px','')

    margin = { top:60, bottom:60, right:60, left: 60 };
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
   
   Promise.all([d3.csv('data/females_data.csv'),d3.csv('data/males_data.csv')]).then(function (values) {
            console.log('Loaded the females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];

      
            female_data.forEach(d => {
                d.Argentina = +d['Argentina'];
                d.us = +d['United States'];
                d.Brazil = +d['Brazil'];
                d.Canada = +d['Canada'];
                d.nz = +d['New Zealand'];

                d.year = new Date(+d['Year'],0);
            })
            console.log('female data: ')
            console.log(female_data)

            male_data.forEach(d => {
                d.Argentina = +d['Argentina'];
                d.us = +d['United States'];
                d.Brazil = +d['Brazil'];
                d.Canada = +d['Canada'];
                d.nz = +d['New Zealand'];

                d.year = new Date(+d['Year'],0);
            })
            console.log('male data: ')
            console.log(male_data)
            
            drawLolliPopChart('Argentina');
    });
     console.log('Works')
});


function drawLolliPopChart(selectedCountry) {
    console.log('trace:drawLolliPopChart()');
    svg.selectAll('*').remove();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const xScale = d3.scaleTime()
        .domain([new Date(1990, 0, 1), new Date(2023, 0, 1)])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max([...female_data, ...male_data], d => Math.max(d[selectedCountry]))])
        .range([innerHeight, 0]);
    
    
    g.selectAll('.female_circle')
        .data(female_data)
        .enter()
        .append('circle')
        .attr('cy', d => yScale(d[selectedCountry]))
        .attr('cx', d => xScale(d.year) - 5)
        .attr('r', 5)
        .style('fill', 'pink')

    g.selectAll('.female_line')
        .data(female_data)
        .enter()
        .append('line')
        .attr('x1', d => xScale(d.year) - 5)
        .attr('y1', d => yScale(d[selectedCountry]))
        .attr('x2', d => xScale(d.year) - 5)
        .attr('y2', innerHeight)
        .style('stroke', 'gray')
        .style('stroke-width', 1);

    g.selectAll('.male_circle')
        .data(male_data)
        .enter()
        .append('circle')
        .attr('cy', d => yScale(d[selectedCountry]))
        .attr('cx', d => xScale(d.year) + 5)
        .attr('r', 5)
        .style('fill', 'blue')

    g.selectAll('.male_line')
        .data(male_data)
        .enter()
        .append('line')
        .attr('x1', d => xScale(d.year) + 5)
        .attr('y1', d => yScale(d[selectedCountry]))
        .attr('x2', d => xScale(d.year) + 5)
        .attr('y2', innerHeight)
        .style('stroke', 'gray')
        .style('stroke-width', 1);

    svg.append('g')
        .append("rect")
        .attr('x', innerWidth - 140)
        .attr('y', 20)
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", 'pink')
    
    svg.append('g')
        .append("rect")
        .attr('x', innerWidth - 140)
        .attr('y', 50)
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", 'blue')

    svg.append('text')
        .attr('x', innerWidth - 115)
        .attr('y', 35)
        .text('Female Employment Rate')
    
    svg.append('text')
        .attr('x', innerWidth - 115)
        .attr('y', 65)
        .text('Male Employment Rate')

    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
    
    g.append('g').call(yAxis)

    g.append('text')
        .attr('x', innerWidth/2)
        .attr('y', innerHeight+40)
        .text('Year');
    
    g.append('text')
        .attr('x', -innerHeight/2)
        .attr('y', '-40px')
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text('Employment Rate')
    

}

