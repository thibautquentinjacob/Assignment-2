import React, { Component } from "react";
import "./Row.css";

import Cell from "../Cell/Cell";

class Row extends React.Component {

    render() {
        let content = [];
        content.push( <span key={this.props.title + "-title"} className="row-title">{this.props.title}</span> );
        if ( this.props.values ) {
            // Render all the cells within this row
            for ( let i = 0 ; i < this.props.values.length ; i++ ) {
                content.push(
                    <Cell key={i}
                          value={this.props.values[i]}
                          index={i}
                          celledithandler={this.props.celledithandler}
                          category={this.props.title}
                    />
                );
            }
        }
        return (
            <div key={this.props.title + "-container"} className={"row-container " + this.props.title}>
                {content}
            </div>
        );
    }

}

export default Row;