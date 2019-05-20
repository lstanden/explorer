import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Auth from "@src/components/Auth";
import Link from "@src/components/Link";
import strings from "@src/strings";
import s from "./Header.scss";

export const messages = defineMessages({
  login: "Login / Signup",
  transactions: "Transactions",
  profile: "Profile",
  settings: "Settings",
  logout: "Log out",
  manageUsers: "Manage users",
  manageRoles: "Manage roles"
});

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      role: null,
      username: null,
      currentKey: 6
    };
  }

  componentDidMount() {
    this.onAuthenticationStatusChange(Auth.isUserAuthenticated());
    Auth.addListener(this.onAuthenticationStatusChange.bind(this));
  }

  onAuthenticationStatusChange(status) {
    this.setState({
      isAuthenticated: status,
      role: Auth.getRole(),
      username: Auth.getUsername()
    });
  }

  render() {
    return (
      <Navbar variant="dark" className={s.header}>
        <Navbar.Brand to="/home" as={Link} className={s.brand}>
          <img src="/static/images/logo.svg" className={s.logo} />{" "}
          <FormattedMessage {...strings.name} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="mr-auto" />

        {!this.state.isAuthenticated && (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/home">
                <FormattedMessage {...messages.login} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        {this.state.isAuthenticated && (
          <Nav>
            <NavDropdown title={Auth.getUsername()} id="nav-dropdown" alignRight>
              <NavDropdown.Item eventKey="4.1" as={Link} to="/transactions">
                <FontAwesomeIcon icon="list" />{" "}
                <FormattedMessage {...messages.transactions} />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="5.1" as={Link} to="/profile">
                <FontAwesomeIcon icon="user" />{" "}
                <FormattedMessage {...messages.profile} />
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="5.2" as={Link} to="/settings">
                <FontAwesomeIcon icon="cog" />{" "}
                <FormattedMessage {...messages.settings} />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="6.1" as={Link} to="/logout">
                <FontAwesomeIcon icon="user" />{" "}
                <FormattedMessage {...messages.logout} />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}

        {this.state.isAuthenticated && this.state.role === "admin" && (
          <Nav>
            <FormattedMessage {...strings.admin}>
              {admin => (
                <NavDropdown title={admin} id="admin-menu" alignRight>
                  <NavDropdown.Item eventKey="10.1" as={Link} to="/roles">
                    <FormattedMessage {...messages.manageRoles} />
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="10.2" as={Link} to="/user">
                    <FormattedMessage {...messages.manageUsers} />
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </FormattedMessage>
          </Nav>
        )}
      </Navbar>
    );
  }
}
