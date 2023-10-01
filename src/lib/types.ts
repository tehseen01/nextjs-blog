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
  content: any;
  path: string;
  author: TUser;
  tags: string[];
  type: "PUBLISHED" | "DRAFT";
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

export type PostType = "DRAFT" | "PUBLISHED";

type TReplyCountDashboard = {
  _count: {
    replies: number;
  };
};

type TPostDashboard = {
  id: string;
  path: string;
  title: string;
  views: number;
  type: PostType;
  createdAt: Date;
  comments: TReplyCountDashboard[];
  _count: {
    comments: number;
  };
};
export type TDashboard = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  posts: TPostDashboard[];
  _count: {
    follower: number;
    comment: number;
    following: number;
    followingTags: number;
    posts: number;
    replies: number;
  };
};

export type TTags = {
  id: string;
  label: string;
  value: string;
  description: string;
  color: string;
  User: TUser;
  userId: string;
  Post: TPost;
  postId: string;
};
