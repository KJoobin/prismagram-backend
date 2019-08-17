import { prisma } from "../../../../generated/prisma-client"
import { isAuthenticated } from "../../../middlewares"

export default {
  Query:{
    seeProfile: async (_, args) => {
      const { username } = args;
      const user = await prisma.user({ username })
      const posts = await prisma.user({ username }).posts()
      return {
        user,posts
      }
    }
  },
}
