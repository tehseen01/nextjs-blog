# Welcome to Nextjs-blog

This is a next-blog app that allows users to create, edit, and publish their own blog posts, as well as browse and comment on other posts. The blog app also features a responsive design, a user authentication system, and a rich text editor. This app is built with Next.js, Tailwind CSS, TypeScript, and MongoDB.

## Technologies Used

This project uses the following technologies:

- [Next.js]: A React framework for building fast and scalable web applications.
- [Tailwind CSS]: A utility-first CSS framework for rapidly building custom designs.
- [TypeScript]: A superset of JavaScript that adds static types and other features.
- [MongoDB]: A document-based database that stores data in JSON-like format.
- [NextAuth.js]: A library for implementing authentication and authorization in Next.js apps.
- [React Query]: A library for fetching, caching, and updating data in React apps.
- [React Hook Form]: A library for building forms with React hooks.
- [Redux toolkit]: A library for managing and centralizing application state.

## Features

- Create, edit, and delete blog posts using Markdown
- Preview your blog posts before publishing
- Add tags and images to your blog posts
- Follow topics and authors that interest you
- Comment on blog posts and join discussions
- React to blog posts with emojis
- Bookmark blog posts for later reading
- View your profile and stats
- Edit your profile and settings
- View the latest, top, and trending blog posts

## Installation

To run this project locally, you need to have Node.js, npm, and MongoDB installed on your machine.

1. Clone this repo to your local machine using `git clone https://github.com/tehseen01/nextjs-blog.git`
2. Navigate to the project directory using `cd nextjs-blog`
3. Install the dependencies using `npm install`
4. Create a `.env` file in the root directory and add the following variables:
    - `MONGO_URI`: The connection string to your MongoDB database
    - `JWT_SECRET`: The secret key for JSON Web Token authentication
    - `CLOUDINARY_URL`: The connection string to your Cloudinary account for image uploading
5. Start the development server using `npm run dev`
6. Open your browser and go to `http://localhost:3000` to view the app

## Usage

To use this app, you need to create an account or log in with an existing one.

To create a new blog post, follow these steps:

1. Click on the **create a post** button on the top right corner of the homepage
2. Enter a title and write your content using Markdown syntax
3. Add tags and an image to your post if you want
4. Click on the **Preview** button to see how your post will look like
5. Click on the **Save draft** button to save your post as a draft or click on the **Publish** button to publish your post

To edit or delete an existing blog post, follow these steps:

1. Go to your profile page and click on the **Dashboard** tab
2. Find the blog post you want to edit or delete and click on the **Edit** or **Delete** button
3. Make the changes you want or confirm the deletion

To follow topics or authors, follow these steps:

1. Go to the homepage and click on the **Topics** tab
2. Browse through the topics and click on the ones you want to follow
3. Go to any blog post and click on the author's name or profile picture
4. Click on the **Follow** button on their profile page

To comment on blog posts or join discussions, follow these steps:

1. Go to any blog post and scroll down to the **Comments** section
2. Write your comment in the text box and click on the **Submit** button
3. Reply to other comments or react with emojis

To bookmark blog posts for later reading, follow these steps:

1. Go to any blog post and click on the **Bookmark** icon on the bottom right corner of the post
2. Go to your profile page and click on the **Reading list** tab
3. View your bookmarked posts and click on them to read them

To view your profile and stats, follow these steps:

1. Go to your profile page by clicking on your profile picture on the top right corner of any page
2. Click on the **Profile** tab to see your basic information, bio, skills, social links, etc.
3. Click on the **Stats** tab to see your post views, reactions, comments, followers, etc.

To edit your profile and settings, follow these steps:

1. Go to your profile page by clicking on your profile picture on the top right corner of any page
2. Click on the **Settings** tab to see your account settings, email preferences, notifications, etc.
3. Make the changes you want and click on the **Save changes** button

To view the latest, top, and trending blog posts, follow these steps:

1. Go to the homepage and click on the **Latest**, **Top**, or **Trending** tabs
2. Browse through the blog posts and click on them to read them

## Contribution

This project is open for contributions. If you want to contribute to this project, please follow these guidelines:

- Fork this repository and create a new branch for your feature or bug fix.
- Write clear and descriptive commit messages and pull request titles.
- Follow the code style and conventions of the project.
- Commit and push your changes to GitHub
- Test your code before submitting a pull request.
- Respect the code of conduct and be kind to other contributors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback about this project, feel free to contact me at [tehseen.type@gmail.com](mailto:tehseen.type@gmail.com).
