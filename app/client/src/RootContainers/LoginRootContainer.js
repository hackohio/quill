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
import ForgotPasswordForm from "../Login/ForgotPasswordForm";
import LoginForm from "../Login/LoginForm";

const RootLoginContainer = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = setterFunction => {
    return event => {
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

  const onClickRegister = async () => {
    const body = {
      email,
      password,
    };
    await makeAPIRequest("auth/register", body);
  };

  const onClickLogin = async () => {
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
      displayGenericErrorMessage();
    }
  };

  return (
    <Grid centered>
      <Grid.Column style={{ maxWidth: 375, marginTop: 200 }}>
        <Segment>
          <Image
            src="assets/images/logo-color.svg"
            size="small"
            centered
          ></Image>
          <Divider />
          {forgotPassword ? (
            <ForgotPasswordForm
              onChangeEmail={handleChange(setEmail)}
              onClickSendResetEmail={sendResetEmail}
            />
          ) : (
            <LoginForm
              onChangeEmail={handleChange(setEmail)}
              onChangePassword={handleChange(setPassword)}
              onClickLogin={onClickLogin}
              onClickRegister={onClickRegister}
            />
          )}
          {!forgotPassword && (
            <>
              <Divider />
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
            </>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default RootLoginContainer;
