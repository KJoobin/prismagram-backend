export const isAuthenticated = (request) => {
  if(!request.user){
    throw Error("you need to log in preform this action")
  } else {
    return
  }
}
