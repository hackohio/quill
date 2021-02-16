import React from "react";
import ReactDOM from "react-dom";
// import 'semantic-ui-css/semantic.min.css'

import RootContainer from "./RootContainers/LoginRootContainer.js";

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("app"));
};

render(RootContainer);

if (module.hot) {
  module.hot.accept("./RootContainers/LoginRootContainer.js", () => {
    const RootContainer = require("./RootContainers/LoginRootContainer.js")
      .default;
    render(RootContainer);
  });
}
