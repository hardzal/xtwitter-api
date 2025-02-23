import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Circle API Project',
    description: 'XTWitter Social Media',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    '@schemas': {
      LoginDTO: {
        type: 'object',
        properties: {
          email: {
            type: 'integer',
          },
          password: {
            type: 'string',
          },
        },
      },
      RegisterDTO: {
        type: 'object',
        properties: {
          fullName: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      ForgotPasswordDTO: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
        },
      },
      ResetPasswordDTO: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
        },
      },
      CreateThreadDTO: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
          },
          images: {
            type: 'file',
          },
        },
      },
      CreateLikeDTO: {
        type: 'object',
        properties: {
          threadId: {
            type: 'string',
          },
          userId: {
            type: 'string',
          },
        },
      },
    },
  },
  host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const routes = ['./src/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
