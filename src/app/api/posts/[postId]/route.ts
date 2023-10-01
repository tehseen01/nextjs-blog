import prisma from "@/lib/db";
import { deleteFileFromCloudinary } from "@/utils/deleteFileFromCloudinary";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { getPublicIdCloudinary } from "@/utils/getPublicIdCloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";

//@description     Get a single post
//@route           GET /api/posts/[post.path]
//@access          Not protected
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findFirst({
      where: { path: params.postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            bio: true,
            followerIDs: true,
            followingIDs: true,
            site: true,
            posts: {
              take: 4,
              select: {
                id: true,
                path: true,
                title: true,
              },
            },
          },
        },
        _count: { select: { comments: true } },
      },
    });

    if (post) {
      await prisma.post.update({
        where: { id: post.id },
        data: { views: post.views + 1 }, // Increment the views by 1
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Post not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//@description     Update a single post
//@route           PATCH /api/posts/[post.path]
//@access          protected
export async function PATCH(req: NextRequest) {
  try {
    const { title, content, image, userId, postId, type } = await req.json();

    const userID = await getDataFromToken(req);
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "You are not authorize!" },
        { status: 401 }
      );
    }

    if (userID !== userId) {
      return NextResponse.json(
        { success: false, message: "UserId not match" },
        { status: 404 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || !postId) {
      return NextResponse.json(
        { success: false, message: "Invalid post ID!" },
        { status: 404 }
      );
    }

    const updatedData: Prisma.PostUpdateInput = {};

    if (title !== post.title) {
      updatedData.title = title;
    }

    if (content !== post.content) {
      updatedData.content = content;
    }

    if (image !== post.image) {
      if (post.image) {
        const publicId = getPublicIdCloudinary(post.image);
        await deleteFileFromCloudinary(publicId!, "articles");
      }

      if (image === null) {
        updatedData.image = null;
      } else {
        const newImage = await uploadImageToCloudinary(image, "blog/articles");
        updatedData.image = newImage.secure_url;
      }
    }

    if (type !== post.type) {
      updatedData.type = type;
    }

    if (Object.keys(updatedData).length > 0) {
      await prisma.post.update({
        where: { id: post.id },
        data: updatedData,
      });
    }

    return NextResponse.json(
      { success: true, message: "Your post has updated successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//@description     Delete a single post
//@route           DELETE /api/posts/[post.path]
//@access          protected
export async function DELETE(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("id");
    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Invalid post ID!" },
        { status: 404 }
      );
    }

    const userID = await getDataFromToken(req);
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "You are not authorize!" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findFirst({
      where: { id: postId, authorId: userID },
    });
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found!" },
        { status: 404 }
      );
    }

    if (post.image) {
      const publicID = getPublicIdCloudinary(post.image);
      await deleteFileFromCloudinary(publicID!, "articles");
    }

    const deleteToComment = await prisma.comment.findMany({
      where: { postId: post.id },
    });

    // Delete all comments and there replies associated with the post
    for (const deleteId of deleteToComment) {
      const repliesToDelete = await prisma.reply.findMany({
        where: { commentId: deleteId.id },
      });
      for (const deleteReply of repliesToDelete) {
        await prisma.reply.delete({
          where: { id: deleteReply.id },
        });
      }

      await prisma.comment.delete({
        where: { id: deleteId.id },
      });
    }

    await prisma.post.delete({
      where: { id: post.id, authorId: userID },
    });

    return NextResponse.json(
      { success: true, message: "Your post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
