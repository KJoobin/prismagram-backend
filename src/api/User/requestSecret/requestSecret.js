import { secretGenerator, sendSecretMail } from "../../../utils"
import { prisma } from "../../../../generated/prisma-client"

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(args)
      const { email } = args;
      const [existUser, ...rest] = await prisma.users({ where:{ email }})
      const loginSecret = await secretGenerator();
            try {
              if(existUser.loginSecret) {
                return ["true","true"]
              } else {
                // throw Error("login secret is Exist");
                await sendSecretMail( email, loginSecret)
                await prisma.updateUser({data:{ loginSecret },where:{ email }});
                return ["true","false"]
             }
            } catch(err){
              console.log(err.message)
              return ["false"];
            }
    }
  }
}
