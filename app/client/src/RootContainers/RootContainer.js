import React, { Component } from "react";
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Button,
} from "semantic-ui-react";
import DashMenu from "../Dashboard/Menu";
import DashWindow from "../Dashboard/DashWindow";

const DashboardDefault = () => (
  <div>
    <DashMenu />
  </div>
);

export default DashboardDefault;
