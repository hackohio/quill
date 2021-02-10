import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  Form,
  Grid,
  Segment,
  Button,
  Divider,
  Image,
  Icon,
} from "semantic-ui-react";
import useRegWindowStatus from "../Utils/useRegWindowStatus";

const RootLoginContainer = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const isRegOpen = useRegWindowStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = setterFunction => {
    return event => {
      setterFunction(event.target.value);
    };
  };

  const login = () => {
    const body = {
      email,
      password,
    };
    axios.post("/auth/login", body).then(_res => {
      location.reload();
    });
  };

  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 375, marginTop: 200 }}>
          <Segment>
            <Image
              src="assets/images/logo-color.svg"
              size="small"
              centered
            ></Image>
            <Divider />
            <Form>
              <Form.Field>
                <Form.Input
                  placeholder="School Email"
                  label="Email"
                  name="email"
                  onChange={handleChange(setEmail)}
                ></Form.Input>
              </Form.Field>
              {forgotPassword ? (
                <Button
                  fluid
                  circular
                  animated
                  color="green"
                  onClick={() => {
                    setForgotPassword(false);
                  }}
                >
                  <Button.Content visible> Send Reset Email</Button.Content>
                  <Button.Content hidden>
                    <Icon name="mail"></Icon>
                  </Button.Content>
                </Button>
              ) : (
                <>
                  <Form.Field>
                    <Form.Input
                      placeholder="Password"
                      label="Password"
                      name="password"
<<<<<<< HEAD
                    ></Form.Input>
                  </Form.Field>
                  <Form.Group inline>
                    <Button fluid circular color="red">
                      Login
                    </Button>
                    <Button fluid circular color="blue">
                      Register
                    </Button>
=======
                      type="password"
                      onChange={handleChange(setPassword)}
                    ></Form.Input>
                  </Form.Field>
                  <Form.Group inline>
                    <Button fluid circular color="red" onClick={login}>
                      Login
                    </Button>
                    {isRegOpen && (
                      <Button fluid circular color="blue">
                        Register
                      </Button>
                    )}
>>>>>>> 2f4cd62d2db06235f847d4e8f34766ff6f2efc15
                  </Form.Group>
                </>
              )}
            </Form>
            <Divider />
<<<<<<< HEAD
            {forgotPassword ? (
              <></>
            ) : (
=======
            {!forgotPassword && (
>>>>>>> 2f4cd62d2db06235f847d4e8f34766ff6f2efc15
              <Form>
                <Button
                  fluid
                  circular
                  color="grey"
                  onClick={() => {
                    setForgotPassword(true);
                  }}
                >
                  Forgot Password?
                </Button>
              </Form>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default RootLoginContainer;
