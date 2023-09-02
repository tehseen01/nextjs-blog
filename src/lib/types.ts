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
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
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
