import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request,isAuthenticated }) => {
      isAuthenticated(request);
      const { username, firstName, bio, photo } = args;
      const { user } = request;
      console.log(args);
      return prisma.updateUser({
        where:{
          id: user.id
        },
        data:{
          username,
          firstName,
          bio,
          photo
        }
      })
    }
  }
}
