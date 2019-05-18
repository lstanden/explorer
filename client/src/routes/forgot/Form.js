/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import s from "./Forgot.css";
import Request from "../../core/Request";
import { FormGroup, FormControl, Alert, Button, Card } from "react-bootstrap";
import Link from "../../components/Link";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: "",
      message: "",
      success: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    (async () => {
      const resp = await new Request(
        "/auth/forgot",
        "POST",
        this.state
      ).fetch();
      this.setState({
        errors: resp.errors,
        message: resp.message,
        success: resp.success
      });
    })();
  }

  onChange(e) {
    const model = {};
    this.setState(model);
    model[e.target.id] = e.target.value;
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div className={s.formTop}>
          <h1>Password Reset</h1>
          <p>
            Enter username or email address to send new credentials to the email
            account on file.
          </p>
        </div>
        <div className={s.formBody}>
          {this.state.message && (
            <Alert bsStyle={this.state.success ? "info" : "danger"}>
              {this.state.message}
            </Alert>
          )}
          {!this.state.success && (
            <div>
              <FormGroup className={s.formGroup}>
                <FormControl
                  className={s.input}
                  placeholder="Username or email address..."
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={e => this.onChange(e)}
                  autoFocus
                />
              </FormGroup>
              {this.state.errors && (
                <Card bg="danger">
                  <Card.Header>Form Errors</Card.Header>
                  <ul>
                    {Object.keys(this.state.errors).map((error, j) => (
                      <li key={j}>
                        {error} - {this.state.errors[error]}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
              <Button className={s.loginButton} block type="submit">
                Request Credentials
              </Button>
              <br />
            </div>
          )}
          <p>
            <Link to={`/`}>🡐 Back to Login</Link>
          </p>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(Form);
