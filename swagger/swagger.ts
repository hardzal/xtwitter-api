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
            type: 'string',
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
          newPassword: {
            type: 'string',
          },
        },
      },
      ChangePasswordDTO: {
        type: 'object',
        properties: {
          oldPassword: {
            type: 'string',
          },
          newPassword: {
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
      UpdateThreadDTO: {
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
      CreateUserDTO: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
        },
      },
      UpdateProfileDTO: {
        type: 'object',
        properties: {
          fullName: {
            type: 'string',
          },
          avatar: {
            type: 'file',
          },
          bannerURL: {
            type: 'file',
          },
          bio: {
            type: 'string',
          },
        },
      },
      CreateLikeDTO: {
        type: 'object',
        properties: {
          threadId: {
            type: 'string',
          },
        },
      },
      CreateLikeReplyDTO: {
        type: 'object',
        properties: {
          replyId: {
            type: 'string',
          },
        },
      },
      CreateReplyDTO: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
          },
        },
      },
      CreateFollowDTO: {
        type: 'object',
        properties: {
          followedId: {
            type: 'string',
          },
        },
      },
      DeleteFollowDTO: {
        type: 'object',
        properties: {
          followedId: {
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
