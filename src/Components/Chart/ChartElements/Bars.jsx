import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";
import { accessorPropsType, callAccessor } from "../ChartContainer/utils";

const Bars = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  setTooltip,
  ...props
}) => (
  <React.Fragment>
    {data.map((d, i) => (
      <Rect
        {...props}
        key={keyAccessor(d, i)}
        x={callAccessor(xAccessor, d, i)}
        y={callAccessor(yAccessor, d, i)}
        width={d3.max([callAccessor(widthAccessor, d, i), 0])}
        height={d3.max([callAccessor(heightAccessor, d, i), 0])}
        onMouseOver={() =>
          setTooltip({
            x:
              callAccessor(xAccessor, d, i) +
              callAccessor(widthAccessor, d, i) / 2,
            y: callAccessor(yAccessor, d, i),
            data: d,
          })
        }
        onMouseOut={() => setTooltip(false)}
      />
    ))}
  </React.Fragment>
);

Bars.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  widthAccessor: accessorPropsType,
  heightAccessor: accessorPropsType,
};

Bars.defaultProps = {};

export default Bars;

const Rect = styled.rect`
  fill: #9980fa;
  transition: all 0.3s ease-out;

  &:hover {
    fill: maroon;
  }
`;
