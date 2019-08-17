import { prisma } from "../../../../generated/prisma-client"
export default {
  Mutation: {
    createAccount: async (_, args) => {
      try {
        const {email, username, firstName = "", bio = ""} = args;
        const user = await prisma.createUser({
        email,
        username,
        firstName,
        bio,
        photo:"https://scontent-iad3-1.cdninstagram.com/vp/ba523e7703bfa4a2af716e67ea7aa12c/5DA39AF1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com"
      })
      return true;
    } catch (err) {
        console.log(err);
        return false;
      }
    }
  },
  Query: {
    isOverlap: async(_, args) => {
      try {
        const { email } = args;
        const user =  await prisma.user({email})
        if(user === null) {
          return false;
        } else {
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
