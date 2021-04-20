import axios from 'axios';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Dropdown,
  Header,
  TextArea,
  Container,
  Checkbox,
} from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';
import useToggle from '../Utils/useToggle';
import MajorSelector from './MajorSelector';
import SchoolSelector from './SchoolSelector';
import swal from 'sweetalert';

const months = [
  { key: 'Jan', text: 'Janurary', value: 'Janurary' },
  { key: 'Feb', text: 'Feburary', value: 'Feburary' },
  { key: 'Mar', text: 'March', value: 'March' },
  { key: 'April', text: 'April', value: 'April' },
  { key: 'May', text: 'May', value: 'May' },
  { key: 'Jun', text: 'June', value: 'June' },
  { key: 'Jul', text: 'July', value: 'July' },
  { key: 'Aug', text: 'August', value: 'August' },
  { key: 'Sept', text: 'September', value: 'September' },
  { key: 'Oct', text: 'October', value: 'October' },
  { key: 'Nov', text: 'November', value: 'November' },
  { key: 'Dec', text: 'December', value: 'December' },
];

const degrees = [
  { key: 'Assoc', text: "Associate's", value: 'Associates' },
  { key: 'Bach', text: "Bachelor's", value: 'Bachelors' },
  { key: 'Mas', text: "Master's", value: 'Masters' },
  { key: 'Doc', text: 'Doctorate', value: 'Doctorate' },
];

const gradYears = [
  { key: '2021', text: '2021', value: '2021' },
  { key: '2022', text: '2022', value: '2022' },
  { key: '2023', text: '2023', value: '2023' },
  { key: '2024', text: '2024', value: '2024' },
];

const genders = [
  { key: 'male', text: 'Male', value: 'M' },
  { key: 'female', text: 'Female', value: 'F' },
  { key: 'Non-Binary', text: 'Non-Binary', value: 'B' },
  { key: 'other', text: 'Other', value: 'O' },
  {
    key: 'No Answer',
    text: 'I prefer not to answer',
    value: 'N',
  },
];

const raceOptions = [
  { key: 'Native', text: 'American Indian/Alaskan Native', value: 'Native' },
  { key: 'Asian', text: 'Asian', value: 'Asian' },
  {
    key: 'Black or African American',
    text: 'Black or African American',
    value: 'Black or African American',
  },
  { key: 'Hispanic', text: 'Hispanic', value: 'Hispanic' },
  { key: 'White', text: 'White', value: 'White' },
  {
    key: 'Native Hawaiian/Pacific Islander',
    text: 'Native Hawaiian/Pacific Islander',
    value: 'Native Hawaiian/Pacific Islander',
  },
  {
    keu: 'Non-Resident Alien',
    text: 'Non-Resident Alien',
    value: 'Non-Resident Alien',
  },
  {
    key: 'Two or more races',
    text: 'Two or more races',
    value: 'Two or more races',
  },
  {
    key: 'Choose not to disclose',
    text: 'Choose not to disclose',
    value: 'Choose not to disclose',
  },
];

