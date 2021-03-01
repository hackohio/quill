import React, { Component } from "react";
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Button,
} from "semantic-ui-react";

const DashboardConfirmed = () => (
  <div>
    <Grid centered>
      <Grid.Column style={{ maxWidth: 700, marginTop: 175 }}>
        <Header as="h1" textAlign="center">
          Dashboard
        </Header>
        <Segment textAlign="center">
          <Header as="h2" textAlign="center">
            Your Status:
          </Header>
          <Container>
            <Segment inverted color="purple">
              <Header as="h3">Confirmed</Header>
            </Segment>
          </Container>
          <Divider />
          <Container>
            <Header as="h3">
              <strong>Welcome back, "Participant name"</strong>
            </Header>
            <strong>Registration Deadline:</strong>
            <br />
            <strong>Confirmation Deadline:</strong>
            <br />
            <strong>
              You can edit your confirmation information until Friday, March 5th
              2021, 6:59 pm (Eastern). You will have access to the discord
              platform to start forming teams and start planning within 24 hrs
              of your application confirmation.{" "}
            </strong>
          </Container>
          <Divider />
          <Button circular color="blue">
            Edit Confirmation
          </Button>
          <Button circular color="red">
            Sorry, I can't make it
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
);

export default DashboardConfirmed;
