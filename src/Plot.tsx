import React, {useState} from "react";
import styled from "styled-components";
import * as d3 from "d3";

import {Graph} from "./Graph";
//  17:00 -20:00  2020/07/11 (火) 2h5m

export const Plot = () => {
  const Data = [
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 17,
      endTime: 20,
      time: "17:00 - 20:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: 107229,
    },
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 20,
      endTime: 24,
      time: "20:00 - 24:00",
      date: "2020/07/11 (火)",
      flightTime: "4h",
      price: 200000,
    },
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 14,
      endTime: 17,
      time: "14:00 - 17:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: 100000,
    },
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 17,
      endTime: 20,
      time: "17:00 - 20:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: 160000,
    },
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 17,
      endTime: 20,
      time: "17:00 -20:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: 180000,
    },
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 17,
      endTime: 20,
      time: "17:00 -20:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: 220000,
    },
  ];

  const [reservation, setReservation] = useState<any>(Data);
  const Tooltip = styled.div`
    padding: 16px;
    transition: opacity 0.4s ease;
    opacity: 0;
    border-radius: 4px;
    box-shadow: 0px 2px 16px 0 rgba(43, 47, 55, 0.16);
    background-color: white;
  `;

  const addReservation = () => {
    const startTimeRand = Math.ceil(Math.random() * 17);
    const priceRand = Math.ceil(Math.random() * 210000);
    const newReservation = {
      flightNumber: "TYO-HNL NH505",
      startTime: startTimeRand,
      endTime: 20,
      time: "17:00 -20:00",
      date: "2020/07/11 (火)",
      flightTime: "2h5m",
      price: priceRand,
    };
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const x = d3.scaleLinear().domain([0, 28]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 250000]).range([height, 0]);
    // setReservation([...Data, newReservation]);
    const tooltip = d3.select("#tooltip");
    const g = d3.select(".graph").select(".circles");
    const dots = g.selectAll("dot").data([newReservation]).enter();
    dots
      .append("circle")
      .attr("r", 6)
      .attr("class", "dot")
      .attr("cx", function (d) {
        return x(d.startTime);
      })
      .attr("cy", function (d) {
        return y(d.price);
      })
      .style("fill", "#606b67")
      .style("cursor", "pointer")
      .style("opacity", 1)
      .on("mouseover", function (d) {
        console.log(d);
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
        console.log(d);
        tooltip.style("visibility", "hidden").style("opacity", "0");
        d3.select(this).style("fill", "#606b67");
      })
      .on("click", function (d) {
        console.log(d);
        alert(`clicked  x: ${d.startTime} y: ${d.price}`);
      });
  };
  return (
    <div>
      <Tooltip id="tooltip" className="tooltip"></Tooltip>
      <button onClick={addReservation}>追加</button>
      <svg height={500} width={1000}>
        <Graph data={reservation}></Graph>
      </svg>
    </div>
  );
};
