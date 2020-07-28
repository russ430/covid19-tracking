/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorModal from '../../ErrorModal/ErrorModal';
import bisect from '../../../utils/bisect';
import {
  requestStateDailyData,
  getDailyDataSuccess,
  clearDailyDataError,
} from '../../../redux/actions/actions';

const Title = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const Updated = styled.h3`
  font-size: 0.8rem;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  padding: 0;
  margin: 0;
  margin-bottom: -0.5rem;
  font-style: italic;
`;

const GRAPHHEIGHT = 300;
const GRAPHWIDTH = 600;

export function NewCasesGraph({
  selectedState,
  fetchData,
  data,
  dataName,
  storeDataFromCache,
  lastUpdated,
  barsKey,
  lineKey,
  error,
  clearError,
  meta,
}) {
  const formatNumber = d3.format(',');
  const margin = { top: 20, right: 0, bottom: 30, left: 20 };
  const width = GRAPHWIDTH - margin.right - margin.left;
  const height = GRAPHHEIGHT - margin.top - margin.bottom;

  const drawGraph = () => {
    const svg = d3.select('.svg-graph');
    const barScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[barsKey])])
      .range([height - margin.bottom, margin.top])
      .nice();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([margin.left, width - margin.right]);

    // create bars
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .style('transform', 'scale(1, -1)')
      .attr('class', (d) => `${d.hash}`)
      .attr('x', (d, i) => barScale(i))
      .attr('y', () => -height + margin.bottom)
      .attr('width', barScale.bandwidth())
      .style('fill', 'lightblue')
      .transition()
      .attr('height', (d) => yScale(0) - yScale(d[barsKey]));

    const line = d3
      .line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d[lineKey]))
      .curve(d3.curveCardinal);

    // create line based on 7 day avg
    const path = svg
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3);

    // animate line
    const length = path.node().getTotalLength();
    path
      .attr('stroke-dasharray', `${length} ${length}`)
      .attr('stroke-dashoffset', length)
      .transition()
      .delay(100)
      .duration(1000)
      .attr('stroke-dashoffset', 0);

    const createYAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(
          d3
            .axisRight(yScale)
            .tickSize(width - margin.left - margin.right)
            .tickFormat(d3.format(','))
            .ticks(2),
        )
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick:not(:first-of-type) line')
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', '5,2')
            .attr('x2', width - margin.left - margin.right),
        )
        .call((g) =>
          g
            .selectAll('.tick text')
            .style('font-size', '0.8rem')
            .attr('x', 4)
            .attr('dy', -4),
        );

    const createXAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)))
        .call((g) => g.select('.domain').remove());

    // add y axis and label
    svg.append('g').attr('class', 'y-axis').call(createYAxis);
    svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left - 20)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('font-size', '0.9rem')
      .text(`Number of ${dataName}`);

    // add x axis and label
    const xAxis = svg.append('g').attr('class', 'x-axis').call(createXAxis);
    xAxis.selectAll('.tick', 'text').style('font-size', '0.8rem');

    // add legend
    svg
      .append('circle')
      .attr('class', 'legend-circle')
      .attr('cx', margin.left)
      .attr('cy', height + margin.bottom - 15)
      .attr('r', 7)
      .style('fill', 'steelblue');

    svg
      .append('text')
      .attr('class', 'legend-text')
      .attr('x', margin.left + 13)
      .attr('y', height + margin.bottom - 15)
      .text('7 Day Average')
      .style('font-size', '0.9rem')
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');

    svg
      .append('circle')
      .attr('class', 'legend-circle')
      .attr('cx', margin.left + 140)
      .attr('cy', height + margin.bottom - 15)
      .attr('r', 7)
      .style('fill', 'lightblue');

    svg
      .append('text')
      .attr('class', 'legend-text')
      .attr('x', margin.left + 153)
      .attr('y', height + margin.bottom - 15)
      .text(`New ${dataName}`)
      .style('font-size', '0.9rem')
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');

    // create tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('font-size', '0.8rem')
      .style('padding', '5px')
      .style('background', '#fff')
      .style('border', '1px solid #ddd')
      .text('a simple tooltip');

    // show tooltip when mouse hovers over svg
    svg
      .on('touchmove mousemove', () => {
        if (
          d3.event.offsetX < margin.left ||
          d3.event.offsetX > width - margin.right ||
          d3.event.offsetY < margin.top ||
          d3.event.offsetY > height - margin.bottom
        )
          return;
        // select data point closest to mouse pointer
        const dataPoint = bisect(data, xScale.invert(d3.event.offsetX));
        tooltip
          .html(
            `<div style="font-weight: 600;">${format(
              new Date(dataPoint.date),
              'MMMM do',
            )}</div>
           <div>${dataName}: ${formatNumber(dataPoint[barsKey])}</div>
           <div style="color: #666;">7 Day Avg: ${formatNumber(
             dataPoint[lineKey],
           )}</div>`,
          )
          .style('visibility', 'visible')
          .style('top', `${d3.event.pageY - 10}px`)
          .style('left', `${d3.event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.html(``).style('visibility', 'hidden');
      });
  };

  const clearSVG = () => {
    const svg = d3.select('.svg-graph');
    svg.select('.y-axis').remove();
    svg.select('.x-axis').remove();
    svg.select('.y-axis-label').remove();
    svg.select('.x-axis-label').remove();
    svg.select('.graph-title').remove();
    svg.selectAll('.legend-circle').remove();
    svg.selectAll('.legend-text').remove();
    svg.selectAll('path').remove();
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem(selectedState);
    if (cachedData) {
      storeDataFromCache(JSON.parse(cachedData));
    } else {
      fetchData(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem(selectedState, JSON.stringify(data));
      drawGraph();
    }
    return () => clearSVG();
  }, [data, barsKey]);

  return (
    <div>
      <ErrorModal visible={error} onClose={clearError}>
        Unable to retrieve data for {selectedState === 'all' ? 'the U.S' : meta[selectedState].name}. Please try again later
      </ErrorModal>
      <Title>New reported {dataName.toLowerCase()} by day</Title>
      <Updated>
        *Last updated {format(new Date(lastUpdated), 'PPP @ p')}
      </Updated>
      <svg width={GRAPHWIDTH} height={GRAPHHEIGHT} className="svg-graph" />
    </div>
  );
}

NewCasesGraph.defaultProps = {
  data: [{}],
  error: null,
};

NewCasesGraph.propTypes = {
  barsKey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  dataName: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  lineKey: PropTypes.string.isRequired,
  selectedState: PropTypes.string.isRequired,
  storeDataFromCache: PropTypes.func.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  barsKey: state.graph.barsKey,
  data: state.dailyData.data,
  dataName: state.graph.name,
  lastUpdated: state.dailyData.lastUpdated,
  lineKey: state.graph.lineKey,
  selectedState: state.selected.selected,
  error: state.dailyData.error,
  meta: state.meta.meta,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (state) => dispatch(requestStateDailyData(state)),
  storeDataFromCache: (data) => dispatch(getDailyDataSuccess(data)),
  clearError: () => dispatch(clearDailyDataError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCasesGraph);
