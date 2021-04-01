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
                {confirmed && confirmationDeadline ? (
                  <Container>
                    <strong>
                      Confirmation Deadline: {confirmationDeadline}
                    </strong>
                    <br />
                    <strong>
                      Thank you for confirming your spot! You can view you
                      confirmation details below.
                    </strong>
                    <Button circular color="green">
                      View Confirmation Info
                    </Button>
                    <Divider />
                  </Container>
                ) : confirmed && !confirmationDeadline ? (
                  <Container>
                    <strong>
                      Confirmation Deadline: {confirmationDeadline}
                    </strong>
                    <br />
                    <strong>
                      You can edit your confirmation information until Friday,
                      {confirmationDeadline}. You will have access to the
                      discord platform to start forming teams and start planning
                      within 24 hrs of your application confirmation.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      Edit Confirmation
                    </Button>
                    <Button circular color="red">
                      Sorry, I can't make it
                    </Button>
                  </Container>
                ) : submitted && !confirmed && confirmationDeadline ? (
                  <Container>
                    <strong>You are not confirmed.</strong>
                    <br />
                    <strong>
                      You did not fill out the confirmation form before the
                      deadline.
                    </strong>
                  </Container>
                ) : submitted && !confirmed && !confirmationDeadline ? (
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
                      Submit Confirmation
                    </Button>
                    <Button circular color="red">
                      Sorry, I can't make it
                    </Button>
                  </Container>
                ) : verified && submitted && applicationDeadline ? (
                  <Container>
                    <strong>You have submitted your application.</strong>
                    <br />
                    <strong>
                      Now that you have submitted your application, we will
                      notify you when confirmation opens. When that happens,
                      please be sure to fill out confirmation as soon as you can
                      so we can make sure we have enough space for you and your
                      team. You can view your application information below.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      View Application Info
                    </Button>
                  </Container>
                ) : verified && submitted && !applicationDeadline ? (
                  <Container>
                    <strong>Thank you for submitting your application.</strong>
                    <br />
                    <strong>
                      Now that you have submitted your application, we will
                      notify you when confirmation opens. When that happens,
                      please be sure to fill out confirmation as soon as you can
                      so we can make sure we have enough space for you and your
                      team. You can edit your application information below.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      Edit Application
                    </Button>
                  </Container>
                ) : verified && !submitted && applicationDeadline ? (
                  <Container>
                    <strong>You did not submit your application.</strong>
                    <br />
                    <strong>
                      You did not submit your application before the deadline.
                    </strong>
                  </Container>
                ) : verified && !submitted && !applicationDeadline ? (
                  <Container>
                    <strong>
                      You have not submitted your application yet.
                    </strong>
                    <br />
                    <strong>
                      Please click on the application button on the left or down
                      below to fill out the application.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      Submit Application
                    </Button>
                  </Container>
                ) : (
                  <Container>
                    <strong>You have not verified your email yet.</strong>
                    <br />
                    <strong>
                      Please click on the link in the email that we sent you. If
                      you do not see one, check your spam and/or click the
                      resend email button.
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      Resend Verificaiton Email
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
