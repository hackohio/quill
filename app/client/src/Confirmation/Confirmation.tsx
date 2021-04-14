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
  Segment,
  Icon,
} from 'semantic-ui-react';
import useCurrentUser from '../Utils/useCurrentUser';
import useToggle from '../Utils/useToggle';
import swal from 'sweetalert';

const restrictions = [
  { key: 'None', text: 'None', value: 'None' },
  { key: 'Vegan', text: 'Vegan', value: 'Vegan' },
  { key: 'Kosher', text: 'kosher', value: 'Kosher' },
  { key: 'Vegetarian', text: 'Vegetarian', value: 'Vegetarian' },
  { key: 'Halal', text: 'Halal', value: 'Halal' },
  {
    key: 'Lactose Intolerence',
    text: 'Lactose Intolerence',
    value: 'Lactose Intolerence',
  },
  { key: 'Tree Nuts', text: 'Tree Nuts', value: 'Tree Nuts' },
  { key: 'Peanuts', text: 'Peanuts', value: 'Peanuts' },
  { key: 'Shellfish', text: 'Shellfish', value: 'Shellfish' },
  { key: 'Egg', text: 'Egg', value: 'Egg' },
  { key: 'Gluten', text: 'Gluten', value: 'Gluten' },
  { key: 'Soybean', text: 'Soybean', value: 'Soybean' },
  { key: 'Paleo', text: 'Paleo', value: 'Paleo' },
];

const sizes = [
  { key: 'XS', text: 'Unisex X-Small', value: 'XS' },
  { key: 'S', text: 'Unisex Small', value: 'S' },
  { key: 'M', text: 'Unisex Medium', value: 'M' },
  { key: 'L', text: 'Unisex Large', value: 'L' },
  { key: 'XL', text: 'Unisex X-Large', value: 'XL' },
  { key: 'XXL', text: 'Unisex XX-Large', value: 'XXL' },
  { key: 'WXS', text: "Women's X-Small", value: 'WXS' },
  { key: 'WS', text: "Women's Small", value: 'WS' },
  { key: 'WM', text: "Women's Medium", value: 'WM' },
  { key: 'WL', text: "Women's Large", value: 'WL' },
  { key: 'WXL', text: "Women's X-Large", value: 'WXL' },
  { key: 'WXXL', text: "Women's XX-Large", value: 'WXXL' },
];

