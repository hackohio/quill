import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuExampleVerticalSecondary extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu color="red" pointing secondary vertical>
        <Menu.Item
          name="Dashboard"
          active={activeItem === "dashboard"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Application"
          active={activeItem === "application"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Confirmation"
          active={activeItem === "confirmation"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Team"
          active={activeItem === "team"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Logout"
          active={activeItem === "logout"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
