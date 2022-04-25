import React, { useState, useEffect } from 'react';
import {
  UncontrolledCollapse, CardBody, Card, Button,
  CardHeader,
  CardTitle,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner,
  Label,
  Col
} from 'reactstrap';

const Toggle2 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  function togglePanel(e) {
    setIsOpen(!isOpen);
  }

  function checktoggle() {
    if(props.value!="")
    {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    checktoggle();
  }, [props.value])

   //add on close clear the input...!!!!8.8.21 + אם יש הערה הפילד אמור להיות פתוח.. בעריכה וזה
  return (
    <>
      {
        isOpen ?  //toggle is open
          <Row>
            <Col xs={12} md={10} style={{paddingLeft:'0px'}}>
            <Input type="textarea" bsSize="lg" name={props.name} value={props.value} onChange={props.onChange} placeholder={"הערה"} style={{padding:'0px',height:'100%'}}/>
            </Col>
            <Col xs={12} md={2}>
            <Button color="danger" onClick={(e) => togglePanel(e)} style={{paddingRight:'5px',paddingLeft:'5px',paddingTop:'0px',paddingBottom:'0px' ,margin:'0px',float:'right'}}> 
              X
            </Button>
            </Col>
           
          </Row> : 
          <div style={{textAlign:'right'}}>
            <Button color="grey" onClick={(e) => togglePanel(e)} style={{paddingRight:'5px',paddingLeft:'5px',paddingTop:'0px',paddingBottom:'0px' ,margin:'0px'}}>
              הוסף הערה
            </Button>
          </div>
      }
    </>
  )
};
export default Toggle2;