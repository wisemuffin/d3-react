import React, { createContext, useContext } from "react";
import styled from "styled-components";
import { dimensionsPropsType } from "./utils";

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <ChartContainerStyle width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </ChartContainerStyle>
  </ChartContext.Provider>
);

Chart.propTypes = {
  dimensions: dimensionsPropsType,
};

Chart.defaultProps = {
  dimensions: {},
};

const ChartContainerStyle = styled.svg`
  overflow: visible;
`;

export default Chart;
