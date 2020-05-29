import React, {useState, useEffect} from "react";
import styled from "styled-components";
import * as d3 from "d3";

import {Graph} from "./Graph";
//  17:00 -20:00  2020/07/11 (火) 2h5m

interface IGraphProps {
  flightNumber: string;
  startTime: number;
  endTime: number;
  time: string;
  date: string;
  flightTime: string;
  price: number;
}
interface IGraphPropsList {
  data: IGraphProps[];
}

export const Plot = () => {
  const [currentHoverData, setCurrentHoverData] = useState<IGraphProps>({
    flightNumber: "",
    startTime: 0,
    endTime: 0,
    time: "",
    date: "",
    flightTime: "",
    price: 0,
  });
  const [pos, setPos] = useState({x: "", y: ""});

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

  const Tooltip = styled.div<{isShow?: boolean; pos: {x: string; y: string}}>`
    padding: 16px;
    position: absolute;
    transition: opacity 0.5s ease;
    opacity: 0;
    border-radius: 4px;
    box-shadow: 0px 2px 16px 0 rgba(43, 47, 55, 0.16);
    background-color: white;
    visibility: ${(props) => (props.isShow ? "visible" : "hidden")};
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    top: ${(props) => props.pos.y};
    left: ${(props) => props.pos.x};
  `;

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
      .data(Data)
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
        console.log(d3.event.pageY);
        // tooltip
        //   .style("transition", "opacity 0.5s ease")
        //   .style("visibility", "visible")
        //   .style("position", "absolute")
        //   .style("opacity", "1")
        //   .style("top", d3.event.pageY - 20 + "px")
        //   .style("left", d3.event.pageX + 10 + "px")
        //   .html("name : " + d.startTime + "<br>value : " + d.price);
        console.log(d);
        setCurrentHoverData(d);
        setPos({x: `${d3.event.pageX + 10}px`, y: `${d3.event.pageY - 20}px`});
      })
      .on("mouseout", function (d) {
        tooltip.style("visibility", "hidden").style("opacity", "0");
        d3.select(this).style("fill", "#606b67");
        setPos({x: "", y: ""});
      })
      .on("click", function (d) {
        alert(`clicked  x: ${d.startTime} y: ${d.price}`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        // tooltip
        //   .style("transition", "opacity 0.5s ease")
        //   .style("visibility", "visible")
        //   .style("position", "absolute")
        //   .style("opacity", "1")
        //   .style("top", d3.event.pageY - 20 + "px")
        //   .style("left", d3.event.pageX + 10 + "px")
        //   .html("name : " + d.startTime + "<br>value : " + d.price);
        console.log(d);
        setCurrentHoverData(d);
        setPos({x: `${d3.event.pageX + 10}px`, y: `${d3.event.pageY - 20}px`});
      })
      .on("mouseout", function (d) {
        console.log(d);
        tooltip.style("visibility", "hidden").style("opacity", "0");
        d3.select(this).style("fill", "#606b67");
        setPos({x: "", y: ""});
      })
      .on("click", function (d) {
        console.log(d);
        alert(`clicked  x: ${d.startTime} y: ${d.price}`);
      });
  };
  console.log(pos);
  return (
    <div>
      <Tooltip id="tooltip" className="tooltip" isShow={pos.x !== ""} pos={pos}>
        <div>¥{currentHoverData.price}</div>
        <div>
          <span>{currentHoverData.flightNumber}</span>
          <span>{currentHoverData.time}</span>
          <span>{currentHoverData.date}</span>
          <span>{currentHoverData.flightTime}</span>
        </div>
        <div>
          <span>{currentHoverData.flightNumber}</span>
          <span>{currentHoverData.time}</span>
          <span>{currentHoverData.date}</span>
          <span>{currentHoverData.flightTime}</span>
        </div>
      </Tooltip>
      <button onClick={addReservation}>追加</button>
      <svg height={500} width={1000}>
        <g className="graph"></g>
      </svg>
    </div>
  );
};
