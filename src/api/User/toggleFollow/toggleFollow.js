import { prisma } from "../../../../generated/prisma-client"

export default {
  Mutation:{
    toggleFollow: async (_, args, { request,isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const filterOptions = {
        AND:[
          {
            following_some: { id }
          },
          {
            id: user.id
          }
        ]
      };
      try {
        const existingFollow = await prisma.$exists.user(filterOptions);
        if(existingFollow) {
          await prisma.updateUser({
            where:{
              id: user.id
            },
            data: {
              following: {
                disconnect: {
                  id
                }
              }
            }
          })
        } else {
          await prisma.updateUser({
            where:{
              id: user.id
            },
            data: {
              following: {
                connect: {
                  id
                }
              }
            }
          })
        };
        return true;
      } catch (error){
        return false;
      }
    }
  }
}
