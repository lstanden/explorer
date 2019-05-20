const accepts = require("accepts");
const express = require("express");
const fs = require("fs");
const glob = require("glob");
const next = require("next");
const path = require("path");
require("dotenv").config();

global.Headers = global.Headers || require("fetch-headers");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const supportedLanguages = glob
  .sync("../lang/*.json")
  .map(f => path.basename(f, ".json"));

const localeCacheData = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split("-")[0];
  if (!localeCacheData.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = fs.readFileSync(localeDataFile, "utf8");
    localeCacheData.set(lang, localeDataScript);
  }

  return localeCacheData.get(lang);
};

const getMessages = locale => {
  return require(`../lang/${locale}.json`);
};

app.prepare().then(() => {
  const server = express();
  server.use((req, res, next) => {
    const accept = accepts(req);
    const locale =
      accept.language(accept.languages(supportedLanguages)) || "en";
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = dev ? {} : getMessages(locale);
    next();
  });

  server.get(
    [
      "/",
      "/clades",
      "/clades/:cladeId",
      "/clades/depth/:depth",
      "/clades/:cladeId/depth/:depth",
      "/info/:cladeId"
    ],
    (req, res) => {
      return app.render(req, res, "/clades", req.params);
    }
  );

  server.get("/transactions", (req, res) => {
    return app.render(req, res, "/transactions", req.params);
  });

  server.get("/logout", (req, res) => {
    return app.render(req, res, "/logout", req.params);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
