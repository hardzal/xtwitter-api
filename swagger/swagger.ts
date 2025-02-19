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
    schemas: {
      LoginDTO: {
        $email: 'alice@prisma.io',
        $password: 'password',
      },
      RegisterDTO: {
        $fullName: 'Admin First',
        $username: 'admin_first',
        $email: 'admin_first@gmail.com',
        $password: '12345678',
      },
      ForgotPasswordDTO: {
        $email: 'admin_first@gmail.com',
      },
      ResetPasswordDTO: {
        $oldPassword: '12345678',
        $newPassword: 'password_new',
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
