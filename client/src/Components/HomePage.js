import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let hi = <img src={require("../Photos/spinner.gif")}></img>
        return (
            <div>
                <center>
                    <h1 style={{ color: "white" }}>sudo apt get food</h1>
                    {hi}
                </center>
            </div>

        )
    }
}