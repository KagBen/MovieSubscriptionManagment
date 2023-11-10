const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '  API Documentation for Gateway to diffrent Microservices',
    version: '1.0.0',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./Routers/*.js'], // specify the path to your router files
};

module.exports = swaggerOptions;