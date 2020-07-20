/* eslint-disable no-shadow */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { fetchDailyData } from '../../redux/actions/actions';

const GRAPHHEIGHT = 275;
const GRAPHWIDTH = 425;

export function Graph({ selectedState, getData, data }) {
  const formatNumber = d3.format(',');
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);
  const margin = { top: 20, right: 0, bottom: 30, left: 10 };
  const width = GRAPHWIDTH - margin.right - margin.left;
  const height = GRAPHHEIGHT - margin.top - margin.bottom;

  const drawChart = () => {
    const barScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.newCases)])
      .range([height - margin.bottom, margin.top])
      .nice();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    // create bars
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .style('transform', 'scale(1, -1)')
      .attr('x', (d, i) => barScale(i))
      .attr('y', () => -height + margin.bottom)
      .attr('width', barScale.bandwidth())
      .style('fill', 'lightblue')
      .transition()
      .attr('height', (d) => yScale(0) - yScale(d.newCases));

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

    // show tooltip when bars are hovered
    svg
      .selectAll('rect')
      .on('mouseover', (d) => {
        tooltip
          .html(
            `<div>${format(new Date(d.date), 'MMMM do')}</div>
            <div>Cases: ${formatNumber(
              d.newCases,
            )}</div><div>7 Day Avg: ${formatNumber(d.avgCases7Days)}</div>`,
          )
          .style('visibility', 'visible');
      })
      .on('mousemove', () => {
        tooltip
          .style('top', `${d3.event.pageY - 10}px`)
          .style('left', `${d3.event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.html(``).style('visibility', 'hidden');
      });

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.avgCases7Days));

    const path = svg
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3);

    const length = path.node().getTotalLength();

    // animate line
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
      .attr('y', 0 + margin.left - 30)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('font-size', '0.9rem')
      .text('Number of Cases');

    // add x axis and label
    const xAxis = svg.append('g').attr('class', 'x-axis').call(createXAxis);
    xAxis.selectAll('.tick', 'text').style('font-size', '0.8rem');

    // add graph title
    svg
      .append('text')
      .attr('class', 'graph-title')
      .attr('x', (width + margin.left) / 2)
      .attr('y', margin.top - 5)
      .attr('text-anchor', 'middle')
      .text('Number of New Cases over Time');

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
      .text('New Cases')
      .style('font-size', '0.9rem')
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');
  };

  const clearSVG = () => {
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
    getData(selectedState);
  }, [selectedState]);

  useEffect(() => {
    if (data) {
      drawChart();
    }
    return () => clearSVG();
  }, [data]);

  return (
    <div style={{ margin: '1rem' }}>
      <svg width={GRAPHWIDTH} height={GRAPHHEIGHT} ref={svgRef} className="svg" />
    </div>
  );
}

Graph.defaultProps = {
  data: [{}],
};

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedState: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedState: state.selected.selected,
  data: state.data.data,
});

const mapDispatchToProps = (dispatch) => ({
  getData: (state) => dispatch(fetchDailyData(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
