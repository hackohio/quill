import React, { SyntheticEvent } from "react";
import {
  Form,
  Button,
  Dropdown,
  Grid,
  Segment,
  Header,
  TextArea,
  Container,
  Checkbox,
} from "semantic-ui-react";
const months = [
  { key: "Jan", text: "Janurary", value: "Janurary" },
  { key: "Feb", text: "Feburary", value: "Feburary" },
  { key: "Mar", text: "March", value: "March" },
  { key: "April", text: "April", value: "April" },
  { key: "May", text: "May", value: "May" },
  { key: "Jun", text: "June", value: "June" },
  { key: "Jul", text: "July", value: "July" },
  { key: "Aug", text: "August", value: "August" },
  { key: "Sept", text: "September", value: "September" },
  { key: "Oct", text: "October", value: "October" },
  { key: "Nov", text: "November", value: "November" },
  { key: "Dec", text: "December", value: "December" },
];

const degrees = [
  { key: "Assoc", text: "Associate's", value: "Associate's" },
  { key: "Bach", text: "Bachleor's", value: "Bachleor's" },
  { key: "Mas", text: "Master's", value: "Master's" },
  { key: "Doc", text: "Doctorate", value: "Doctorate" },
];

const gradYears = [
  { key: "2021", text: "2021", value: "2021" },
  { key: "2022", text: "2022", value: "2022" },
  { key: "2023", text: "2023", value: "2023" },
  { key: "2024", text: "2024", value: "2024" },
];

const genders = [
  { key: "male", text: "Male", value: "Male" },
  { key: "female", text: "Female", value: "Female" },
  { key: "Non-Binary", text: "Non-Binary", value: "Non-Binary" },
  { key: "other", text: "Other", value: "Other" },
  {
    key: "No Answer",
    text: "I prefer not to answer",
    value: "Prefer not to answer",
  },
];

const race = [
  { key: "Native", text: "American Indian/Alaskan Native", value: "Native" },
  { key: "Asian", text: "Asian", value: "Asian" },
  {
    key: "Black or African American",
    text: "Black or African American",
    value: "Black or African American",
  },
  { key: "Hispanic", text: "Hispanic", value: "Hispanic" },
  { key: "White", text: "White", value: "White" },
  {
    key: "Native Hawaiian/Pacific Islander",
    text: "Native Hawaiian/Pacific Islander",
    value: "Native Hawaiian/Pacific Islander",
  },
  {
    keu: "Non-Resident Alien",
    text: "Non-Resident Alien",
    value: "Non-Resident Alien",
  },
  {
    key: "Two or more races",
    text: "Two or more races",
    value: "Two or more races",
  },
  {
    key: "Choose not to disclose",
    text: "Choose not to disclose",
    value: "Choose not to disclose",
  },
];

const ApplicationForm = () => (
  <Grid centered>
    <Grid.Column style={{ marginTop: 100 }}>
      <Container textAlign="center">
        <Header size="huge">Application</Header>
      </Container>
      <Segment>
        <Form>
          <Form.Field>
            <Form.Input
              placeholder="School Email"
              label="Email"
              name="email"
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Full Name"
              label="Name"
              name="name"
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <Form.Input
              re
              placeholder="School"
              label="School"
              name="school"
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <Form.Input
              placeholder="Major"
              label="Major"
              name="major"
            ></Form.Input>
          </Form.Field>
          <Header>Anticipated Graduation</Header>
          <Form.Field required>
            <Dropdown fluid selection placeholder="Year" options={gradYears} />
          </Form.Field>
          <Form.Field required>
            <Dropdown fluid selection placeholder="Month" options={months} />
          </Form.Field>
          <Form.Field required>
            <Dropdown
              fluid
              selection
              placeholder="Anticipated Degree"
              options={degrees}
            />
          </Form.Field>
          <Header size="small">Gender</Header>
          <Form.Field required>
            <Dropdown fluid selection placeholder="Gender" options={genders} />
          </Form.Field>
          <Header size="small">Race/Ethnicity</Header>
          <Form.Field required>
            <Dropdown
              fluid
              selection
              placeholder="Race/Ethnicity"
              options={race}
            />
          </Form.Field>
          <Form.Field>
            <Header size="small">I would descirbe myself as...</Header>
            <Form.Input placeholder="Designer, Developer, Data Scientist, iOS Wizard, Hacker Extraordinaire"></Form.Input>
          </Form.Field>
          <Form.Field>
            <Header size="small">
              What would you like to learn or get out of HackOHI/O? (optional)
            </Header>
            <TextArea placeholder="Tell us more" />
          </Form.Field>
          <Form.Field required>
            <p>
              Because of limitations imposed by OSU, we are not legally allowed
              to host non-OSU undergraduate minors (those under 18) for
              MakeOHI/O 2021. Checking the box below affirms that you are or
              will be either an OSU undergraduate or 18 years or older by March
              5, 2021.
            </p>
            <Checkbox label="I am 18 or older"></Checkbox>
          </Form.Field>
          <Button primary fluid circular type="submit">
            Submit
          </Button>
        </Form>
      </Segment>
    </Grid.Column>
  </Grid>
);

export default ApplicationForm;
