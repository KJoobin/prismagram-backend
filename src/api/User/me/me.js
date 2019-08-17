import { prisma } from "../../../../generated/prisma-client";

export default {
  Query:{
    me: (_, __, { request }) => {
      const { user } = request;
      console.log(user.id)
      return prisma.user({ id : user.id })
    }
  }
}
