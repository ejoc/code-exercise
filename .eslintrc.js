module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["react", "import", "jsx-a11y"],
  "parser": "babel-eslint",
  "rules": {
      "semi": 0,
      "react/jsx-filename-extension": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "off",
      // "prettier/prettier": "error",
      // "typescript.suggestionActions.enabled": false,
  },
};