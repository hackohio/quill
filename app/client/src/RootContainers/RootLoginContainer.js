import React from 'react';
import { Form, Grid, Segment, Button, Divider, Image, Header, Icon} from 'semantic-ui-react';


const gridLayout = () => (
    <div>
        <Grid centered>
            <Grid.Column style={{maxWidth:375,marginTop:275}}>
                <Segment>
                <Image src="assets/images/logo-color.svg" size="small" centered></Image>    
                <Divider/>
                    <Form>
                        <Form.Field>
                            <Form.Input placeholder ="School Email" label ="Email" name="email"></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder="Password" label="Password" name ="password"></Form.Input>
                        </Form.Field>
                        <Form.Group inline>       
                            <Button fluid circular color="red" animated>
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>
                                <Icon name ="arrow right"/>
                            </Button.Content>
                            </Button>
                            <Button fluid circular color="blue" animated>
                                <Button.Content visible>Register</Button.Content>
                                <Button.Content hidden>
                                    <Icon name ="arrow right"/>
                                </Button.Content>
                            </Button>
                        </Form.Group>
                    </Form>
                    <Divider/>
                        <Header as="h4" textAlign="center"><a href="/">Forgot Password?</a></Header>
                </Segment>
            </Grid.Column>
        </Grid>
    </div>
);
export default gridLayout;