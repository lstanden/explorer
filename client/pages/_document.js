import Document, { Html, Head, Main, NextScript } from "next/document";

export default class ExplorerDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const {
      req: { locale, localeDataScript }
    } = ctx;
    return { ...initialProps, locale, localeDataScript };
  }

  render() {
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`;
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/images/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/images/safari-pinned-tab.svg"
            color="#212331"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="msapplication-TileColor" content="#212331" />
          <meta
            name="msapplication-TileImage"
            content="/static/images/mstile-144x144.png"
          />
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{ __html: this.props.localeDataScript }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
