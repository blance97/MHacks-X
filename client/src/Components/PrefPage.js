import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
import shortid from 'shortid';
import Cuisines from '../Data/Options.js'


export default class PrefPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstPreferred: "",
            secondPreferred: "",
            thirdPreferred: ""
        }
    }

    foodPicked(e, data) {
        switch(data.name) {
            case "first":
                this.state.firstPreferred = data.value
            case "second":
                this.state.secondPreferred = data.value
            case "third":
                this.state.thirdPreferred = data.value
        }
    }

    
    render() {
        const { activeItem } = this.state

        const foodOptions = Cuisines.Cuisines.map((cuisine, i) => {
            return { key: i, value: cuisine, text: cuisine }
        });

        return (
            <div>
                <Dropdown onChange={(e,data) => this.foodPicked(e, data)} name='First' placeholder='Select Food' fluid search selection options={foodOptions} />
                <Dropdown onChange={(e,data) => this.foodPicked(e, data)} name='Second' placeholder='Select Food' fluid search selection options={foodOptions} />
                <Dropdown onChange={(e,data) => this.foodPicked(e, data)} name='Third' placeholder='Select Food' fluid search selection options={foodOptions} />
            </div>
        )
    }
}