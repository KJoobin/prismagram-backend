import { prisma } from "../../../../generated/prisma-client"

export default {
  Mutation:{
    uploadFeed: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { location, caption, files } = args;
      const { user } = request;
      const post = await prisma.createPost({
        caption, location,
        user:{ connect:{ id: user.id }},
      });
      if( files ) {
        files.forEach(
          async file =>
          await prisma.createFile({
            url : file,
            post: {
              connect:{
                id : post.id
              }
            }
          })
        )
      };
      return post;
    }
  }
}
