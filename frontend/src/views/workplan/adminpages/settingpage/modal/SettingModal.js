import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import { Modal, Button } from "antd";

const SettingModal = ({ visible, onCancel, onOk, children, title }) => {
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        footer={[
          <Button key="back" onClick={onCancel}>
            חזור אחורה
          </Button>
        ]}
      >
        <p>{children}</p>
      </Modal>
    </>
  );
};

export default withRouter(SettingModal);
