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

const USER_URL = '/users';

const fetchUsers = USER_URL => {
  const usersArray = useFetch(USER_URL);
  if (usersArray.STATUS != STATUS.FETCHED) {
    return null;
  }
  return usersArray.data;
};

export default function AdminUsers() {
  //fetch an array of all of the users to be used to display to the page
  const users = fetchUsers();
  console.log(users);
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
            <Container>
              <Header size="huge"> Users </Header>
            </Container>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>School</Table.HeaderCell>
                  <Table.HeaderCell>Major</Table.HeaderCell>
                  <Table.HeaderCell>Grad Month</Table.HeaderCell>
                  <Table.HeaderCell>Grad Year</Table.HeaderCell>
                  <Table.HeaderCell>V/S/A/C</Table.HeaderCell>
                  <Table.HeaderCell>Link</Table.HeaderCell>
                  <Table.HeaderCell>Make Admin</Table.HeaderCell>
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
