import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as d3 from "d3";


class D3ForcedTree extends Component{
    constructor(props){
      super(props)
      this.createForcedTree = this.createForcedTree.bind(this);
    }

   componentDidMount() {
      if (this.props.data.tree !== undefined){
        const mountNode = ReactDOM.findDOMNode(this);
        this.createForcedTree(mountNode, this.props.data)
      }

   }

   componentDidUpdate() {
    if (this.props.data.tree !== undefined){
        const mountNode = ReactDOM.findDOMNode(this);
        this.createForcedTree(mountNode, this.props.data)
      }
   }

   createForcedTree(svgDomNode, data) {

    let width = window.innerWidth;
    let height = window.innerHeight;
    let margin = 20;
    let pad = margin / 2;
    let root;
    let treeData = [];
    let highlighted = [];

    // Add tooltip div
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);

    var color = d3.scale.category20b();
    
    var force = d3.layout.force()
      .gravity(0.2)
      .charge(-220)
      .size([width, height])
      .linkStrength(0.9)
      .linkDistance(function (d) {
        return d.source.type === 'tree' && d.target.type === 'tree' ? 1 : 10;
      })
      .on("tick", tick);
        
    var outer = d3.select(svgDomNode)
        .call(d3.behavior.zoom().on("zoom", rescale))
        .on("dblclick.zoom", null)
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events", "all");
    
    var svg = outer.append('svg:g');

    var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

    init();

    // generate a tree data from API, return a tree
    function init(){
        
        data.tree.forEach((node) => {
            let indexSlash = node.path.lastIndexOf('/');
            if (indexSlash < 0){
                node.parent = 'root';
                node.filename = node.path;
                node.name = node.path;
            }else{
                node.parent = node.path.substr(0, indexSlash);
                node.filename = node.path.substr(indexSlash + 1);
                node.name = node.path;
            }
        });
        
        data.tree.unshift({
            'path' : 'root',
            'type' : 'tree',
            'size' : 0,
            'parent' : null,
            'filename' : 'root',
            'name': 'root'
        });

        let dataMap = data.tree.reduce(function (map, node) {
            map[node.path] = node;
            return map;
        }, {});
        

        data.tree.forEach(function (node) {
        // add to parent
            var parent = dataMap[node.parent];
            if (parent) {
                // if (exclude && exclude.indexOf(parent.path) > -1){
                //     (parent._children || (parent._children = [])).push(node);}
                // // create child array if it doesn't exist
                // else
                (parent.children || (parent.children = [])).push(node);
            } else {
                // parent is null or missing
                treeData.push(node);
            }
        });

        root = treeData[0];
        update();
    }



    //Rescale function, called on zoom event
    function rescale() {
        let trans = d3.event.translate;
        let scale = d3.event.scale;
        svg.attr("transform",
        "translate(" + trans + ")" + " scale(" + scale + ")");
    }



    function tick() {
        link.attr("x1", function (d) {
            return d.source.x;
            })
            .attr("y1", function (d) {
            return d.source.y;
            })
            .attr("x2", function (d) {
            return d.target.x;
            })
            .attr("y2", function (d) {
            return d.target.y;
            });
        
        node.attr("cx", function (d) {
            return d.x;
            })
            .attr("cy", function (d) {
            return d.y;
            });
        }

        
    // Toggle children on click.

    function click(d) {
    //if (!d3.event.defaultPrevented) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update();
        // }
    }

    // Returns a list of all nodes under the root.
    function flatten(root) {
        var nodes = [],
        i = 0;
    
        function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        else if (node._children) node._children.forEach(recurse_exclude);
        if (!node.id) node.id = ++i;
        nodes.push(node);
        }
        
        function recurse_exclude(node) {
        if (node.children) node.children.forEach(recurse_exclude);
        else if (node._children) node._children.forEach(recurse_exclude);
        if (!node.id) node.id = ++i;
        }
    
