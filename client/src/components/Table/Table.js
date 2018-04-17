import React from "react";
import "./Table.css";

import Row from "../Row/Row";

class Table extends React.Component {

    constructor( props ) {
        super( props );
        let newData = {
            "CAC40":  [],
            "NASDAQ": []
        };
        this.state = {
            data: newData
        };
    }

    componentWillReceiveProps( nextProps ) {
        let newData = {
            "CAC40":  [],
            "NASDAQ": []
        };
        for ( let element in nextProps.data ) {
            newData["CAC40"].push( nextProps.data[element].stocks["CAC40"]);
            newData["NASDAQ"].push( nextProps.data[element].stocks["NASDAQ"]);
        }
        this.setState({
            data: newData
        });
    }

    render() {
        return (
            <div className="table-container">
                <Row key="CAC40"  title="CAC40"  values={this.state.data["CAC40"]} celledithandler={this.props.celledithandler} />
                <Row key="NASDAQ" title="NASDAQ" values={this.state.data["NASDAQ"]} celledithandler={this.props.celledithandler} />
            </div>
        );
    }

}

export default Table;