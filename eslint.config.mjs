export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/lib/posts.gen.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
