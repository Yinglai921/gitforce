import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as d3 from "d3";


class D3Areachart extends Component{
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
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the area
        var area = d3.area()
        .x(function(d) { return x(d.w); })
        .y0(height)
        .y1(function(d) { return y(d.c); });

        // define the line
        var valueline = d3.line()
        .x(function(d) { return x(d.w); })
        .y(function(d) { return y(d.c); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select(svgDomNode)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // get the data
        let data = this.props.data[1].weeks;

        let formatDay = d3.timeFormat("%m/%d");

        // var parseTime = d3.timeParse("%d-%b");
        // format the data

        data.forEach(function(d) {
          
           // d.w = parseTime(d.w);
            // d.w = new Date(d.w * 1000);
            // d.w = formatDay(d.w);
            console.log(d.w)
            
        });

        // scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.w; }));
        y.domain([0, d3.max(data, function(d) { return d.c; })]);

        // add the area
        svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

        // add the valueline path.
        svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", valueline);

        // add the X Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // add the Y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
      
   }

   render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3Areachart;