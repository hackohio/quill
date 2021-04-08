import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Grid, Container, Divider, Image } from 'semantic-ui-react';
import DashMenu from '../Dashboard/Menu';
import DashWindow from '../Dashboard/DashWindow';
import ApplicationForm from '../Application/Application';
import ConfirmationForm from '../Confirmation/confirmation';
import AdminBoard from '../Admin/Admin';

const DashboardDefault = () => (
  <div>
    <Router>
      <Grid stackable>
        <Grid.Column color="red" width={3}>
          <Image src="../../assets/images/logo.svg" />
          <Divider />
          <DashMenu />
          <Container textAlign="center">HackOHI/O 2021</Container>
        </Grid.Column>
        <Grid.Column width={4} />
        <Grid.Column style={{ marginTop: 100 }} textAlign="left" width={5}>
          <Switch>
            <Route path="/dashboard">
              <DashWindow />
            </Route>
            <Route path="/application">
              <ApplicationForm />
            </Route>
            <Route path="/confirmation">
              <ConfirmationForm />
            </Route>
            <Route path="/admin">
              <AdminBoard />
            </Route>
            <Route path="/team"></Route>
            <Route path="/logout"></Route>
          </Switch>
        </Grid.Column>
      </Grid>
    </Router>
  </div>
);

export default DashboardDefault;
