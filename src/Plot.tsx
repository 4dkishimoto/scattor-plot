import React, {useState, useEffect} from "react";
import styled from "styled-components";
import * as d3 from "d3";

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
      price: 107229,
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
    {
      flightNumber: "TYO-HNL NH505",
      startTime: 20,
      endTime: 24,
      time: "20:00 - 24:00",
      date: "2020/07/11 (火)",
      flightTime: "4h",
      price: 200000,
    },
  ];

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const g = d3.select(".graph");

    g.attr("transform", "translate(" + 60 + "," + 60 + ")");

    // Add X axis
    const x = d3.scaleLinear().domain([10, 26]).range([0, width]);
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
        if (d === 0 || d === 250000) {
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
      .style("width", 10)

      .call(
        d3

          .axisBottom(x)
          .ticks(10)
          .tickSize(-height)
          .tickFormat((d: any) => {
            // console.log(d);
            if (d === 10 || d === 26) {
              return "";
            }
            return d;
          })
      );

    g.insert("g", "#scatterplot")
      .attr("class", "grid grid-y")
      .style("stroke-dasharray", "5 5")
      .style("storoke", "lightgray")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat((d: any) => {
            console.log(d);
            if (d === 0 || d === 250000) {
              return "";
            }
            return d;
          })
      );

    d3.selectAll("g .grid-x .tick line")
      .style("opacity", 0.2)
      .call((d: any) => {
        console.log(d);
        return d;
      });

    d3.selectAll("g .grid-y .tick line")
      .style("opacity", 0.2)
      .call((d: any) => {
        console.log(d);
        return d;
      });

    d3.selectAll("g .grid-x .tick text").attr("dy", 20);

    d3.selectAll("g .grid-y .tick text").attr("dx", -20);

    // d3.selectAll("g.tick line")
    //   .style("opacity", 0.2)
    //   .call((d: any) => {
    //     console.log(d);
    //     return d;
    //   });
    // g.selectAll(".grid").selectAll("line").attr("stroke", "lightgray");

    // add
    g.append("text")
      .attr("text-anchor", "end")
      .attr("x", width + 35)
      .attr("y", height + 5)
      .style("font-size", 10)
      .text("時間");

    g.append("text")
      .attr("text-anchor", "end")
      // .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", 30)
      .style("font-size", 10)
      .text("価格分布(¥)");

    // triangle
    g.append("polygon")
      .attr("points", "0,0 0,12 -8,12")
      .attr("class", "bars")
      .attr("x", 19) // 親要素からの相対位置
      .attr("y", 0) // 親要素からの相対位置
      .attr("width", 8) // 従来通り
      .attr("height", 12) // 従来通り
      .attr("fill", "#606b67");

    g.append("polygon")
      .attr(
        "points",
        `${width - 12},${height - 8} ${width},${height} ${width - 12},${height}`
      )
      // .attr("transform", "rotate(-90deg)")
      .attr("class", "bars")
      .attr("x", 19) // 親要素からの相対位置
      .attr("y", 0) // 親要素からの相対位置
      .attr("width", 8) // 従来通り
      .attr("height", 12) // 従来通り
      .attr("fill", "#606b67");

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
        setCurrentHoverData(d);
        setPos({x: `${d3.event.pageX - 5}px`, y: `${d3.event.pageY - 120}px`});
      })
      .on("mouseout", function (d) {
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
        console.log(d);
        setCurrentHoverData(d);
        setPos({x: `${d3.event.pageX - 5}px`, y: `${d3.event.pageY - 120}px`});
      })
      .on("mouseout", function (d) {
        d3.select(this).style("fill", "#606b67");
        setPos({x: "", y: ""});
      })
      .on("click", function (d) {
        console.log(d);
        alert(`clicked  x: ${d.startTime} y: ${d.price}`);
      });
  };

  const Tooltip = styled.div<{isShow?: boolean; pos: {x: string; y: string}}>`
    padding: 16px;
    position: absolute;
    transition: opacity 0.5s ease;
    /* opacity: 0; */
    border-radius: 4px;
    box-shadow: 0px 2px 16px 0 rgba(43, 47, 55, 0.16);
    background-color: white;
    visibility: ${(props) => (props.isShow ? "visible" : "hidden")};
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    top: ${(props) => props.pos.y};
    left: ${(props) => props.pos.x};
  `;

  const Title = styled.div`
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    text-align: left;
  `;

  const InnerContent = styled.div`
    font-size: 11px;
    font-weight: normal;
    color: #1d2028;
  `;

  console.log(pos);
  return (
    <div>
      <Tooltip id="tooltip" className="tooltip" isShow={pos.x !== ""} pos={pos}>
        <Title>
          ¥{currentHoverData.price.toLocaleString()}(
          {currentHoverData.flightTime})
        </Title>
        <InnerContent>
          <span>{currentHoverData.flightNumber}</span>
          <span>{currentHoverData.time}</span>
          <span>{currentHoverData.date}</span>
          <span>{currentHoverData.flightTime}</span>
        </InnerContent>
        <InnerContent>
          <span>{currentHoverData.flightNumber}</span>
          <span>{currentHoverData.time}</span>
          <span>{currentHoverData.date}</span>
          <span>{currentHoverData.flightTime}</span>
        </InnerContent>
      </Tooltip>
      <button onClick={addReservation}>追加</button>
      <svg height={500} width={1000}>
        <g className="graph"></g>
      </svg>
    </div>
  );
};
