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
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
            
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
        // format the data
        let formatDay = d3.timeFormat("%m/%d");
        data.forEach(function(d) {
            d.w = new Date(d.w * 1000);
            d.w = formatDay(d.w);
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.w; }));
        // y.domain([0, d3.max(data, function(d) { return d.c; })]);
        y.domain([0, 10]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.w); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.c); })
        .attr("height", function(d) { return height - y(d.c); });

        // add the x Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
        

      
   }

   render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3Barchart;