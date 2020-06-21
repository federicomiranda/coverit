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
  &.p10::after {
    width: 10%;
  }
  &.p20::after {
    width: 10%;
  }
`;

const ProgressBar = ({ percentaje }) => <Bar className={`Bar ${percentaje}`} />;

export default ProgressBar;
