const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation microservice Users",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`, // Replace with the URL of your server
    },
  ],
  apis: ["./index.js"], // Point to your index file - or to routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;
