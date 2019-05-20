import React from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";

import Auth from "@src/components/Auth";

import s from "./logout.scss";
import { defineMessages, FormattedMessage } from "react-intl";

const messages = defineMessages({
  title: "Logout",
  summary: "You have been logged out!",
  redirect: "You will be logged out in 5 seconds {clickHere}",
  clickHere: "Click here to go back home"
});

export default function Logout() {
  React.useEffect(() => {
    Auth.deauthenticateUser();
    setTimeout(() => Router.push(`/`), 5000);
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>
          <FormattedMessage {...messages.title} />
        </h1>
        <hr />
        <p>
          <FormattedMessage {...messages.summary} />
        </p>
        <p>
          <FormattedMessage
            {...messages.redirect}
            values={{
              clickHere: (
                <Link href="/">
                  <FormattedMessage {...messages.clickHere} />
                </Link>
              )
            }}
          />
        </p>
      </div>
    </div>
  );
}
