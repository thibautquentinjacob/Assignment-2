import React from "react";
import * as d3 from "d3";

import "./Plot.css";

class Plot extends React.Component {

    constructor( props ) {
        super( props );
        // Restructure API data
        const newData = this.restructureAPIData( this.props.data );
        this.state = {
            data: newData
        };
    }

    componentWillReceiveProps( nextProps ) {
        // Restructure API data
        const newData = this.restructureAPIData( nextProps.data );
        this.setState({
            data: newData
        });
    }

    // Restructure data to be flatter { timestamp, CAC40, NASDAQ }
    restructureAPIData( data ) {
        const newData = data.map( function( element ) {
            return {
                timestamp: element.timestamp,
                CAC40:     element.stocks.CAC40,
                NASDAQ:    element.stocks.NASDAQ
            };
        });
        return newData;
    }

    render() {

        const dimensions = [ "CAC40", "NASDAQ" ];
        // Empty SVG
        d3.selectAll('svg > g').remove();

        // D3 code based on https://bl.ocks.org/mbostock/3883245
        var margin = { top: 20, right: 100, bottom: 30, left: 70 };
        var width  = window.innerWidth - 100;
        var height = 300;
        var svg    = d3.select( "svg" )
                       .attr('width', width + margin.left + margin.right)
                       .attr('height', height + margin.top + margin.bottom)
                       .append('g')
                       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Set ranges
        var x = d3.scaleTime().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        // Scale data range
        x.domain(d3.extent(this.state.data, function (d) { return d.timestamp }));
        y.domain([
            d3.min( this.state.data, function(d) {
                return d.CAC40 < d.NASDAQ ? d.CAC40 : d.NASDAQ;
            }),
            d3.max(this.state.data, function(d) {
                return d.CAC40 > d.NASDAQ ? d.CAC40 : d.NASDAQ;
            })
        ]);

        // For each dimension (CAC40, NASDAQ)
        for ( let i = 0 ; i < dimensions.length ; i++ ) {
            // Define the line
            var valueline = d3.line()
                              .x(function(d) { return x( d.timestamp ); })
                              .y(function(d) { return y( d[dimensions[i]]); });
            svg.append("path")
               .data([this.state.data])
               .attr("class", dimensions[i])
               .attr("d", valueline);
        }

        // Draw x axis and legend
        svg.append("g")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x))
           .append("text")
           .attr("y", -10)
           .attr( "x", width - 20 )
           .attr("dy", "0.71em")
           .attr("fill", "#000")
           .text("Time, sec");

        // Draw y axis and legend
        svg.append("g")
           .call(d3.axisLeft(y))
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "0.71em")
           .attr("fill", "#000")
           .text("Price");

        // Return the bare minimum
        return (
            <div></div>
        );
    }
}

export default Plot;