import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import styled from "styled-components";
import { Text } from "../ChartGeneralStyle.js";
import { dimensionsPropsType } from "../ChartContainer/utils";
import { useChartDimensions } from "../ChartContainer";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};
const Axis = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions();
  const Component = axisComponentsByDimension[dimension];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

Axis.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

Axis.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: d3.format(","),
};

export default Axis;

function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <AxisHorizontalStyle
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <Axis__line x2={dimensions.boundedWidth} />

      {ticks.map((tick, i) => (
        <Axis__tick key={tick} transform={`translate(${scale(tick)}, 25)`}>
          {formatTick(tick)}
        </Axis__tick>
      ))}

      {label && (
        <Axis__label
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          {label}
        </Axis__label>
      )}
    </AxisHorizontalStyle>
  );
}

function AxisVertical({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <AxisVerticalStyle {...props}>
      <Axis__line y2={dimensions.boundedHeight} />

      {ticks.map((tick, i) => (
        <Axis__tick key={tick} transform={`translate(-16, ${scale(tick)})`}>
          {formatTick(tick)}
        </Axis__tick>
      ))}

      {label && (
        <Axis__label
          style={{
            transform: `translate(-56px, ${
              dimensions.boundedHeight / 2
            }px) rotate(-90deg)`,
          }}
        >
          {label}
        </Axis__label>
      )}
    </AxisVerticalStyle>
  );
}

const Axis__line = styled.line`
  stroke: #bdc3c7;
`;

const Axis__label = styled(Text)`
  text-anchor: middle;
  font-size: 0.9em;
  letter-spacing: 0.01em;
`;

const Axis__tick = styled(Text)`
  font-size: 0.8em;
  transition: all 0.3s ease-out;
`;

const AxisHorizontalStyle = styled.g`
  dominant-baseline: middle;
  text-anchor: end;
`;

const AxisVerticalStyle = styled.g`
  text-anchor: middle;
`;
