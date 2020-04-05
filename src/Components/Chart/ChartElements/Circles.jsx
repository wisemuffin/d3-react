import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { accessorPropsType } from "../ChartContainer/utils";

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius,
  setTooltip,
}) => (
  <React.Fragment>
    {data.map((d, i) => (
      <Circle
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == "function" ? radius(d) : radius}
        onMouseOver={() =>
          setTooltip({
            x: xAccessor(d, i),
            y: yAccessor(d, i),
            data: d,
          })
        }
        onMouseOut={() => setTooltip(false)}
      />
    ))}
  </React.Fragment>
);

Circles.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  radius: accessorPropsType,
};

Circles.defaultProps = {
  radius: 5,
};

export default Circles;

const Circle = styled.circle`
  fill: #9980fa;
  transition: all 0.3s ease-out;
`;
