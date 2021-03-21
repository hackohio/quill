import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

export default class MenuExampleVerticalSecondary extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const submitted = true;
    const verified = true;
    return (
      <Menu color="red" pointing secondary vertical>
        <Link to="/dashboard">
          <Menu.Item
            name="Dashboard"
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
          />
        </Link>
        {submitted ? (
          <Container>
            <Link to="/application">
              <Menu.Item
                name="Application"
                active={activeItem === "application"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to="/confirmation">
              <Menu.Item
                name="Confirmation"
                active={activeItem === "confirmation"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to="/team">
              <Menu.Item
                name="Team"
                active={activeItem === "team"}
                onClick={this.handleItemClick}
              />
            </Link>
          </Container>
        ) : verified ? (
          <Link to="/application">
            <Menu.Item
              name="Application"
              active={activeItem === "application"}
              onClick={this.handleItemClick}
            />
          </Link>
        ) : (
          <div />
        )}

        <Link to="/logout">
          <Menu.Item
            name="Logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Link>
      </Menu>
    );
  }
}
