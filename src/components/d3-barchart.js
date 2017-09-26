import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as d3 from "d3";


class D3Barchart extends Component{
    constructor(props){
      super(props)
      this.createBarchart = this.createBarchart.bind(this);
    }

   componentDidMount() {
      if (this.props.data.length !== 0){
        const mountNode = ReactDOM.findDOMNode(this);
        this.createBarchart(mountNode)
      }

   }

   componentDidUpdate() {
    if (this.props.data.length !== 0){
        const mountNode = ReactDOM.findDOMNode(this);
        this.createBarchart(mountNode)
      }
   }

   createBarchart(svgDomNode) {
        d3.select(svgDomNode).selectAll("*").remove();

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
        
        var y = d3.scale.linear().range([height, 0]);
            
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%m-%d"));
    
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);
        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select(svgDomNode)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

        // get the data

        const data = this.props.data;

        data.forEach(function(d) {
            if (typeof d.w !== "object"){
                d.w = new Date(d.w * 1000);
            }
        });

        console.log(data)
        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.w; }));
        // y.domain([0, d3.max(data, function(d) { return d.c; })]);
        y.domain([0, 10]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
        .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.w); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.c); })
            .attr("height", function(d) { return height - y(d.c); });

        // add the x Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );
        // add the y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Commits");
      
   }

   render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3Barchart;