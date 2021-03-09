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

const restrictions = [
  { key: "Vegan", text: "Vegan", value: "Vegan" },
  { key: "Kosher", text: "kosher", value: "Kosher" },
  { key: "None", text: "None", value: "None" },
];

const sizes = [
  { key: "XS", text: "Unisex X-Small", value: "XS" },
  { key: "S", text: "Unisex Small", value: "S" },
  { key: "M", text: "Unisex Medium", value: "M" },
  { key: "L", text: "Unisex Large", value: "L" },
  { key: "XL", text: "Unisex X-Large", value: "XL" },
  { key: "XXL", text: "Unisex XX-Large", value: "XXL" },
  { key: "WXS", text: "Women's X-Small", value: "WXS" },
  { key: "WS", text: "Women's Small", value: "WS" },
  { key: "WM", text: "Women's Medium", value: "WM" },
  { key: "WL", text: "Women's Large", value: "WL" },
  { key: "WXL", text: "Women's X-Large", value: "WXL" },
  { key: "WXXL", text: "Women's XX-Large", value: "WXXL" },
];
const ConfirmationForm = () => (
  <div>
    <Container textAlign="center">
      <Header size="huge">Confirmation</Header>
    </Container>

    <Form>
      <Form.Field>
        <Form.Input
          required
          placeholder="(123) - 555 - 1234"
          label="Phone Number (We need this in case we need to get ahold of you!)."
          name="phone"
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
        ></Dropdown>
      </Form.Field>
      <Form.Field>
        <Header size="small">Shirt Size (required)</Header>
        <Dropdown placeholder="Shirt Size" fluid selection options={sizes} />
      </Form.Field>
      <Form.Field>
        <Header size="small">
          Are you interested in helping to plan more events like MakeOHI/O?
        </Header>
        <Checkbox label="I am interested" />
      </Form.Field>
      <Button primary fluid circular type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

export default ConfirmationForm;
