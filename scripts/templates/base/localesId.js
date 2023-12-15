module.exports = (_, name) => ({
  type: "locales",
  folder: "locales",
  content: `export default {
  index: {
    title: "${name}",
  },
} as const;
  `,
  extension: `id.ts`,
});
