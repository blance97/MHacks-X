import React, { Component } from 'react';
import { Container, Button, Header, Icon, Image, Segment, Divider } from 'semantic-ui-react';

export default class About extends Component {
    render() {
        return (
            <Segment
                vertical
            >
                <Container text style={{ color: "white" }}>
                    <Header as='h1' style={{ color: "white" }}>What is Food Poll?</Header>
                    <ul>
                        <p>This is a solution for people in groups that need to decide to get food based off multiple people's opinion. Everytime the button "Give me a recommendation!" is clicked, The app generates a new suggested place. It gathers everyones opinion and generates a suggested place based off their preferences.</p>
                        <p>Tensorflow is used to learn to create better suggestions based off the rating feedback given. Firebase is utilized for the live data and its NoSQL database. Geolocation is used to find the base suggested places near you (Using Google places API). </p>
                        <p>For the Backend, we use python flask and MongoDB.</p>
                    </ul>
                    <div>
                        <Button as='a' href="https://github.com/blance97/MHacks-X" inverted color='black' content='View Frontend Code' icon='github' labelPosition='left' />
                        <Button as='a' href="https://github.com/brubakbd/MHacks-X" inverted color='black' content='View Backend Code' icon='github' labelPosition='left' />
                    </div>
                    <h2 style={{ textAlign: "left" }}>Flow: </h2>
                    <ul style={{ textAlign: "left" }}>
                        <li>Create Preference page</li>
                        <li>Share Preference page with friends/co-workers</li>
                        <li>Select preferences</li>
                        <li>Get results and view the suggested place.</li>
                    </ul>
                    <div>
                        <b>Created By:</b>
                        <b style={{fontFamily:"italic"}}> Lance Dinh,  Michael Crowell, Ben Brubaker, Adit Suvarna </b>
                    </div>
                </Container>
            </Segment>
        )
    }
}