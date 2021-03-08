import React, { Component } from "react";
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Button,
  Image,
} from "semantic-ui-react";
import DashMenu from "../Dashboard/Menu";
import DashWindow from "../Dashboard/DashWindow";
import ApplicationForm from "../Application/Application";

const DashboardDefault = () => (
  <div>
    <Grid celled="internally">
      <Grid.Column color="red" width={2}>
        <Image src="../../assets/images/logo.svg" />
        <DashMenu />
        <Container textAlign="center">HackOHI/O 2021</Container>
      </Grid.Column>
      <Grid.Column width={10}>
        <ApplicationForm />
      </Grid.Column>
    </Grid>
  </div>
);

export default DashboardDefault;
