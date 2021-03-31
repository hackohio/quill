import React from 'react';
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Button,
} from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';
import useApplicationCloseTime from '../Utils/useApplicationCloseTime';

const DashboardConfirmed = () => {
  const user = useCurrentUser();

  const submitted = user?.status.completedProfile ?? false;
  const confirmed = user?.confirmed ?? false;
  const verified = user?.verified ?? false;
  const confirmationDeadline = user?.status.confirmBy;
  const applicationDeadline = useApplicationCloseTime();

  return (
    <div>
      <Grid centered>
        <Grid.Column>
          <Header as="h1" textAlign="center">
            Dashboard
          </Header>

          <Segment textAlign="center">
            <Header as="h2" textAlign="center">
              Your Status:
            </Header>

            <Container>
              {confirmed ? (
                <Segment inverted color="purple">
                  <Header as="h3">Confirmed</Header>
                </Segment>
              ) : submitted ? (
                <Segment inverted color="blue">
                  <Header as="h3">Submitted</Header>
                </Segment>
              ) : verified ? (
                <Segment inverted color="green">
                  <Header as="h3">Verified</Header>
                </Segment>
              ) : (
                <Segment inverted color="grey">
                  <Header as="h3">Not Verified</Header>
                </Segment>
              )}
            </Container>

            <Divider />

            <Container>
              <Header as="h3">
                <strong>Welcome back, "Participant name"</strong>
              </Header>
              <br />
              <Container className="dashboard-window-information">
                {confirmed ? (
                  <Container>
                    <strong>
                      Confirmation Deadline: {confirmationDeadline}
                    </strong>
                    <br />
                    <strong>
                      You can edit your confirmation information until Friday,
                      March 5th 2021, 6:59 pm (Eastern). You will have access to
                      the discord platform to start forming teams and start
                      planning within 24 hrs of your application confirmation.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      Edit Confirmation
                    </Button>
                    <Button circular color="red">
                      Sorry, I can't make it
                    </Button>
                  </Container>
                ) : submitted ? (
                  <Container>
                    <strong>
                      Application Deadline:
                      {applicationDeadline != null &&
                        applicationDeadline.toUTCString()}
                    </strong>
                    <br />
                    <strong>
                      You can edit your application information until
                      'application deadline' (Eastern). You will have access to
                      the discord platform to start forming teams and start
                      planning within 24 hrs of your application confirmation.
                    </strong>
                  </Container>
                ) : verified ? (
                  <Container>
                    <strong>
                      Application Deadline:
                      {applicationDeadline != null &&
                        applicationDeadline.toUTCString()}
                    </strong>
                    <br />
                    <strong>
                      Please fill out the application under the application tab
                      on the left. The deadline to fill out the application is
                      'application deadline'
                    </strong>
                    <Divider />
                    <Button circular color="purple">
                      Complete Your Application
                    </Button>
                    <Button circular color="blue">
                      Edit Application
                    </Button>
                  </Container>
                ) : (
                  <Container>
                    <strong>Please Verify Email</strong>
                    <br />
                    <strong>
                      Please check your email and click the verify link so that
                      you can fill out the application.
                    </strong>
                    <Divider />
                    <Button circular color="green">
                      Resend Verification Email
                    </Button>
                  </Container>
                )}
              </Container>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default DashboardConfirmed;
