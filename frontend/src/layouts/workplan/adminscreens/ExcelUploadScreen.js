import React, { Component } from "react";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import ExcelPageZshigra from "views/workplan/adminpages/excelpages/ExcelPageZshigra";
import ExcelPageZmplanlog from "views/workplan/adminpages/excelpages/ExcelPageZmplanlog";
import ExcelPageNexttreat from "views/workplan/adminpages/excelpages/ExcelPageNexttreat";

function ExcelUploadScreen(props) {
    // on this page, we need on the body tag the classes .rtl and .menu-on-right
    document.body.classList.add("rtl", "menu-on-right");
  
    return (
      <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>

                <div className="content" style={{ direction: 'rtl' }}>
                  <ExcelPageZshigra/>
                  <ExcelPageZmplanlog/>
                  <ExcelPageNexttreat/>
                </div>

          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    );
  }
  
  export default ExcelUploadScreen;