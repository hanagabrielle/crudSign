import globals from "globals";

export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    env: {
      node: true,
      es6: true,
    },
    globals: globals.node,
    plugins: ["js"],
    extends: ["eslint:recommended", "plugin:js/recommended"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
        globals: {
            ...globals.node
        }
   }
}
];