        recurse(root);
        return nodes;
    }
    
    function update() {
        var nodes = flatten(root),
          links = d3.layout.tree().links(nodes);
      
        // Restart the force layout.
        force
          .nodes(nodes)
          .links(links)
          .start();
      
        // Update the links…
        link = link.data(links, function (d) {
          return d.target.id;
        });
      
        // Exit any old links.
        link.exit().remove();
      
        // Enter any new links.
        link.enter().insert("line", ".node")
          .attr("class", "link")
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });
      
        // Update the nodes…
        node = node.data(nodes, function (d) {
          return d.id;
        }).style("fill", function (d) {
          return d.name === "root" ? '#f00' : d.type === "tree" ? "#ccc" : color(d.filename.lastIndexOf('.') >= 0 ? d.filename.substring(d.filename.lastIndexOf('.')) : "others");
        });
      
        // Exit any old nodes.
        node.exit().remove();
      
        // Enter any new nodes.
        node.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("r", function (d) {
            return d.name === "root" ? 10 : d.type === 'tree' ? 7 : Math.log(d.size + 1) || 3;
          })
          .style("fill", function (d) {
            return d.name === "root" ? '#f00' : d.type === "tree" ? "#ccc" : color(d.filename.lastIndexOf('.') >= 0 ? d.filename.substring(d.filename.lastIndexOf('.')) : "others");
          })
          .on("click", click)
          .on('mouseover', function (d) {

            tooltip.transition()
                .text( d.filename )
                .style("left", (d3.event.pageX ) + "px")
                .style("top", (d3.event.pageY) + "px")
                .duration(300)
                .style("opacity", 1)


            var ancestors = d.path;
            
            node.append("text")
                .attr("x", 15)
                .attr("dy", ".35em")
                .text(function(d) { return d.name; });

            link.style('stroke-width', function (l) {
              if (ancestors && d.name == l.target.name || ancestors.indexOf(l.target.name + '/') >= 0)
                return 4;
              else
                return 2;
            });
            link.style('stroke', function (l) {
              if (ancestors && d.name == l.target.name ||  ancestors.indexOf(l.target.name + '/') >= 0)
                return "#ff8080";
              else
                return '#9ecae1';
            });
            node.style('stroke', function (n) {
              if (ancestors && ancestors.indexOf(n.name) >= 0 || n.name == "root")
                return "#ff8080";
              else
                return '#3182bd';
            });
            link.each(function(l){
              if (ancestors && d.name == l.target.name ||  ancestors.indexOf(l.target.name + '/') >= 0) {
                this.parentNode.appendChild(this);
                highlighted.push(this);
              }
            });
            node.each(function(n){
              if (ancestors && ancestors.indexOf(n.name) >= 0 || n.name == "root")
                this.parentNode.appendChild(this);
            });
          })
          .on('mouseout', function () {

            tooltip.transition()
                .duration(300)
                .style("opacity", 1e-6);

            while (highlighted.length > 0) {
              var l = highlighted.pop();
              var firstChild = l.parentNode.firstChild; 
              if (firstChild) { 
                  l.parentNode.insertBefore(l, firstChild); 
              } 
            }
            link.style('stroke-width', 2);
            link.style('stroke', '#9ecae1');
            node.style('stroke', '#3182bd');
          });
      
        //Update legend
        var legend = outer.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
            return "translate(-10," + (i * 20 + 10) + ")";
          });
      
        legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);
      
        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function (d) {
            return d;
          });
      
        var styleTooltip = function (name) {
          return "<p class='filename'>" + name + "</p>";
        };
      
      
        // svg.selectAll("circle.node")
        //   .each(function (v) {
        //     $(this).tipsy({
        //       gravity: "w",
        //       opacity: 1,
        //       html: true,
        //       title: function () {
        //         var d = this.__data__;
        //         return styleTooltip(d.filename);
        //       }
        //     });
        //   });
      }

        
    }


   render() {
      return (
            <svg></svg>
		  )
    }
}

export default D3ForcedTree;