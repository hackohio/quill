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
import swal from "sweetalert";
import useRegWindowStatus from "../Utils/useRegWindowStatus";

const RootLoginContainer = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const isRegOpen = useRegWindowStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (setterFunction) => {
    return (event) => {
      setterFunction(event.target.value);
    };
  };

  const displayGenericErrorMessage = () => {
    swal({
      title: "Uh Oh!",
      text: "Looks like something went wrong. Please try again later",
      icon: "error",
    });
  };

  const makeAPIRequest = async (url, body) => {
    try {
      await axios.post(url, body);
      location.reload();
    } catch (_error) {
      displayGenericErrorMessage();
    }
  };

  const register = async () => {
    const body = {
      email,
      password,
    };
    await makeAPIRequest("auth/register", body);
  };

  const login = async () => {
    const body = {
      email,
      password,
    };
    await makeAPIRequest("auth/login", body);
  };

  const sendResetEmail = async () => {
    const body = { email };
    try {
      await axios.post("auth/reset", body);
      swal({
        title: "Don't sweat!",
        text:
          "An email should be sent to you shortly.\nIf you can't find your email, please check your spam folder.",
        icon: "success",
      });
    } catch (_error) {
      console.log("reste error");
      displayGenericErrorMessage();
    }
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
                  onClick={sendResetEmail}
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
                      type="password"
                      onChange={handleChange(setPassword)}
                    ></Form.Input>
                  </Form.Field>
                  <Form.Group inline>
                    <Button fluid circular color="red" onClick={login}>
                      Login
                    </Button>
                    {isRegOpen && (
                      <Button fluid circular color="blue" onClick={register}>
                        Register
                      </Button>
                    )}
                  </Form.Group>
                </>
              )}
            </Form>
            <Divider />
            {!forgotPassword && (
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
