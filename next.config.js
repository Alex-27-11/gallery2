// import "dotenv/config";
require("dotenv").config();

module.exports = {
  env: {
    VITE_BASE_URL: process.env.VITE_BASE_URL,
  },
};
