import React from "react";
import {Nav} from "shards-react";

import Notifications from "./Notifications";
import UserActionsContainer from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Notifications/>
    <UserActionsContainer/>
  </Nav>
);
