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
                        <p>This is a solution for people in groups that need to decide to get food based off multiple people's opinion. It gathers everyones opinion so that the poll creator can determine what type of food to get.</p>
                        <p>Firebase is used as the "back-end", so results come in live. Geolocation is used to find suggested places near you (Using Google places API). </p>
                        <p>There is also mobile apps for this application for both IOS and Android. It is developed, but I need to do some refining and see if its worth releasing.</p>
                    </ul>
                    <div>
                        <Button as='a' href="https://github.com/blance97/foodpoll" inverted color='black' content='View Code' icon='github' labelPosition='left' />
                    </div>
                    <h2 style={{ textAlign: "left" }}>Flow: </h2>
                    <ul style={{ textAlign: "left" }}>
                        <li>Create Poll(Survey)</li>
                        <li>Copy Link</li>
                        <li>Send link to friends/co-workers</li>
                        <li>Vote on food and select preference</li>
                        <li>Get results and view suggested places to get food</li>
                    </ul>
                </Container>
            </Segment>
        )
    }
}