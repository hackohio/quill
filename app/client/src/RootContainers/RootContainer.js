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
import ConfirmationForm from "../Confirmation/confirmation";

const DashboardDefault = () => (
  <div>
    <Grid>
      <Grid.Column color="red" width={2}>
        <Image src="../../assets/images/logo.svg" />
        <DashMenu />
        <Container textAlign="center">HackOHI/O 2021</Container>
      </Grid.Column>
      <Grid.Column width={4} />
      <Grid.Column style={{ marginTop: 100 }} textAlign="left" width={5}>
        <ConfirmationForm />
      </Grid.Column>
    </Grid>
  </div>
);

export default DashboardDefault;
