import React, { Component, useCallback, useState } from 'react';
import {
  Header,
  Segment,
  Container,
  Divider,
  Button,
  Menu,
  Form,
  List,
} from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';

export default function AdminBoard() {
  const [activeItem, setActiveitem] = useState('stats');

  const handleItemClick = useCallback((e, { name }) => setActiveitem(name), [
    setActiveitem,
  ]);

  const user = useCurrentUser();

  return (
    <div>
      <Container textAlign="center">
        <Header size="huge">Admin</Header>
      </Container>

      <Menu widths={3}>
        <Menu.Item
          name="Stats"
          active={activeItem === 'admin'}
          onClick={handleItemClick}
        ></Menu.Item>
        <Menu.Item
          name="Users"
          active={activeItem === 'users'}
          onClick={handleItemClick}
        ></Menu.Item>
        <Menu.Item
          name="Settings"
          active={activeItem === 'settings'}
          onClick={handleItemClick}
        ></Menu.Item>
      </Menu>
      <Container>
        <Segment>
          <Container textAlign="center">Download Data</Container>
          <Container style={{ width: 250 }}>
            <Form method="get">
              <Button circular fluid primary type="submit">
                Export CSV Data
              </Button>
            </Form>
          </Container>
        </Segment>
      </Container>
      <Container className="stats-container">
        <Segment>
          <Header size="large">Stats</Header>

          <List className="stats-list">
            <List.Item>
              <List.Icon name="users" />
              <List.Content>
                <strong>Total Users</strong> :{/* {{stats.total}} */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="check circle outline" />
              <List.Content>
                <strong>Verified Users</strong> :
                {/* {{stats.verified}}
            ({{stats.verified / stats.total * 100 | number: 1}}%) */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="check circle outline" />
              <List.Content>
                <strong>Submitted Users</strong> :
                {/*{{stats.submitted}}
            ({{stats.submitted / stats.total * 100 | number: 1}}%) */}
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="check circle outline" />
              <List.Content>
                <strong>Admitted Users</strong> :{/* {{stats.admitted}} */}
              </List.Content>
            </List.Item>
            <Divider />
            <List.Item>
              <List.Icon name="check circle outline" />
              <List.Content>
                <strong>Confirmed (Total) Users</strong> :
                {/* {{stats.confirmed}} */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="check circle outline" />
              <List.Content>
                <strong>Confirmed (OSU) Users</strong> :
                {/* {{stats.confirmedOsu}} */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="cancel" />
              <List.Content>
                <strong>Declined Users</strong> :{/* {{stats.declined}} */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="flag checkered" />
              <List.Content>
                <strong>Checked in</strong> :{/* {{stats.checkedIn}} */}
              </List.Content>
            </List.Item>
            <Divider />
            <List.Item>
              <List.Icon name="child" />
              <List.Content>
                <strong>Unisex shirt sizes</strong> :
                {/* XS ({{stats.shirtSizes['XS']}})
            S ({{stats.shirtSizes['S']}})
            M ({{stats.shirtSizes['M']}})
            L ({{stats.shirtSizes['L']}})
            XL ({{stats.shirtSizes['XL']}}) */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="child" />
              <List.Content>
                <strong>Women's shirt sizes</strong> :
                {/* XS ({{stats.shirtSizes['WXS']}})
            S ({{stats.shirtSizes['WS']}})
            M ({{stats.shirtSizes['WM']}})
            L ({{stats.shirtSizes['WL']}})
            XL ({{stats.shirtSizes['WXL']}})
            XXL ({{stats.shirtSizes['WXXL']}}) */}
              </List.Content>
            </List.Item>
            <Divider />
            <List.Item>
              <List.Icon name="plug" />
              <List.Content>
                <strong>Needs/Wants Hardware</strong> :
                {/* {{stats.wantsHardware}} */}
              </List.Content>
            </List.Item>
            <Divider />
            <List.Item>
              <List.Icon name="food" />
              <List.Content>
                <strong>Dietary Restrictions</strong> :
                {/* stats.dietaryRestrictions.map(restriction =>{
                  <p> {{restriction.name}}: ({{restiction.count}}) </p>
                }) */}
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <Segment>
          <Header size="large">Demographics</Header>
          <List>
            <List.Item>
              <List.Icon name="users" />
              <List.Content>
                <strong>
                  Total {/* {{stats.demoSummary.basedOff}} */} users
                </strong>
                :{/* {{stats.demoSummary.count}} */}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="female" />
              <List.Content>
                <strong>Female {/* {{stats.demo.gender['F']}} */} </strong>
                :(
                {/* {{stats.demo.gender['F'] / stats.demoSummary.count * 100 |
          number:1}}*/}
                %)
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="male" />
              <List.Content>
                <strong>Male {/* {{stats.demo.gender['M']}} */} </strong>
                :(
                {/* {{stats.demo.gender['M'] / stats.demoSummary.count * 100 |
          number:1}}*/}
                %)
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="non binary transgender" />
              <List.Content>
                <strong>Non-Binary {/* {{stats.demo.gender['B']}} */}</strong>
                :(
                {/* {{stats.demo.gender['B'] / stats.demoSummary.count * 100 |
          number:1}}*/}
                %)
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="other gender" />
              <List.Content>
                <strong>Other {/* {{stats.demo.gender['O']}} */} </strong>
                :(
                {/* {{stats.demo.gender['O'] / stats.demoSummary.count * 100 |
          number:1}}*/}
                %)
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="question" />
              <List.Content>
                <strong>
                  Did Not Respond {/* {{stats.demo.gender['N']}} */}{' '}
                </strong>
                :(
                {/* {{stats.demo.gender['N'] / stats.demoSummary.count * 100 |
          number:1}}*/}
                %)
              </List.Content>
            </List.Item>
            <Divider />
          </List>
          <List>
            <List.Item>
              <strong>Fresh:</strong> {/* {{stats.demo.year['2025']}} */}(
              {/* {{stats.demo.year['2025'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>

            <List.Item>
              <strong>Soph:</strong> {/* {{stats.demo.year['2024']}} */}(
              {/* {{stats.demo.year['2024'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>

            <List.Item>
              <strong>Junior:</strong> {/* {{stats.demo.year['2023']}} */}(
              {/* {{stats.demo.year['2023'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>

            <List.Item>
              <strong>Senior:</strong> {/* {{stats.demo.year['2022']}} */}(
              {/* {{stats.demo.year['2022'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
            <List.Item>
              <strong>Graduating this year:</strong>{' '}
              {/* {{stats.demo.year['2022']}} */}(
              {/* {{stats.demo.year['2022'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
          </List>
          <Divider />
          <List>
            <List.Item>
              <strong>Associate's:</strong>{' '}
              {/* {{stats.demo.degree['Associates']}} */}(
              {/* {{stats.demo.degree['Associates'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
            <List.Item>
              <strong>Bachelor's:</strong>{' '}
              {/* {{stats.demo.degree['Bachelors']}} */}(
              {/* {{stats.demo.degree['Bachelors'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
            <List.Item>
              <strong>Master's:</strong>{' '}
              {/* {{stats.demo.degree['Masters']}} */}(
              {/* {{stats.demo.degree['Masters'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
            <List.Item>
              <strong>Doctorate:</strong>{' '}
              {/* {{stats.demo.degree['Doctorate']}} */}(
              {/* {{stats.demo.degree['Doctorate'] / stats.demoSummary.count * 100 | number:
        1}} */}
              %)
            </List.Item>
          </List>
          <Divider />
          <List>
            <List.Item>
              <List.Content>
                {/* 
                stats.demo.schools.map(school =>{
                  
                  <strong>{{school.email}}</strong> : {{school.count}}
                  ({{school.count / stats.demoSummary.count * 100 | number: 1}}%)
                  <p>
                    <Label color="purple" size="mini">
                      Submitted: {{school.stats.submitted}}
                    </Label>
                    <Label color="pink" size="mini">
                      Admitted: {{school.stats.admitted}}
                    </Label>
                    <Label color="green" size="mini">
                      Confirmed: {{school.stats.confirmed}}
                    </Label>
                    <Label color="red" size="mini">
                      Declined: {{school.stats.declined}}
                    </Label>
                  </p>
                <Divider />
                })
              */}
              </List.Content>
            </List.Item>
          </List>
          <List>
            <List.Item>
              <List.Content>
                {/* 
                  stats.demo.majors.map(major =>{
                    <strong>{{major.name}}</strong> : {{major.count}}
                    ({{major.count / stats.demoSummary.count * 100 | number: 1}}%)
                  })
                */}
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
    </div>
  );
}
