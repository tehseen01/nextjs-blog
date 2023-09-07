export type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  posts: TPost[];
  follower: [];
  followerIDs: string[];
  following: [];
  followingIDs: string[];
  followingTags: [];
  site: string;
  createdAt: Date;
  updatedAt: Date;
  comment: [];
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  path: string;
  author: TUser;
  tags: string[];
  comments: TComment[];
  createdAt: Date;
  updatedAt: Date;
};

export type TComment = {
  id: string;
  content: string;
  author: TUser;
  authorId: string;
  post: TPost;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  replies: TComment[];
  repliyId: string;
};

export type TResponseMessage = {
  success: boolean;
  message: string;
};

export type TError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};
