import React from "react";
import { Redirect,  Switch } from "react-router-dom";

// import dashboard from "./Dashboard";
// import second from "./second";
interface IProps {
  exact?: boolean;
  path?: string;
  component?: React.ComponentType<any>;
}
const SecondMenu = (props: IProps) => {
  return  (
  <div className="dashboard-wrapper">
    <Switch>
      {/* <Route path='/' component={dashboard} /> */}
      <Redirect to="/error" />
    </Switch>
  </div>
);
};
export default SecondMenu;
