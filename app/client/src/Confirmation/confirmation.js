import React, { SyntheticEvent } from "react";
import {
  Form,
  Button,
  Dropdown,
  Header,
  TextArea,
  Container,
  Checkbox,
} from "semantic-ui-react";

const ConfirmationForm = () => (
  <div>
    <Container textAlign="center">
      <Header size="huge">Confirmation</Header>
    </Container>

    <Form>
      <Form.Field>
        <Form.Input
          placeholder="(123) - 555 - 1234"
          label="Phone Number"
          name="phone"
        ></Form.Input>
      </Form.Field>

      <Button primary fluid circular type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

export default ConfirmationForm;
