import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  ButtonToolbar,
  Card,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Signup.css';
import Request from '../../core/Request';
import DateChooser from "../../components/Input/DateChooser/DateChooser";


const title = 'Signup Form';

class Signup extends React.Component {
  constructor(props, context) {
    super(props);

    if (context.setTitle) {
      context.setTitle(title);
    }

    this.state = {
      title: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      address: '',
      postcode: '',
      phone: '',
      email: '',
      dateOfBirth: null, //Date
      gender: '',
      coverLetter: '',
      subscribed: false,
      errors: '',
      success: false,
      message: '',
      repeat_password: '',
    };
  }


  //UTILS
  makeRequestBody() {
    const dataToSend = Object.assign({}, this.state);
    dataToSend.dateOfBirth = this.state.dateOfBirth? this.state.dateOfBirth.toISOString() : null;
    return dataToSend;
  }




  //EVENT HANDLERS
  handleDateOfBirthChange(value) {
    this.setState({dateOfBirth: value});
  }

  onChange(e) {
    const model = {};
    if (e.target.type === 'checkbox') {
      model[e.target.id] = e.target.checked;
    } else {
      model[e.target.id] = e.target.value;
    }
    this.setState(model);
  }

  onSubmit(e) {
    e.preventDefault();
    (async() => {
      if (this.state.repeat_password !== this.state.password) {
        this.setState({
          errors: { password: 'Passwords do not match' },
          message: 'Passwords do not match',
          success: false,
        });
      }
      else {
        const resp = await new Request('/auth/signup', 'POST', this.makeRequestBody()).fetch();
        this.setState({
          errors: resp.errors,
          message: resp.message,
          success: resp.success,
        });
      }
    })();
  }



  //RENDERING
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <hr />
          {(this.state.success) ? (
            <div>
              {this.state.message}
            </div>
          ) : (
            <form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  placeholder="ex. 'Mr, Miss, Mrs'"
                  type="text"
                  value={this.state.title}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="firstName">
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  placeholder="ex. 'John'"
                  type="text"
                  value={this.state.firstName}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="lastName">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  placeholder="ex. 'Dough'"
                  type="text"
                  value={this.state.lastName}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="username">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  placeholder="ex. 'johndough'"
                  type="text"
                  value={this.state.username}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  placeholder="A strong password!"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.onChange(e)}
                  minLength="8"
                  required
                />
              </FormGroup>

              <FormGroup controlId="repeat_password">
                <ControlLabel>Repeat Password</ControlLabel>
                <FormControl
                  placeholder="Please repeat for safety"
                  type="password"
                  value={this.state.repeat_password}
                  onChange={(e) => this.onChange(e)}
                  minLength="8"
                  required
                />
              </FormGroup>

              <FormGroup controlId="address">
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  placeholder="Complete address please, we will verify!"
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="postcode">
                <ControlLabel>Postcode</ControlLabel>
                <FormControl
                  placeholder="ex. '10067'"
                  type="text"
                  value={this.state.postcode}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="phone">
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  placeholder="Phone"
                  type="text"
                  value={this.state.phone}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  placeholder="ex. 'john@dough.com'"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="dateOfBirth">
                <ControlLabel>Date of Birth</ControlLabel>
                <DateChooser
                  className='form-control'
                  value={this.state.dateOfBirth}
                  onChange={d => this.handleDateOfBirthChange(d)}/>
              </FormGroup>

              <FormGroup controlId="gender">
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.gender}
                  onChange={(e) => this.onChange(e)}
                  required
                >
                  <option value="">Please select a gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="subscribed">
                <ControlLabel>Subscribe to Newsletter</ControlLabel>
                <Checkbox
                  id="subscribed"
                  onChange={(e) => this.onChange(e)}
                  value={this.state.subscribed}
                  checked={this.state.subscribed}
                >
                  Yes
                </Checkbox>
              </FormGroup>

              <FormGroup controlId="coverLetter">
                <ControlLabel>Cover Letter</ControlLabel>
                <FormControl
                  placeholder="Short story of who you are and why you want to join our community."
                  componentClass="textarea"
                  rows="8"
                  value={this.state.coverLetter}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              {(this.state.errors && this.state.errors !== '') ? (
                <Card header="Form Errors" bsStyle="danger">
                  {this.state.message}
                  <ul>
                    {Object.keys(this.state.errors).map((error, j) =>
                      <li key={j}>
                        {error} - {this.state.errors[error]}
                      </li>
                    )}
                  </ul>
                </Card>
              ) : ''}
              <ButtonToolbar>
                <Button type="submit" bsStyle="success">
                  Sign Up
                </Button>
              </ButtonToolbar>

            </form>
          )}
        </div>
      </div>
    );
  }
}

Signup.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Signup);
