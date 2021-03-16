import React, { Component } from "react";
import { Menu, Sidebar, Segment, Icon } from "semantic-ui-react";

const SidebarExampleVisible = () => (
  <Sidebar.Pushable>
    <Sidebar as={Menu} icon="labeled" inverted vertical visible width="wide">
      <Menu.Item as="a">
        <Icon name="home" />
        Dashboard
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="address card outline" />
        Application
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="file alternate outline" />
        Confirmation
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="users" />
        Team
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="log out" />
        Logout
      </Menu.Item>
    </Sidebar>
  </Sidebar.Pushable>
);

export default SidebarExampleVisible;