const ApplicationForm = () => {
  const user = useCurrentUser();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [gradYear, setGradYear] = useState<string>('');
  const [gradMonth, setGradMonth] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [essay, setEssay] = useState<string>('');
  const [adult, setAdult] = useToggle(false);

  const onChangeField = useCallback((setterFunction: (val: string) => void) => {
    return (
      _event: React.ChangeEvent<HTMLInputElement>,
      data: { value: string },
    ) => {
      setterFunction(data.value);
    };
  }, []);

  const onUpdateProfile = useCallback(() => {
    const profile = {
      name,
      adult,
      school,
      major,
      graduationMonth: gradMonth,
      graduationYear: gradYear,
      degree,
      description,
      essay,
      gender,
      ethnicity,
    };
    axios
      .put(`/api/users/${user._id}/profile`, {
        profile,
      })
      .then(
        response => {
          swal('Awesome!', 'Your application has been saved.', 'success').then(
            value => {
              window.location.pathname = '/';
            },
          );
        },
        response => {
          swal('Uh oh!', 'Something went wrong.', 'error');
        },
      );
  }, [
    name,
    adult,
    school,
    major,
    gradMonth,
    gradYear,
    degree,
    essay,
    gender,
    user,
  ]);

  useEffect(() => {
    if (user != null) {
      if (email != user.email) {
        setEmail(user.email);
      }
      if (name == '' && user.profile.name != '') {
        setName(user.profile.name);
      }
      if (school == '' && user.profile.school != '') {
        setSchool(user.profile.school);
      }
      if (major == '' && user.profile.major != '') {
        setMajor(user.profile.major);
      }
      if (gradYear == '' && user.profile.graduationYear != '') {
        setGradYear(user.profile.graduationYear);
      }
      if (gradMonth == '' && user.profile.graduationMonth != '') {
        setGradMonth(user.profile.graduationMonth);
      }
      if (degree == '' && user.profile.degree != '') {
        setDegree(user.profile.degree);
      }
      if (gender == '' && user.profile.gender != '') {
        setGender(user.profile.gender);
      }
      if (ethnicity == '' && user.profile.ethnicity != '') {
        setEthnicity(user.profile.ethnicity);
      }
      if (description == '' && user.profile.description != '') {
        setDescription(user.profile.description);
      }
      if (essay == '' && user.profile.essay != '') {
        setEssay(user.profile.essay);
      }
      if (adult == false && user.profile.adult === true) {
        setAdult(true);
      }
    }
  }, [user]);

  return (
    <div>
      <Container textAlign="center">
        <Header size="huge">Application</Header>
      </Container>

      <Form style={{ paddingTop: 100 }}>
        <Form.Field>
          <Form.Input
            placeholder="School Email"
            label="Email"
            name="email"
            value={email}
            disabled={true}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <Form.Input
            placeholder="Full Name"
            label="Name"
            name="name"
            value={name}
            onChange={onChangeField(setName)}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <SchoolSelector onChangeSchool={setSchool} school={school} />
        </Form.Field>
        <Form.Field>
          <MajorSelector onChangeMajor={setMajor} major={major} />
        </Form.Field>
        <Header>Anticipated Graduation</Header>
        <Form.Field>
          <Dropdown
            required
            fluid
            selection
            placeholder="Year"
            options={gradYears}
            value={gradYear}
            onChange={onChangeField(setGradYear)}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            required
            fluid
            selection
            placeholder="Month"
            options={months}
            value={gradMonth}
            onChange={onChangeField(setGradMonth)}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            required
            fluid
            selection
            placeholder="Anticipated Degree"
            options={degrees}
            value={degree}
            onChange={onChangeField(setDegree)}
          />
        </Form.Field>
        <Header size="small">Gender</Header>
        <Form.Field>
          <Dropdown
            required
            fluid
            selection
            placeholder="Gender"
            options={genders}
            value={gender}
            onChange={onChangeField(setGender)}
          />
        </Form.Field>
        <Header size="small">Race/Ethnicity</Header>
        <Form.Field>
          <Dropdown
            required
            fluid
            selection
            placeholder="Race/Ethnicity"
            options={raceOptions}
            value={ethnicity}
            onChange={onChangeField(setEthnicity)}
          />
        </Form.Field>
        <Form.Field>
          <Header size="small">I would descirbe myself as...</Header>
          <Form.Input
            placeholder="Designer, Developer, Data Scientist, iOS Wizard, Hacker Extraordinaire"
            value={description}
            onChange={onChangeField(setDescription)}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <Header size="small">
            What would you like to learn or get out of HackOHI/O? (optional)
          </Header>
          <TextArea
            placeholder="Tell us more"
            value={essay}
            onChange={(_event: any, data: any) => {
              setEssay(data.value);
            }}
          />
        </Form.Field>
        <Form.Field required>
          <p>
            Because of limitations imposed by OSU, we are not legally allowed to
            host non-OSU undergraduate minors (those under 18) for MakeOHI/O
            2021. Checking the box below affirms that you are or will be either
            an OSU undergraduate or 18 years or older by March 5, 2021.
          </p>
          <Checkbox
            onChange={setAdult}
            checked={adult}
            label="I am 18 or older"
          ></Checkbox>
        </Form.Field>
        <Button primary fluid circular type="submit" onClick={onUpdateProfile}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ApplicationForm;
