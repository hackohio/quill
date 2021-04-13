import React, { Component, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';

export default function MenuExampleVerticalSecondary() {
  const [activeItem, setActiveitem] = useState('home');

  const handleItemClick = useCallback((e, { name }) => setActiveitem(name), [
    setActiveitem,
  ]);

  const user = useCurrentUser();

  const submitted = user?.status.completedProfile ?? false;
  const verified = user?.verified ?? false;
  const isAdmin = user?.admin ?? false;

  return (
    <Menu color="red" pointing secondary vertical>
      <Link to="/dashboard">
        <Menu.Item
          name="Dashboard"
          active={activeItem === 'dashboard'}
          onClick={handleItemClick}
        />
      </Link>
      {verified ? (
        <Container>
          <Link to="/application">
            <Menu.Item
              name="Application"
              active={activeItem === 'application'}
              onClick={handleItemClick}
            />
          </Link>
          {submitted ? (
            <>
              <Link to="/confirmation">
                <Menu.Item
                  name="Confirmation"
                  active={activeItem === 'confirmation'}
                  onClick={handleItemClick}
                />
              </Link>
              {isAdmin ? (
                <Link to="/admin">
                  <Menu.Item
                    name="Admin"
                    active={activeItem === 'admin'}
                    onClick={handleItemClick}
                  />
                </Link>
              ) : (
                <div />
              )}
            </>
          ) : (
            <div />
          )}
        </Container>
      ) : (
        <div />
      )}

      <Link to="/logout">
        <Menu.Item
          name="Logout"
          active={activeItem === 'logout'}
          onClick={handleItemClick}
        />
      </Link>
    </Menu>
  );
}
