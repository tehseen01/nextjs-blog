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
  image: string;
  content: string;
  path: string;
  author: TUser;
  tags: string[];
  comments: TComment[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    comments: number;
  };
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
  replies: TReply[];
  _count: {
    replies: number;
  };
};

export type TReply = {
  id: string;
  content: string;
  author: TUser;
  authorId: string;
  comment: TComment;
  commentId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TCommentReplyOption = {
  data: TComment | TReply;
  type: "comment" | "reply";
  postPath: string;
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
