/* eslint-disable no-shadow */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { differenceInMonths, format } from 'date-fns';
import PropTypes from 'prop-types';

import formatNumber from '../../utils/formatNumber';
import parseDate from '../../utils/parseDate';
import { fetchDailyData } from '../../redux/actions/actions';

export function Graph({ selectedState, getData, data }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);
  const margin = { top: 30, right: 0, bottom: 30, left: 60 };
  const width = 400 - margin.right - margin.left;
  const height = 250 - margin.top - margin.bottom;
  const fromMarch = differenceInMonths(new Date(), new Date(2020, 2, 1));

  const drawChart = () => {
    const barScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.positiveIncrease)])
      .range([height - margin.bottom, margin.top])
      .nice();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => parseDate(d.date)))
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
      .attr('height', (d) => yScale(0) - yScale(d.positiveIncrease));

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
            `<div>${format(new Date(parseDate(d.date)), 'MMMM do')}</div>
            <div>Cases: ${formatNumber(
              d.positiveIncrease,
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
      .x((d) => xScale(parseDate(d.date)))
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

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(3))
        .call((g) => g.select('.domain').remove());

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(fromMarch))
        .call((g) => g.select('.domain').remove());

    svg.append('g').attr('class', 'y-axis').call(yAxis);
    svg.append('g').attr('class', 'x-axis').call(xAxis);
  };

  const clearSVG = () => {
    svg.select('.y-axis').remove();
    svg.select('.x-axis').remove();
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
      <svg width={400} height={250} ref={svgRef} className="svg" />
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
