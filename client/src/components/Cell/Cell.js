import React from "react";
import "./Cell.css";

class Cell extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            value:    this.props.value,
            modified: false,
            focused:  false,
            class:    ""
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleFocus  = this.handleFocus.bind( this );
        this.handleBlur   = this.handleBlur.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        // If the cell value has not been modified by the user, if it's empty
        // or if it's not focused, update its value
        if (( !this.state.modified || this.state.value === "" ) && !this.state.focused ) {
            this.setState({
                value: nextProps.value,
                modified: false,
                class:    ""
            });
        }
    }

    handleChange( event ) {
        // Prevent NaN with default value and float cast
        let newVal = -1;
        if ( event.target.value !== "" ) {
            newVal = event.target.value;
            this.setState({
                value:    parseFloat( newVal ),
                modified: true,
                class:    "modified"
            });
        } else {
            this.setState({
                value:    parseFloat( newVal ),
                modified: false,
                class:    ""
            });
        }
        // Transmit new cell value, cell index and category back to the App component
        this.props.celledithandler(
            parseFloat( newVal ),
            this.props.index,
            this.props.category
        );
    }

    handleFocus( event ) {
        this.setState({
            focused: true
        });
    }

    handleBlur( event ) {
        this.setState({
            focused: false
        });
    }

    render() {
        return (
            <input type="text"
                   value={Math.round( this.state.value * 100 ) / 100} // Round up cell value to 0.00
                   onChange={this.handleChange}
                   onFocus={this.handleFocus}
                   onBlur={this.handleBlur}
                   className={this.state.class}
            />
        );
    }

}

export default Cell;