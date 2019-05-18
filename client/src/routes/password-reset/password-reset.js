/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './password-reset.css';
import PasswordResetForm from './Form';
import { Grid, Row, Col } from 'react-bootstrap';

const title = 'Password Reset';

class PasswordReset extends React.Component {
  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
    this.state = {
      username: props.query.username,
      resetCode: props.query.resetCode,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row>
              <Col sm={6} smOffset={3}>
                <PasswordResetForm username={this.state.username} resetCode={this.state.resetCode} />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

PasswordReset.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(PasswordReset);
