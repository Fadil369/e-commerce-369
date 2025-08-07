module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Allow unused variables starting with underscore
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // Allow any type in some cases
    "@typescript-eslint/no-explicit-any": "warn",

    // React specific rules
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn",

    // Allow href="#" for placeholder links in development
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],

    // Next.js specific
    "@next/next/no-html-link-for-pages": "off",

    // Import rules
    "import/no-unused-modules": "off",
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "build/",
    "dist/",
    "*.config.js",
  ],
};
