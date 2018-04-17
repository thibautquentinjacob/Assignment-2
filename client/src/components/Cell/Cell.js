import React from "react";
import "./Cell.css";

class Cell extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            value:    this.props.value,
            modified: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps( nextProps ) {
        // If the cell value has not been modified by the user or if it's empty
        // update its value
        if ( !this.state.modified || this.state.value === "" ) {
            this.setState({
                value: nextProps.value,
                modified: false
            });
        }
    }

    handleChange( event ) {
        // Prevent NaN with default value and float cast
        let newVal = 0;
        if ( event.target.value !== "" ) {
            newVal = event.target.value;
        }
        this.setState({
            value:    parseFloat( newVal ),
            modified: true
        });
        // Transmit new cell value, cell index and category back to the App component
        this.props.celledithandler( parseFloat( newVal ), this.props.index, this.props.category );
    }

    render() {
        return (
            <input type="text"
                   value={Math.round( this.state.value * 100 ) / 100} // Round up cell value to 0.00
                   onChange={this.handleChange}
            />
        );
    }

}

export default Cell;