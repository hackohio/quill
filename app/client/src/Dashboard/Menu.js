import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuExampleVerticalPointing extends Component {
  state = { activeItem: "Dashboard" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing vertical>
        <Menu.Item
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Application"
          active={activeItem === "Application"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Team"
          active={activeItem === "Team"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Confirmation"
          active={activeItem === "Confirmation"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
