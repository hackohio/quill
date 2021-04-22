import React from 'react';
import {
  Header,
  Segment,
  Container,
  Divider,
  Form,
  Grid,
  Input,
  Pagination,
  Table,
} from 'semantic-ui-react';
import useFetch, { STATUS } from '../Utils/useFetch';

export default function AdminUsers() {
  //fetch an array of all of the users to be used to display to the page
  const users = [];
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
            <Divider />
            <Container textAlign="center">
              <Pagination defaultActivePage={1} totalPages={10} />
            </Container>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Users</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  {/*{users.forEach(selectedUser => {
                    return (
                      <Table.Cell>
                        {selectedUser.profile.name
                          ? selectedUser.profile.name
                          : selectedUser.email}
                      </Table.Cell>
                    );
                  })} */}
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}
