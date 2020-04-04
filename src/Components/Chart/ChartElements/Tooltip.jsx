import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  opacity: 0;
  position: absolute;
  top: -12px;
  left: 0;
  padding: 0.6em 1em;
  background: #fff;
  text-align: center;
  border: 1px solid #ddd;
  z-index: 10;
  transition: all 0.2s ease-out;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 12px;
    height: 12px;
    background: white;
    border: 1px solid #ddd;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: translate(-50%, 50%) rotate(45deg);
    transform-origin: center center;
    z-index: 10;
  }
`;

const Tooltip = (props) => {
  return (
    <TooltipContainer id="tooltip" className="tooltip">
      {props.children}
    </TooltipContainer>
  );
};

export default Tooltip;
