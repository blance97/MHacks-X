import React, { Component } from 'react';
import { Icon, Menu, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'gamepad' }
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(e, data) {
        this.setState({ activeItem: data.name })

    }
    render() {
        const { activeItem } = this.state
        return (

            <div style={{ marginBottom: 25 }}>
                <Menu size='large'>
                    <Menu.Item as={Link} to="/">
                        <Icon name='home' size="large" />
                        <text>Home</text>
                    </Menu.Item>

                    <Menu.Item as={Link} to="/about">
                        <Icon name='question circle' size="large" />
                        <text>About</text>
                    </Menu.Item>

                    <Menu.Item as={Link} to= {`/pref/${shortid.generate()}`}> 
                        <Icon name="add" size="large" />
                        Create New Poll
                    </Menu.Item>
                </Menu>
                <Divider fitted />
            </div>
        )
    }
}