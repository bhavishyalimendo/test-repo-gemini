// prisma.config.cjs
require("dotenv/config");
const { defineConfig, env } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  // optional, if you want to be explicit:
  // migrations: { path: "prisma/migrations" },
});
