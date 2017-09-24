import React, { Component } from 'react';
import base from '../rebase';
import { Progress, Divider, Button, Modal, Loader, Dimmer, Input } from 'semantic-ui-react';
import DetailedPlace from "./DetailedPlace";

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            totalWeight: 0,
            modalState: false,
            details: {},
            loadingPlaces: false,
            error: "",
            past: []
        }

        this.modifyDisplayValues = this.modifyDisplayValues.bind(this)
    }

    componentDidMount() {
        this.getFoodPrefs(this.modifyDisplayValues)
    }

    modifyDisplayValues(data) {
        data.forEach((element) => {
            let inputs = element.inputs
            for (const key of Object.keys(inputs)) {
                const input = inputs[key]

                if (input.food === "") {
                    continue;
                }

                let index = this.state.choices.findIndex((choice) => choice.food === input.food)
                if (index < 0) {
                    this.setState({ totalWeight: this.state.totalWeight + input.weight, choices: [...this.state.choices, { food: input.food, count: 1, weightedSum: input.weight }] })
                } else {
                    const currElement = this.state.choices[index]
                    this.setState({
                        totalWeight: this.state.totalWeight + input.weight,
                        choices: this.state.choices.map((element, i) => {
                            if (i === index) {
                                return { food: input.food, count: currElement.count + 1, weightedSum: currElement.weightedSum + input.weight }
                            }
                            return element
                        })
                    });
                }
            }
        });
        this.setState({ choices: this.state.choices.slice(0).sort((a, b) => { return b.weightedSum - a.weightedSum }) })
    }

    getFoodPrefs(callback) {
        base.listenTo(this.props.match.params.id, {
            context: this,
            asArray: true,
            then(data) {
                callback(data)
            }
        });
    }


    getSuggestedPlaces() {
        this.setState({ loadingPlaces: true, error: "" })
        const listedPlaces = this.state.choices.slice(0, 4).map((element, i) => {
            return { type: element.food, weight: element.weightedSum / this.state.totalWeight};
        })
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.log({ types: listedPlaces, location: { lat: position.coords.latitude, long: position.coords.longitude } })
                fetch('https://foodphoriadb.herokuapp.com/recm', {
                    method: "POST",
                    body: JSON.stringify(
                        { types: listedPlaces, location: { lat: position.coords.latitude, long: position.coords.longitude }, past: this.state.past }
                    )
                }).then((res) => res.json())
                    .then((responseJson) => {
                        this.setState({ details: responseJson }, () => this.setState({ loadingPlaces: false, modalState: true }));
                        const detailsShortcut = this.state.details.placeInfo.result
                        this.setState({past: [...this.state.past, detailsShortcut.name]})
                    }).catch((error) => {
                        console.log(error);
                        this.setState({ loadingPlaces: false, error: "An unexpected error has occured. Please try again" });
                    });
            })

    }

    handleFocus(event) {
        event.target.select();
    }

    render() {
        console.log(this.state)
        const choiceDisplay = this.state.choices.map((element, i) => {
            let percentage = element.weightedSum / this.state.totalWeight;
            return (
                <div key={i}>
                    <h3 style={{ fontSize: 20, textAlign: "left", paddingLeft: 10 }}>{`${(i + 1)}. ${element.food} (${(percentage * 100).toFixed(0)}%)`}</h3>
                    <Progress color={"green"} active percent={percentage * 100} />
                    <Divider fitted />
                </div>

            )
        })

        console.log(this.state.choices);
        return (
            <div>
                <div style={{ backgroundColor: "#fafafa", borderRadius: 5 }}>
                    <center><h1>Current Results</h1></center>
                    <Divider />
                    <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                        {choiceDisplay}
                    </div>
                </div>
                <center style={{ marginTop: 10 }}>
                    {this.state.error !== "" && <text style={{ color: "#b71c1c", fontSize: 20 }}>{this.state.error}</text>}
                </center>
                <div style={{ marginTop: 10 }}>
                    <center>
                        <Button size='huge' color='teal' onClick={() => this.getSuggestedPlaces()}>Give me a recommendation!</Button>
                    </center>
                </div>
                <Dimmer active={this.state.loadingPlaces}>
                    <Loader />
                </Dimmer>
                <center>
                    <div style={{ marginTop: 20, width: '200px', backgroundColor: '#607d8b', borderRadius: 5 }}>
                        <h3 style={{ width: '200px', color: '#e0e0e0' }}>Share with your friends!</h3>
                        <Input onFocus={this.handleFocus}
                            value={`https://${window.location.hostname}/pref/${this.props.match.params.id}`} width='200px' />
                    </div>
                </center>
                <Modal
                    closeIcon
                    open={this.state.modalState}
                    onClose={() => { this.setState({ modalState: false }) }}
                    size='small'
                >
                    <Modal.Content>
                        <DetailedPlace details={this.state.details} prefs={this.state.choices.slice(0, 4)} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}