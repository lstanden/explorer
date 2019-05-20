import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { IntlProvider, addLocaleData } from "react-intl";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import Header from "@src/components/Header";
import Footer from "@src/components/Footer";

import "@src/main.scss";

if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default class ExplorerApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();

    return { pageProps, locale, messages, initialNow };
  }

  render() {
    const { Component, pageProps, locale, messages, initialNow } = this.props;
    return (
      <Container>
        <Head>
          <title>Phylogony Explorer</title>
        </Head>
        <IntlProvider
          locale={locale}
          defaultLocale="en-US"
          messages={messages}
          initialNow={initialNow}
        >
          <div className="flex-grow">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </IntlProvider>
      </Container>
    );
  }
}
