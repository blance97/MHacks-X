import React, { Component } from 'react';
import base from '../rebase';
import { Progress, Divider } from 'semantic-ui-react';
export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            totalWeight: 0
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
        base.fetch(this.props.match.params.id, {
            context: this,
            asArray: true,
            then(data) {
                callback(data)
            }
        });
    }

    render() {
        const choiceDisplay = this.state.choices.map((element, i) => {
            return (
                <div>
                    <Divider fitted />
                    <b style={{ fontSize: 20, textAlign: "left" }}>{`${(i + 1)}. ${element.food}`}</b>
                    <Progress percent={100} indicating />
                </div>

            )
        })
        console.log(this.state.choices);
        return (
            <center>
                <div style={{ backgroundColor: "#fafafa", width: "75%", borderRadius: 5 }}>
                    <div>
                        <h1>Current Results</h1>
                        {choiceDisplay}
                    </div>
                </div>
            </center>
        )
    }
}