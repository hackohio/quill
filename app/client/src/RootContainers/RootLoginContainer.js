import React, { useState } from "react";
import {
  Form,
  Grid,
  Segment,
  Button,
  Divider,
  Image,
  Icon
} from "semantic-ui-react";

const RootLoginContainer = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

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
                ></Form.Input>
              </Form.Field>
              {forgotPassword ? (
                <Button fluid circular animated color="green" onClick={() => {
                setForgotPassword(false);}
                  }>
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
                  ></Form.Input>
                </Form.Field>
                <Form.Group inline>
                    <Button fluid circular color="red">
                        Login
                    </Button>
                    <Button fluid circular color="blue">
                        Register
                    </Button>          
                </Form.Group>
              </>
              )}
            </Form>
            <Divider />
            {forgotPassword ? (
                <>
                </>
            ):(
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
