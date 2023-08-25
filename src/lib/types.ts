export type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  posts: [];
  followers: [];
  followings: [];
  followingTags: [];
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  path: string;
  author: TUser;
  tags: string[];
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
};
