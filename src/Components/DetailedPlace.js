import React, { Component } from 'react';
import { Header, Divider, Dimmer, Loader, Segment, Rating } from 'semantic-ui-react';

export default class DetailedPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false
        }
    }
    sendPrefs(e, data) {
        console.log(data);
        const details = this.props.details.placeInfo.result;
        console.log(details);
        const names = this.props.prefs.map((element) => {
            return element.food
        })
        this.setState({ voted: true });
        fetch('https://foodphoriadb.herokuapp.com/prefs', {
            method: "POST",
            body: JSON.stringify(
                { name: details.name, prefs: names, rprefs: this.props.details.rprefs, grating: details.rating, plevel: this.props.details.plevel, rating: data.rating }
            )
        })
    }

    render() {
        const details = this.props.details.placeInfo.result;
        return (
            <div>
                <div>
                    <Header as='h1' style={{ marginBottom: 10 }}>
                        {details.name}
                        <Header.Subheader>
                            <a href={`https://maps.google.com/?q=${details.formatted_address}`} target="_blank">{details.formatted_address}</a>
                        </Header.Subheader>
                        <Header.Subheader>
                            {details.formatted_phone_number}
                        </Header.Subheader>
                    </Header>
                    <Divider fitted />
                    <Header as="h2">Info</Header>
                    <ul>
                        <li>Distance: {this.props.details.dist} mi</li>
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
                        <a href={`${details.website}`} target="_blank">Website: {details.website}</a>
                        <Divider horizontal></Divider>
                    </div>
                    <center><Header as="h3">Rate this suggestion:</Header></center>
                    <Rating disabled={this.state.voted} maxRating={5} defaultRating={0} onRate={(e, data) => this.sendPrefs(e, data)} icon='star' size='massive' />
                </div>


            </div>
        )

    }
}