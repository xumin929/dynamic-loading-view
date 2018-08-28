import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
//import DiffMonitor from 'redux-devtools-diff-monitor';
// import SliderMonitor from 'redux-slider-monitor';
// import Inspector from 'redux-devtools-inspector';
// //import FilterableLogMonitor from '../src'
// import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
// import ChartMonitor from 'redux-devtools-chart-monitor';

//npm install --save-dev redux-devtools-diff-monitor

export default createDevTools(<DockMonitor defaultIsVisible={false} changeMonitorKey="ctrl-M" toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q">
  <LogMonitor />
</DockMonitor>);
