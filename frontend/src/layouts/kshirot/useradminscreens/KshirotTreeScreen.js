
import React from "react";
// javascript plugin used to create scrollbars on windows

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import Sidebar from "components/general/Sidebar/Sidebar.js";
import WorkplanNavbar from "components/general/Navbars/WorkplanNavbar.js";

import KshirotTree from "views/kshirot/useradminpages/KshirotTree";

function KshirotTreeScreen() {

  document.body.classList.add("rtl", "menu-on-right");

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar rtlActive />
            <div className="main-panel">
              <WorkplanNavbar/>
              <div className="content">
                <KshirotTree />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer >
  );
}

export default KshirotTreeScreen;
