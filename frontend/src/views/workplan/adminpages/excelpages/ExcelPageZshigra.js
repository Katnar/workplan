import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col,Icon, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../../../../utils/workplan/EditTable";
import axios from 'axios'
export default class ExcelPageZshigra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "cycle",
          dataIndex: "cycle",
          editable: true
        },
        {
          title: "descreption",
          dataIndex: "descreption",
          editable: true
        },
        {
          title: "hierarchy",
          dataIndex: "hierarchy",
          editable: true
        },
        {
          title: "lower_tolerance",
          dataIndex: "lower_tolerance",
          editable: true
        },
        {
          title: "package",
          dataIndex: "package",
          editable: true
        },
        {
          title: "package_value",
          dataIndex: "package_value",
          editable: true
        },
        {
          title: "policy",
          dataIndex: "policy",
          editable: true
        },
        {
          title: "policy_des",
          dataIndex: "policy_des",
          editable: true
        },
        {
          title: "type_of_treatment",
          dataIndex: "type_of_treatment",
          editable: true
        },
        {
          title: "units",
          dataIndex: "units",
          editable: true
        },
        {
          title: "upper_tolerance",
          dataIndex: "upper_tolerance",
          editable: true
        },    
      ]
    };
  }

  handleSave = row => {
    const newData = [...this.state.rows];
    
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              // key: index,
              cycle: row[1],
              descreption: row[2],
              hierarchy: row[3],
              lower_tolerance: row[4],
              package: row[5],
              package_value: row[6],
              policy: row[7],
              policy_des: row[8],
              type_of_treatment: row[9],
              units: row[10],
              upper_tolerance: row[11],
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {

    
    console.log("submitting: ", this.state.rows);
    
    const data = this.state.rows
   
     data.map(row => {
      const cycle = row.cycle
      const descreption = row.descreption
      const hierarchy = row.hierarchy
      const lower_tolerance = row.lower_tolerance
      const package1 = row.package
      const package_value = row.package_value
      const policy = row.policy
      const policy_des = row.policy_des
      const type_of_treatment = row.type_of_treatment
      const units = row.units
      const upper_tolerance = row.upper_tolerance
    
    axios.post('http://localhost:8000/api/zshigra', {policy,policy_des,package1,package_value,cycle,units,descreption,hierarchy,type_of_treatment,lower_tolerance,upper_tolerance})
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
  };

  handleDelete = key => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.key !== key) });
  };
  handleAdd = () => {
    const { count, rows } = this.state;
    const newData = {
      key: count,
      name: "User's name",
      age: "22",
      gender: "Female"
    };
    this.setState({
      rows: [newData, ...rows],
      count: count + 1
    });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
        <h1 style={{textAlign:'center'}}>shigra-העלת קבצי אקסל</h1>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              
            </div>
          </Col>
          <Col span={8}>
            <a
              href="https://res.cloudinary.com/bryta/raw/upload/v1562751445/Sample_Excel_Sheet_muxx6s.xlsx"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              
            </a>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleAdd}
                  size="large"
                  type="info"
                  style={{ marginBottom: 16 }}
                >
                  <Icon type="plus" />
                  Add a row
                </Button>{" "}
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 10 }}
                >
                  העלה קובץ
                </Button>
              </>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button style={{float:'right', marginBottom:'15px'}}>
              <Icon type="upload" /> לחץ להעלת טבלת אקסל
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </>
    );
  }
}