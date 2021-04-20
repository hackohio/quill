import React, { Component, useCallback, useState } from 'react';
import { Header, Container, Menu } from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';
import AdminStats from './AdminStats';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
export default function AdminBoard() {
  const [activeItem, setActiveitem] = useState('Stats');

  const handleItemClick = useCallback((e, { name }) => setActiveitem(name), [
    setActiveitem,
  ]);

  const user = useCurrentUser();

  return (
    <div>
      <Container textAlign="center">
        <Header as="h1">Admin</Header>
      </Container>
      <Menu widths={3}>
        <Menu.Item
          name="Stats"
          active={activeItem === 'Stats'}
          onClick={handleItemClick}
        ></Menu.Item>
        <Menu.Item
          name="Users"
          active={activeItem === 'Users'}
          onClick={handleItemClick}
        ></Menu.Item>
        <Menu.Item
          name="Settings"
          active={activeItem === 'Settings'}
          onClick={handleItemClick}
        ></Menu.Item>
      </Menu>
      {activeItem == 'Stats' ? (
        <AdminStats />
      ) : activeItem == 'Users' ? (
        <AdminUsers />
      ) : activeItem == 'Settings' ? (
        <AdminSettings />
      ) : null}
    </div>
  );
}
