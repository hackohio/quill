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
  Icon,
  Input,
  Pagination,
  Table,
  Label,
} from 'semantic-ui-react';
import useFetch from '../Utils/useFetch';
import useCurrentUser from '../Utils/useCurrentUser';

export default function AdminUsers() {
  return (
    <Container>
      <Segment>
        <Grid stackable>
          <Grid.Column>
            <Header>Search</Header>
            <Form>
              <Form.Field>
                <label> Participant</label>
                <Input icon="search" placeholder="Search..." />
              </Form.Field>
            </Form>
            <Pagination defaultActivePage={1} totalPages={10} />
            <Divider />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Users</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    User Email
                    {/*{{selectedUser.profile.name ? selectedUser.profile.name : selectedUser.email}}*/}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}
