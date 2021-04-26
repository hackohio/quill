import React, { useCallback } from 'react';
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
  Dimmer,
  Loader,
  Image,
  Icon,
  Button,
  Modal,
} from 'semantic-ui-react';

import fetchUsers from '../Utils/fetchUsers';
import UserModal from './UserModal';
import Application from '../Application/Application';

export default function AdminUsers() {
  const [open, setOpen] = React.useState(false);
  //fetch an array of all of the users to be used to display to the page
  const users = fetchUsers();

  return (
    <div>
      {!users ? (
        <Segment>
          <Dimmer active>
            <Loader size="large" indeterminate>
              Fetching Stats
            </Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        <Container>
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
                    <Table.HeaderCell>Edit User</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {users.map(selectedUser => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          {selectedUser.profile.name
                            ? selectedUser.profile.name
                            : selectedUser.email}
                        </Table.Cell>
                        <Table.Cell>{selectedUser.email}</Table.Cell>
                        <Table.Cell>
                          {selectedUser.profile.school
                            ? selectedUser.profile.school
                            : 'No School'}
                        </Table.Cell>
                        <Table.Cell>
                          {selectedUser.profile.major
                            ? selectedUser.profile.major
                            : 'No Major'}
                        </Table.Cell>
                        <Table.Cell>
                          {selectedUser.profile.graduationMonth
                            ? selectedUser.profile.graduationMonth
                            : 'No Graduation Month'}
                        </Table.Cell>
                        <Table.Cell>
                          {selectedUser.profile.graduationYear
                            ? selectedUser.profile.graduationYear
                            : 'No Graduation Year'}
                        </Table.Cell>
                        <Table.Cell>
                          {selectedUser.verified ? (
                            <Icon color="green" name="check circle" />
                          ) : (
                            <Icon color="red" name="close" />
                          )}
                          {selectedUser.status.completedProfile ? (
                            <Icon color="green" name="check circle" />
                          ) : (
                            <Icon color="red" name="close" />
                          )}
                          {selectedUser.status.admitted ? (
                            <Icon color="green" name="check circle" />
                          ) : selectedUser.status.declined ? (
                            <Icon color="red" name="close" />
                          ) : (
                            <Icon name="circle" />
                          )}
                          {selectedUser.status.confirmed ? (
                            <Icon color="green" name="check circle" />
                          ) : selectedUser.status.declined ? (
                            <Icon color="red" name="close" />
                          ) : (
                            <Icon name="circle" />
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={
                              <Button
                                circular
                                color="green"
                                icon="edit outline"
                              ></Button>
                            }
                          >
                            <UserModal selectedUser={selectedUser} />
                            <Modal.Actions>
                              <Button primary fluid circular type="submit">
                                Update User
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Container>
      )}
    </div>
  );
}
