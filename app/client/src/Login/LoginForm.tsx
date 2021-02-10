import React, { SyntheticEvent } from "react";
import { Form, Button } from "semantic-ui-react";
import useRegWindowStatus from "../Utils/useRegWindowStatus";

type Props = {
  onChangeEmail: (event: SyntheticEvent) => null;
  onChangePassword: (event: SyntheticEvent) => null;
  onClickLogin: () => null;
  onClickRegister: () => null;
};

const LoginForm = (props: Props) => {
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
      <Form.Field>
        <Form.Input
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          onChange={props.onChangePassword}
        ></Form.Input>
      </Form.Field>
      <Form.Group inline>
        <Button fluid circular color="red" onClick={props.onClickLogin}>
          Login
        </Button>
        {isRegOpen && (
          <Button fluid circular color="blue" onClick={props.onClickRegister}>
            Register
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
