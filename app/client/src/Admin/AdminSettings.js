import React from 'react';
import {
  Header,
  Segment,
  Container,
  Divider,
  Button,
  Form,
  List,
  Grid,
  Label,
  Input,
} from 'semantic-ui-react';
import useFetch from '../Utils/useFetch';

export default function AdminUsers() {
  return (
    <Container>
      <Segment>
        <Grid stackable>
          <Container textAlign="center" style={{ paddingTop: 25 }}>
            <Header size="huge">Settings</Header>
          </Container>

          <Grid.Column width={6}>
            <Form>
              <Header>Open/Close Registration</Header>
              <p>
                Users will be able to register new accounts within the time
                period specified.
              </p>
              <Form.Field>
                <label>
                  Opens: {/* {{ formatDate(settings.timeOpen) }} */}
                </label>
                <Form.Input
                  fluid
                  type="datetime-local"
                  className="settings-timeopen"
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Closes: {/* {{ formatDate(settings.timeClose) }} */}
                </label>
                <Form.Input
                  fluid
                  type="datetime-local"
                  className="settings-timeclose"
                />
              </Form.Field>
              <Button
                fluid
                color="green"
                type="submit"
                className="update-registration-window"
              >
                Update
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={6}>
            <Form>
              <Header>Open/Close Confirmation</Header>
              <p>
                Any users that are accepted will have to confirm by the date
                selected.
              </p>
              <Form.Field>
                <label>
                  Confirm By: {/* {{ formatDate(settings.timeConfirm) }} */}
                </label>
                <Form.Input
                  fluid
                  type="datetime-local"
                  className="settings-timeconfirm"
                />
              </Form.Field>
              <Button
                fluid
                color="green"
                type="submit"
                className="update-registration-window"
              >
                Update
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}
