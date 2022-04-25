 
import React from "react";
// javascript plugin used to create scrollbars on windows

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import Sidebar from "components/general/Sidebar/Sidebar.js";
import WorkplanNavbar from "components/general/Navbars/WorkplanNavbar.js";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
 
import MashaKshirotPikod from "views/kshirot/kshirotforms/masha/MashaKshirotPikod";

function AddMashaKshirotPikod(props) {
  // on this page, we need on the body tag the classes .rtl and .menu-on-right
  document.body.classList.add("rtl", "menu-on-right");

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar rtlActive />
            <div className="main-panel">
              <WorkplanNavbar />
              <div className="content" style={{direction: 'rtl'}}>
                <MashaKshirotPikod />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default AddMashaKshirotPikod;