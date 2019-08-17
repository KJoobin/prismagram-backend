import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE"
const EDIT = "EDIT"

export default {
  Mutation:{
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, location, caption, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({
        AND:[
          {
            id: postId
        },
        {
          user:{
            id: user.id
          }
        }
        ]
      })
      console.log(post, user.id)
      if(post) {
        if(action === EDIT) {
          return prisma.updatePost({
            data:{ location, caption},
            where:{ id: postId } })
        } else if( action === DELETE) {
          return prisma.deletePost({ id: postId})
        }
      } else {
        throw Error("you don't have permission to edit post")
      }
    }
  }
}