const ConfirmationForm = () => {
  const user = useCurrentUser();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<Array<string>>(
    [],
  );
  const [shirtSize, setShirtSize] = useState<string>('');
  const [intrestedInJoiningOrg, setIntrestedInJoiningOrg] = useToggle(false);
  const [interestedInEmployment, setIntrestedInEmployment] = useToggle(false);
  const [signatureLiability, setSignatureLiability] = useState<string>('');
  const [signatureCodeOfConduct, setSignatureCodeOfConduct] = useState<string>(
    '',
  );
  const [notes, setNotes] = useState<string>('');

  const onChangeField = useCallback((setterFunction: (val: string) => void) => {
    return (
      _event: React.ChangeEvent<HTMLInputElement>,
      data: { value: string },
    ) => {
      setterFunction(data.value);
    };
  }, []);

  useEffect(() => {
    if (user != null) {
      console.log(user.confirmation);
      if (phoneNumber != user.confirmation.phoneNumber) {
        setPhoneNumber(user.confirmation.phoneNumber);
      }
      if (
        dietaryRestrictions.length === 0 &&
        user.confirmation.dietaryRestrictions.length !== 0
      ) {
        setDietaryRestrictions(user.confirmation.dietaryRestrictions);
      }
      if (shirtSize == '' && user.confirmation.shirtSize != '') {
        setShirtSize(user.confirmation.shirtSize);
      }
      if (
        intrestedInJoiningOrg === false &&
        user.confirmation.intrestedInJoiningOrg
      ) {
        setIntrestedInJoiningOrg(true);
      }
      if (
        interestedInEmployment === false &&
        user.confirmation.interestedInEmployment
      ) {
        setIntrestedInEmployment(true);
      }
      if (
        signatureLiability == '' &&
        user.confirmation.signatureLiability != ''
      ) {
        setSignatureLiability(user.confirmation.signatureLiability);
      }
      if (
        signatureCodeOfConduct == '' &&
        user.confirmation.signatureCodeOfConduct != ''
      ) {
        setSignatureCodeOfConduct(user.confirmation.signatureCodeOfConduct);
      }
      if (notes == '' && user.confirmation.notes != '') {
        setNotes(user.confirmation.notes);
      }
    }
  }, [user]);

  const onUpdateConfirmation = useCallback(() => {
    const confirmation = {
      phoneNumber,
      dietaryRestrictions,
      shirtSize,
      intrestedInJoiningOrg,
      interestedInEmployment,
      signatureLiability,
      signatureCodeOfConduct,
      notes,
    };
    axios
      .put(`/api/users/${user._id}/confirm`, {
        confirmation,
      })
      .then(
        _response => {
          swal('Woo!', "You're confirmed!", 'success').then(_value => {
            window.location.pathname = '/';
          });
        },
        _response => {
          swal('Uh oh!', 'Something went wrong.', 'error');
        },
      );
  }, [
    phoneNumber,
    dietaryRestrictions,
    shirtSize,
    intrestedInJoiningOrg,
    interestedInEmployment,
    signatureLiability,
    signatureCodeOfConduct,
    notes,
  ]);

  return (
    <div>
      <Container textAlign="center">
        <Header size="huge">Confirmation</Header>
      </Container>

      <Form style={{ paddingTop: 100 }}>
        <Header size="large">Basic Information</Header>
        <Form.Field>
          <Form.Input
            type="tel"
            required
            placeholder="(123) - 555 - 1234"
            label="Phone Number (We need this in case we need to get ahold of you!)."
            name="phone"
            value={phoneNumber}
            onChange={onChangeField(setPhoneNumber)}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <Header size="small">Dietary Restrictions</Header>
          <p>
            If your restirction is not listed here, please let us know in the
            additional notes at the bottom.
          </p>
          <Dropdown
            required
            placeholder="Dietary Restrictions"
            fluid
            multiple
            selection
            options={restrictions}
            value={dietaryRestrictions}
            onChange={(_event: any, data: any) => {
              setDietaryRestrictions(data.value);
            }}
          ></Dropdown>
        </Form.Field>
        <Form.Field>
          <Header size="small">Shirt Size (required)</Header>
          <p>Let's get you some swag!</p>
          <Dropdown
            placeholder="Shirt Size"
            name="shirt"
            fluid
            selection
            options={sizes}
            value={shirtSize}
            onChange={(_event: any, data: any) => {
              setShirtSize(data.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Header size="small">
            Are you interested in helping to plan more events like MakeOHI/O?
          </Header>
          <Checkbox
            label="I am interested"
            id="intrestedInJoiningOrg"
            onChange={setIntrestedInJoiningOrg}
            checked={intrestedInJoiningOrg}
          />
        </Form.Field>
        <Header size="large">Skills & Accomplishments</Header>
        <Form.Field>
          <Header size="small">Resume Upload</Header>
          <p>
            Our sponsors ask us for the resumes of the event participants!
            Please upload your resume as a PDF below.
          </p>

          <Button primary>Add Document</Button>
        </Form.Field>
        <Form.Field>
          <Header size="small">Looking for a job?</Header>
          <Checkbox
            label="I am still looking for summer employment"
            onChange={setIntrestedInEmployment}
            checked={interestedInEmployment}
          />
        </Form.Field>
        <Header size="large">Legal</Header>
        <Form.Field>
          <p>
            <a
              target="_blank"
              href="https://hack.osu.edu/make/2021/assets/pdf/2021_code_of_conduct+photo_release.pdf"
            >
              MakeOHI/O 2021 Code of Conduct & Liability Waiver
            </a>
          </p>
          <label> Liability Waiver </label>
          <p>
            For legal reasons, our university asks that you read and accept the
            terms of our liability waiver. Again, as we mentioned in the
            original application - you <strong> must </strong> be 18 years or
            older or an OSU undergraduate by the day of the event. or
            <strong>
              we will refuse you admission at the door. We will be checking ID.\
            </strong>
          </p>
          <p>
            By writing my name below, I affirm that I have read and accepted the
            terms of the liability waiver above, and will be either an OSU
            undergraduate or 18 years or older at the time of the event.
          </p>
          <Form.Input
            type="text"
            placeholder="Your Full Legal Name"
            name="signatureLiabilityWaiver"
            value={signatureLiability}
            onChange={onChangeField(setSignatureLiability)}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <Header size="small">Code of Conduct</Header>
          <p>
            It is extremely important to us that attendees follow a set of
            guidelines to make the event fun for everyone involved. Please read
            through and make sure you understand what we will be expecting of
            you.
          </p>
          <p>
            By writing my name below, I affirm that I have read and will abide
            by the code of conduct detailed above.
          </p>
          <Form.Input
            type="text"
            name="signatureCodeOfConduct"
            placeholder="Your Full Legal Name"
            value={signatureCodeOfConduct}
            onChange={onChangeField(setSignatureCodeOfConduct)}
          />
        </Form.Field>
        <Header size="large">Everything Else</Header>
        <Form.Field>
          <Header size="small">Additional Notes</Header>
          <p>If there's anything else you need to let us know, tell us here!</p>
          <TextArea
            placeholder="Tell us more"
            value={notes}
            onChange={(_event: any, data: any) => {
              setNotes(data.value);
            }}
          />
        </Form.Field>
        <Button
          color="green"
          fluid
          circular
          type="submit"
          onClick={onUpdateConfirmation}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmationForm;
