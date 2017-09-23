import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
    constructor(props){
      super(props);
      this.state = { activeItem: 'gamepad' }
      this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(e, data){
        this.setState({activeItem: data.name})

    }  
    render() {
        const { activeItem } = this.state
        return (
            <Menu icon='labeled'>
                <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}>
                    <Icon name='gamepad' />
                    Games
            </Menu.Item>

                <Menu.Item name='video camera' active={activeItem === 'video camera'} onClick={this.handleItemClick}>
                    <Icon name='video camera' />
                    Channels
            </Menu.Item>

                <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
                    <Icon name='video play' />
                    Videos
            </Menu.Item>
            </Menu>
        )
    }
}