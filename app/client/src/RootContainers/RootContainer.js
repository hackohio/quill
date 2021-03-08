import React, { Component } from "react";
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Button,
} from "semantic-ui-react";
import DashMenu from "../Dashboard/Menu";
import DashWindow from "../Dashboard/DashWindow";
import ApplicationForm from "../Application/Application";

const DashboardDefault = () => (
  <div>
    <Grid columns={3}>
      <Grid.Column>
        <DashMenu />
      </Grid.Column>
      <Grid.Column>
        <ApplicationForm />
      </Grid.Column>
    </Grid>
  </div>
);

export default DashboardDefault;
