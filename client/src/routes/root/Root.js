import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';


class Root extends React.Component {

}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Root);
