import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      return prisma.post({ id })
    }
  }
}


/*
type Post {
  id: ID!
  location: String
  caption: String!
  user: User!
  files: [File!]!
  likes: [Like!]!
  isLiked: Boolean!
  comments: [Comment!]!
}
*/
