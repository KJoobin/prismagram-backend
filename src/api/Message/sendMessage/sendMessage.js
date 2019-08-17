import { prisma } from "../../../../generated/prisma-client"

export default{
  Mutation:{
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { message, roomId, to } = args;
      const { user } = request;
      let getTo;
      let room;
      if(roomId === undefined) {
        if( to !== undefined) {
          room = await prisma.createRoom({
            participants:{
              connect:[
                { id: to }, { id: user.id }
              ]
            }
          })
        } else {
          throw Error ("room and to is undefined")
        }
      } else {
        const participants = await prisma
        .room({id: roomId})
        .participants();
        getTo = participants.filter(part => part.id !== user.id)[0]
      }
      return prisma.createMessage({
        text: message,
        from:{
          connect:{
            id : user.id
          }
        },
        to: {
          connect:{
            id: to||getTo.id
          }
        },
        room: {
          connect:{
            id: roomId||room.id
          }
        }
      })
    }
  }
}
