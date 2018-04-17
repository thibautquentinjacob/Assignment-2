import React from "react";
import "./App.css";

import Table from "../Table/Table";
import Plot from "../Plot/Plot";

class App extends React.Component {

    constructor( props ) {
        super( props );
        // Object to store user override
        let override = {
            "CAC40":  [],
            "NASDAQ": []
        };
        // Init override : default value is -1
        // -1              -> no override
        // any other value -> override
        for ( let i = 0 ; i < 20 ; i++ ) {
            override["CAC40"].push( -1 );
            override["NASDAQ"].push( -1 );
        }
        this.state = {
            data:     [],
            override: override
        };
    }

    componentDidMount() {
        // Setup API refresh
        setInterval( () => {
            this.fetchData();
        }, 1000 );
    }

    // Fetch data from the API and apply override
    async fetchData() {
        await fetch( "http://localhost:8000/?count=20" )
        .then(( response ) => {
            return response.text()
        })
        .then( async ( content ) => {
            let data = JSON.parse( content );
            // Apply user override to dataset and save component state
            for ( let i = 0 ; i < 20 ; i++ ) {
                const cac40Override = this.state.override["CAC40"][i];
                const nasdaqOverride = this.state.override["NASDAQ"][i];
                if ( cac40Override !== -1 ) {
                    data[i].stocks["CAC40"] = cac40Override;
                }
                if ( nasdaqOverride !== -1 ) {
                    data[i].stocks["NASDAQ"] = nasdaqOverride;
                }
            }
            this.setState({
                data:     data,
                override: this.state.override
            });
        });
    }

    // Cell edition handler to pass down to the Cell component
    celledithandler( cellValue, cellIndex, category ) {
        // Add new override and update component state
        this.state.override[category][cellIndex] = parseFloat( cellValue );
        this.setState({
            data:     this.state.data,
            override: this.state.override
        })
    }


    render() {
        return (
            <div>
                <Plot data={this.state.data} height="200" width="300" />
                <Table data={this.state.data} celledithandler={this.celledithandler.bind(this)}/>
            </div>
        );
    }

}

export default App;