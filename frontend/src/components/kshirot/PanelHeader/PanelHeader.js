 
import React from "react";

class PanelHeader extends React.Component {
  render() {
    return (
      <div
        className={
          "panel-header " +
          (this.props.size !== undefined
            ? "panel-header-" + this.props.size
            : "")
        }
        style={{background:'#A7C7E7'}}
      >
        {this.props.content}
      </div>
    );
  }
}

export default PanelHeader;
