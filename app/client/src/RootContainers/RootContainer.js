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
import ApplicationForm from "../Application/Application";

const DashboardDefault = () => (
  <div>
    <ApplicationForm />
  </div>
);

export default DashboardDefault;
