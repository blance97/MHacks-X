import React, { Component } from 'react';
import { Header, Divider, Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';
const google = window.google;

export default class DetailedPlace extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        const details = this.state.info;
        return (
            <div>
                {this.state.loading ? <Segment>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                </Segment> : <div>
                        <Header as='h1' style={{ marginBottom: 10 }}>
                            {details.name}
                            <Header.Subheader>
                                {details.formatted_address}
                            </Header.Subheader>
                            <Header.Subheader>
                                {details.formatted_phone_number}
                            </Header.Subheader>
                        </Header>
                        <Divider fitted />
                        <Header as="h2">Info</Header>
                        <ul>
                            <li>Distance: {this.props.dist} mi</li>
                            <li>Rating: {details.rating}</li>
                            <li>Price Level: {details.price_level}</li>
                            <li>Status: {details.opening_hours.open_now === true ? "Open" : "Closed"}</li>
                        </ul>
                        <Divider fitted />
                        <center><Header as="h3">Schedule</Header></center>
                        <div>
                            <ul>
                                {details.opening_hours.weekday_text.map((element, i) => {
                                    return (<li key={i}>
                                        {element}
                                    </li>)
                                })}
                            </ul>
                        </div>
                        <Divider />
                        <div>
                            <a href={`${details.website}`}>Website: {details.website}</a>
                        </div>

                    </div>
                }


            </div>
        )

    }
}