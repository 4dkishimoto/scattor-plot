import React, {useEffect} from "react";
import * as d3 from "d3";

interface IGraphProps {
  data: {
    flightNumber: string;
    startTime: number;
    endTime: number;
    time: string;
    date: string;
    flightTime: string;
    price: number;
  }[];
}
export const Graph = (props: IGraphProps) => {
  useEffect(() => {
    const tooltip = d3.select("#tooltip");
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const g = d3.select(".graph");

    g.attr("transform", "translate(" + 60 + "," + 60 + ")");

    // Add X axis
    const x = d3.scaleLinear().domain([0, 28]).range([0, width]);
    const ax = d3
      .axisBottom(x)
      .scale(x)
      .ticks(12)
      .tickFormat((d: any) => {
        console.log(d);
        if (d === 28) {
          return "";
        }
        return d;
      });
    // g.append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(ax);
    // g.append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 250000]).range([height, 0]);
    // const ytick = y.ticks(3);
    const ay = d3
      .axisLeft(y)
      .scale(y)
      .ticks(4)
      .tickFormat((d: any) => {
        console.log(d);
        if (d === 250000) {
          return "";
        }
        return d;
      });
    // g.append("g").call(ay);
    // const a = d3.axisLeft(y);
    // g.append("g").call(d3.axisLeft(y));

    g.insert("g", "#scatterplot")
      .attr("class", "grid grid-x")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke-dasharray", "5 5")
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickSize(-height)
          .tickFormat((d: any) => {
            console.log(d);
            if (d === 0) {
              return "";
            }
            return d;
          })
      );

    g.insert("g", "#scatterplot")
      .attr("class", "grid grid-y")
      .style("stroke-dasharray", "5 5")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat((d: any) => {
            console.log(d);
            if (d === 0) {
              return "";
            }
            return d;
          })
      );

    g.selectAll(".grid").selectAll("line").attr("stroke", "lightgray");

    // Add dots`
    const dots = g
      .append("g")
      .attr("class", "circles")
      .selectAll("dot")
      .data(props.data)
      .enter()
      .append("circle")

      .attr("r", 6)
      .attr("cx", function (d) {
        return x(d.startTime);
      })
      .attr("cy", function (d) {
        return y(d.price);
      })
      .style("fill", "#606b67")
      .style("cursor", "pointer")
      .style("opacity", 0);

    dots
      .transition()
      .duration(500)
      .delay(function (d, i) {
        return i * (500 / 4);
      })
      .style("opacity", 1);

    dots
      .on("mouseover", function (d) {
        d3.select(this).style("fill", "#13a674");
        tooltip
          .style("transition", "opacity 0.5s ease")
          .style("visibility", "visible")
          .style("position", "absolute")
          .style("opacity", "1")
          .style("top", d3.event.pageY - 20 + "px")
          .style("left", d3.event.pageX + 10 + "px")
          .html("name : " + d.startTime + "<br>value : " + d.price);
        console.log(d);
      })
      .on("mouseout", function (d) {
        tooltip.style("visibility", "hidden").style("opacity", "0");
        d3.select(this).style("fill", "#606b67");
      })
      .on("click", function (d) {
        alert(`clicked  x: ${d.startTime} y: ${d.price}`);
      });

    // g.selectAll("circle");
  });
  return <g className="graph"></g>;
};
