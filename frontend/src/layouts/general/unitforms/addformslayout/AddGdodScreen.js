import React from "react";
// core components
import Sidebar from "components/general/Sidebar/Sidebar.js";import WorkplanNavbar from "components/general/Navbars/WorkplanNavbar.js";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import AddGdod from "views/general/unitforms/addforms/AddGdod";

function AddGdodScreen(props) {
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
                  <AddGdod />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    );
  }
  
  export default AddGdodScreen;