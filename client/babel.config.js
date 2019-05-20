module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["module-resolver", { alias: { "@src": "./src" } }],
    ["react-intl-auto", { removePrefix: "src/" }],
    "import-graphql"
  ]
};
