import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    followers: ({ id }) => prisma.user({ id }).followers(),
    following: ({ id }) => prisma.user({ id }).following(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    fullName: parent => {
      return `${parent.firstName} ${parent.username}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    postCount: ({ id }) =>
    prisma
      .postsConnection({
        where:{ user: { id } } })
      .aggregate()
      .count(),
    followingCount: ({ id }) =>
    prisma
      .usersConnection({ where : { following_some : { id } } })
      .aggregate()
      .count(),
      followerCount: ({ id }) =>
      prisma
        .usersConnection({ where : { followers_some : { id } } })
        .aggregate()
        .count(),
  },
}

//3.14~
