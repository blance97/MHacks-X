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
                        <p>Anytime a group of friends gets together to eat, they inevitably do some form of social dance when it comes to picking where to eat. No one person wants to step on the toes of others, which causes those people to instead defer to others to make the decision for them. Rather than continue this frustrating dance that often ends up with few people satisfied, we sought to provide a simple, easy utility that makes navigating these conflicts of interest trivial.</p>

                    </ul>
                    <div>
                        <Header as='h2' style={{ color: "white" }}>Technologies Used</Header>
                        <ul>
                            <li>React</li>
                            <li>Flask</li>
                            <li>TensorFlow</li>
                            <li>Firebase</li>
                            <li>MongoDB</li>
                            <li>Heroku</li>
                        </ul>
                    </div>
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
                        <p>Broadly, our service is an web application that allows users to create shareable polls that survey the food preferences of link holders and displays the running results, using these results to eventually drive an AI that provides recommendations on where to eat. These results are only displayed with context to the group, not with details about individuals, thereby avoiding the aforementioned social balancing act. In doing so, Foodphoria looks to bring the joy back to eating out with your friends.</p>
                        <Divider />
                        <b>Created By:</b>
                        <b style={{ fontFamily: "italic" }}> Lance Dinh,  Michael Crowell, Ben Brubaker, Adit Suvarna </b>
                    </div>
                </Container>
            </Segment >
        )
    }
}