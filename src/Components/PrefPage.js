import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Button, Divider, Input } from 'semantic-ui-react';
import Cuisines from '../Data/Options.js'
import base from '../rebase';
import { Redirect } from 'react-router-dom';


export default class PrefPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            firstPreferred: "",
            secondPreferred: "",
            thirdPreferred: ""
        }
    }
    componentDidMount() {
        if (localStorage.getItem(`VotedFor(${this.props.match.params.id})`) === this.props.match.params.id) {
            this.setState({ redirect: true });
        }
    }

    foodPicked(e, data) {
        this.setState({ [data.name]: data.value })
    }

    submitPref() {
        try {
            base.fetch(this.props.match.params.id, { context: this, asArray: true });
            base.push(this.props.match.params.id, {
                data: {
                    time: Date.now(),
                    inputs: {
                        first:
                        {
                            food: this.state.firstPreferred,
                            weight: 3
                        },
                        second:
                        {
                            food: this.state.secondPreferred,
                            weight: 2
                        },
                        third:
                        {
                            food: this.state.thirdPreferred,
                            weight: 1
                        }
                    }
                }
            });
        } catch (error) {
            base.post(this.props.match.params.id, {
                data: {
                    time: Date.now(),
                    inputs: {
                        first:
                        {
                            food: this.state.firstPreferred,
                            weight: 3
                        },
                        second:
                        {
                            food: this.state.secondPreferred,
                            weight: 2
                        },
                        third:
                        {
                            food: this.state.thirdPreferred,
                            weight: 1
                        }
                    },
                    past: []
                }
            });
        } finally {
            this.setState({ redirect: true });
            localStorage.setItem(`VotedFor(${this.props.match.params.id})`, this.props.match.params.id);
        }
    }

    handleFocus(event) {
        event.target.select();
    }

    render() {
        const foodOptions = Cuisines.Cuisines.map((cuisine, i) => {
            return { key: i, value: cuisine, text: cuisine }
        });
        const styles = { paddingTop: '10px', marginTop: 25 }
        return (
            <center>
                <div style={{ paddingTop: '15px', backgroundColor: "#fafafa", width: "75%", borderRadius: 5 }}>
                    <h1>Your Preferences</h1>
                    <div>
                        <Divider horizontal>{"Top Preference"}</Divider>
                        <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Dropdown onChange={(e, data) => this.foodPicked(e, data)} name='firstPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                        </div>
                    </div>
                    <div style={styles}>
                        <Divider horizontal>{"Second Preference"}</Divider>
                        <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Dropdown disabled={this.state.firstPreferred === ""} onChange={(e, data) => this.foodPicked(e, data)} name='secondPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                        </div>
                    </div>
                    <div style={styles}>
                        <Divider horizontal>{"Third Preference"}</Divider>
                        <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Dropdown disabled={this.state.secondPreferred === ""} onChange={(e, data) => this.foodPicked(e, data)} name='thirdPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                        </div>
                    </div>
                    <Divider horizontal />
                    <Button disabled={localStorage.getItem(`VotedFor(${this.props.match.params.id})`) === this.props.match.params.id} color='teal' onClick={() => this.submitPref()}>Submit Preferences</Button>
                    <Divider />
                    {this.state.redirect && <Redirect push to={`/results/${this.props.match.params.id}`} />}
                </div>
                <div style={{ marginTop: 20, width: '200px', backgroundColor: '#607d8b', borderRadius: 5 }}>
                    <h3 style={{ width: '200px', color: '#e0e0e0' }}>Share with your friends!</h3>
                    <Input onFocus={this.handleFocus}
                        value={`https://${window.location.hostname}/pref/${this.props.match.params.id}`} width='200px' />
                </div>
            </center>

        )
    }
}