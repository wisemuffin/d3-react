import React, { useState } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import styled from "styled-components";

import { ChartGeneralStyle } from "./ChartGeneralStyle";
import ChartContainer from "./ChartContainer";
import Line from "./ChartElements/Line";
import Axis from "./ChartElements/Axis";
import Gradient from "./ChartElements/Gradient";
import Circles from "./ChartElements/Circles";
import Tootltip from "./ChartElements/Tooltip";
import {
  useChartDimensions,
  accessorPropsType,
  useUniqueId,
} from "./ChartContainer/utils";

const formatDate = d3.timeFormat("%-b %-d");
const gradientColors = ["rgb(226, 222, 243)", "#f8f9fa"];

const Timeline = ({ data, xAccessor, yAccessor, label }) => {
  const [tooltip, setTooltip] = useState(false);
  const [ref, dimensions] = useChartDimensions();
  const gradientId = useUniqueId("Timeline-gradient");

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);
  const keyAccessor = (d, i) => i;

  return (
    <TimelineStyle ref={ref}>
      {tooltip && (
        <Tootltip
          tooltipEvent={tooltip}
          x={tooltip.x + dimensions.marginLeft}
          y={tooltip.y + dimensions.marginTop}
        >
          <div>xAccessor: {`${xAccessor(tooltip.data)}`}</div>
          <div>yAccessor: {yAccessor(tooltip.data)}</div>
        </Tootltip>
      )}
      <ChartContainer dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <Axis dimension="x" scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" scale={yScale} label={label} />
        <Line
          type="area"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
        <Line
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          setTooltip={setTooltip}
        />
      </ChartContainer>
    </TimelineStyle>
  );
};

Timeline.propTypes = {
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

Timeline.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const TimelineStyle = styled(ChartGeneralStyle)`
  height: 300px;
  min-width: 500px;
  width: calc(100% + 1em);
  margin-bottom: 2em;
  position: relative;
`;

export default Timeline;
