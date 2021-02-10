import React, { SyntheticEvent } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import useRegWindowStatus from "../Utils/useRegWindowStatus";

type Props = {
  onChangeEmail: (event: SyntheticEvent) => null;
  onClickSendResetEmail: (event: SyntheticEvent) => null;
};

const ForgotPasswordForm = (props: Props) => {
  const isRegOpen = useRegWindowStatus();

  return (
    <Form>
      <Form.Field>
        <Form.Input
          placeholder="School Email"
          label="Email"
          name="email"
          onChange={props.onChangeEmail}
        ></Form.Input>
      </Form.Field>
      <Button
        fluid
        circular
        animated
        color="green"
        onClick={props.onClickSendResetEmail}
      >
        <Button.Content visible> Send Reset Email</Button.Content>
        <Button.Content hidden>
          <Icon name="mail"></Icon>
        </Button.Content>
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
