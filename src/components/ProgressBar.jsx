import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  width: 100%;
  background: #bee1dd;
  height: 15px;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 0;
    background: #8dcbc3;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 0.5s;
  }
  &.p1::after {
    width: 16.66%;
  }
  &.p2::after {
    width: 33.32%;
  }
  &.p3::after {
    width: 49.98%;
  }
  &.p4::after {
    width: 66.64%;
  }
  &.p5::after {
    width: 83.3%;
  }
  &.p6::after {
    width: 100%;
  }
`;

const ProgressBar = ({ percentaje }) => <Bar className={`Bar ${percentaje}`} />;

export default ProgressBar;
