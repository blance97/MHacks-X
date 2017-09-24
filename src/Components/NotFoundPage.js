import React, { Component } from 'react';
import { Divider, Header, Statistic } from 'semantic-ui-react';

export default class NotFoundPage extends Component {
    render() {
        return (
            <center>
                <Statistic>
                    <Statistic.Value>Error 404</Statistic.Value>
                    <Statistic.Label>Page not Found</Statistic.Label>
                </Statistic>
                <Divider />
                <img alt="Food Logo" src={require("../Photos/spinner.gif")}></img>
            </center>
        )
    }
}