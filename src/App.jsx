import React, { useState } from "react";
import * as d3 from "d3";
import { getTimelineData, getScatterData } from "./utils/dummyData";

import Timeline from "./Components/Chart/Timeline";
import ScatterPlot from "./Components/Chart/ScatterPlot";
import Histogram from "./Components/Chart/Histogram";

import { useInterval } from "./Hooks/useInterval";

import "./styles.css";

const parseDate = d3.timeParse("%m/%d/%Y");
const dateAccessor = (d) => parseDate(d.date);
const temperatureAccessor = (d) => d.temperature;
const humidityAccessor = (d) => d.humidity;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});
const App = () => {
  const [data, setData] = useState(getData());

  useInterval(() => {
    setData(getData());
  }, 40000);

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <div className="App__charts">
        <Timeline
          data={data.timeline}
          xAccessor={dateAccessor}
          yAccessor={temperatureAccessor}
          label="Temperature"
        />
        <ScatterPlot
          data={data.scatter}
          xAccessor={humidityAccessor}
          yAccessor={temperatureAccessor}
          xLabel="Humidity"
          yLabel="Temperature"
        />
        <Histogram
          data={data.scatter}
          xAccessor={humidityAccessor}
          label="Humidity"
        />
      </div>
    </div>
  );
};

export default App;
