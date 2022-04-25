import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col,Icon, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../../../../utils/workplan/EditTable";
import axios from 'axios'

export default class ExcelPageZmplanlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "date",
          dataIndex: "date",
          editable: true
        },
        {
          title: "time",
          dataIndex: "time",
          editable: true
        },
        {
          title: "zadik",
          dataIndex: "zadik",
          editable: true
        },
        {
          title: "zadik_des",
          dataIndex: "zadik_des",
          editable: true
        },
        {
          title: "Designation",
          dataIndex: "Designation",
          editable: true
        },
        {
          title: "Designation_des",
          dataIndex: "Designation_des",
          editable: true
        },
        {
          title: "meaged_al",
          dataIndex: "meaged_al",
          editable: true
        },
        {
          title: "meaged_al_des",
          dataIndex: "meaged_al_des",
          editable: true
        },
        {
          title: "meaged",
          dataIndex: "meaged",
          editable: true
        },
        {
          title: "meaged_des",
          dataIndex: "meaged_des",
          editable: true
        },
        {
          title: "mekabete",
          dataIndex: "mekabete",
          editable: true
        },
        {
          title: "mekabete_des",
          dataIndex: "mekabete_des",
          editable: true
        },
        {
          title: "makat",
          dataIndex: "makat",
          editable: true
        },
        {
          title: "makat_des",
          dataIndex: "makat_des",
          editable: true
        },
        {
          title: "message_num",
          dataIndex: "message_num",
          editable: true
        },
        {
          title: "message_des",
          dataIndex: "message_des",
          editable: true
        },
        {
          title: "policy_category",
          dataIndex: "policy_category",
          editable: true
        },
        {
          title: "previous_policy",
          dataIndex: "previous_policy",
          editable: true
        },
        {
          title: "new_policy",
          dataIndex: "new_policy",
          editable: true
        },
        {
          title: "previous_maamad",
          dataIndex: "previous_maamad",
          editable: true
        },
        {
          title: "new_maamad",
          dataIndex: "new_maamad",
          editable: true
        },
        {
          title: "plan_number",
          dataIndex: "plan_number",
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
              Designation: row[0],
              Designation_des: row[1],
              date: row[3],
              makat: row[4],
              makat_des: row[5],
              meaged: row[6],
              meaged_al: row[7],
              meaged_al_des: row[8],
              meaged_des: row[9],
              mekabete: row[10],
              mekabete_des: row[11],
              message_des: row[12],
              message_num: row[13],
              new_maamad: row[14],
              new_policy: row[15],
              plan_number: row[16],
              policy_category: row[17],
              previous_maamad: row[18],
              previous_policy: row[19],
              time: row[20],
              zadik: row[21],
              zadik_des: row[22],
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
      const date = row.date
      const time= row.time
      const zadik= row.zadik
      const zadik_des= row.zadik_des
      const Designation= row.Designation
      const Designation_des= row.Designation_des
      const meaged_al= row.meaged_al
      const meaged_al_des= row.meaged_al_des
      const meaged= row.meaged
      const meaged_des= row.meaged_des
      const mekabete= row.mekabete
      const mekabete_des= row.mekabete_des
      const makat= row.makat
      const makat_des= row.makat_des
      const message_num= row.message_num
      const message_des= row.message_des
      const policy_category= row.policy_category
      const previous_policy= row.previous_policy
      const new_policy= row.new_policy
      const previous_maamad= row.previous_maamad
      const new_maamad= row.new_maamad
      const plan_number= row.plan_number
    
    axios.post('http://localhost:8000/api/zmplanlog', {date,time,zadik,zadik_des,Designation,Designation_des,meaged_al,meaged_al_des,meaged,meaged_des,mekabete,mekabete_des,makat,makat_des,message_num,message_des,policy_category,previous_policy,new_policy,previous_maamad,new_maamad,plan_number})
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
        <h1 style={{textAlign:'center'}}>planlog-העלת קבצי אקסל</h1>
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