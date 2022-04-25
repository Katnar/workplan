import React from 'react';
import { UncontrolledCollapse,CardBody, Card , Button,
    
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
    Col} from 'reactstrap';

const Toggle = (props) => (
  <div style={{textAlign:'right'}}>
    <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      {props.btnName}
    </Button>
    <UncontrolledCollapse toggler="#toggler">
    <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                      <Input type="text" bsSize="lg" name={props.name} value={props.value} onChange={props.onChange} />
    </UncontrolledCollapse>
  </div>
);
export default Toggle;