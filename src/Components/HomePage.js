import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import shortid from 'shortid';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    render() {
        return (
            <div>
                <center>
                    <img style={{ width: "60%" }} alt="Food Logo" src={require("../Photos/logo.png")}></img>
                    <br />
                    <Button secondary size='huge' onClick={() => this.setState({ redirect: true })}>
                        Get Started
                        <Icon name='right arrow' />
                    </Button>
                    {this.state.redirect && <Redirect push to={`/pref/${shortid.generate()}`} />}
                </center>
            </div>

        )
    }
}