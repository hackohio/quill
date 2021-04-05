import React, { useCallback } from 'react';
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
import axios from 'axios';

const DashboardConfirmed = () => {
  const user = useCurrentUser();
  const months = new Map();
  months.set('1', 'January');
  months.set('2', 'Febuary');
  months.set('3', 'March');
  months.set('4', 'April');
  months.set('5', 'May');
  months.set('6', 'June');
  months.set('7', 'July');
  months.set('8', 'August');
  months.set('9', 'September');
  months.set('10', 'October');
  months.set('11', 'November');
  months.set('12', 'December');
  const submitted = user?.status.completedProfile ?? false;
  const confirmed = user?.confirmed ?? false;
  const verified = user?.verified ?? false;
  const confirmationDeadline = user?.status.confirmBy;
  const applicationDeadline = useApplicationCloseTime();
  const today = new Date();
  const getDateTimeString = DateTimeObj => {
    var result = '';
    result += months.get(String(DateTimeObj.getMonth())) + ' ';
    result += String(DateTimeObj.getDay()) + ' ';
    result += String(DateTimeObj.getFullYear());
    return result;
  };

  const getStatusBarColor = user => {
    var statusColor = user?.declined
      ? 'red'
      : user?.confirmed
      ? 'purple'
      : user?.submitted
      ? 'blue'
      : user?.verified
      ? 'green'
      : 'grey';
    return statusColor;
  };

  const getStatusBarText = user => {
    var statusText = user?.declined
      ? 'Declined'
      : user?.confirmed
      ? 'Confirmed'
      : user?.submitted
      ? 'Submitted'
      : user?.verified
      ? 'Verified'
      : 'Not Verified';
    return statusText;
  };

  const sendVerificationEmail = useCallback(() => {
    axios.post('/auth/verify/resend', {
      id: user.id,
    });
  }, [user]);

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
              <Segment inverted color={getStatusBarColor(user)}>
                <Header as="h3">{getStatusBarText(user)}</Header>
              </Segment>
            </Container>
            <Divider />

            <Container>
              <Header as="h3">
                <strong>
                  Welcome back, {user?.submitted ? user.profile.name : ''}
                </strong>
              </Header>
              <br />
              <Container className="dashboard-window-information">
                {confirmed ||
                (submitted && !confirmed && confirmationDeadline > today) ? (
                  <Container>
                    <strong>
                      Confirmation Deadline:{' '}
                      {getDateTimeString(confirmationDeadline)}
                    </strong>
                    <br />
                    <strong>
                      You can {confirmed ? 'Edit ' : 'Submit '} your
                      confirmation information until
                      {getDateTimeString(confirmationDeadline)}, after which you
                      will only be able to view your confirmation information.
                      You will have access to the discord platform to start
                      forming teams and start planning within 24 hrs of your
                      application confirmation.
                    </strong>
                    <Divider />
                    <Button circular color="green">
                      {confirmationDeadline < today
                        ? 'View '
                        : confirmed
                        ? 'Edit '
                        : 'Submit '}
                      Confirmation
                    </Button>
                    <Button circular color="red">
                      Sorry, I cannot make it
                    </Button>
                    <Divider />
                  </Container>
                ) : submitted && !confirmed && confirmationDeadline < today ? (
                  <Container>
                    <strong>You are not confirmed.</strong>
                    <br />
                    <strong>
                      You did not fill out the confirmation form before the
                      deadline.
                    </strong>
                  </Container>
                ) : (submitted && applicationDeadline < today) ||
                  applicationDeadline > today ? (
                  <Container>
                    <strong>
                      Application Deadline:{' '}
                      {getDateTimeString(applicationDeadline)}.
                    </strong>
                    <br />
                    <strong>
                      You can {submitted ? 'Edit ' : 'Submit '} your application
                      until {getDateTimeString(applicationDeadline)}, after
                      which you will only be able to view your application
                      information.{' '}
                      {submitted
                        ? `Now that you
                      have submitted your application, we will notify you when
                      confirmation opens. When that happens, please be sure to
                      fill out confirmation as soon as you can so we can make
                      sure we have enough space for you and your team. You can
                      view your application information below. `
                        : ''}
                    </strong>
                    <Divider />
                    <Button circular color="blue">
                      {applicationDeadline < today
                        ? 'View '
                        : submitted
                        ? 'Edit '
                        : 'Submit '}
                      Application
                    </Button>
                    <Button circular color="red">
                      Sorry, I cannot make it
                    </Button>
                  </Container>
                ) : verified && !submitted && applicationDeadline < today ? (
                  <Container>
                    <strong>You did not submit your application.</strong>
                    <br />
                    <strong>
                      You did not submit your application before the deadline.
                    </strong>
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
                    <Button
                      onClick={sendVerificationEmail}
                      circular
                      color="blue"
                    >
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
