import './env';
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";
import "./passport"
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./middlewares.js"
import {
  uploadAvatarMiddleware,
  uploadAvatarController,
  uploadImageMiddleware,
  uploadImageController,
} from './upload';

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, isAuthenticated }) });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post('/api/image', uploadAvatarMiddleware, uploadAvatarController);
server.express.post('/api/feed', uploadImageMiddleware, uploadImageController);


server.start({ port : PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
