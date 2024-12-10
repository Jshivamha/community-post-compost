import React from "react";

const Post = ({ post }) => (
  <div className="bg-black rounded-lg p-4 mb-6 shadow-md border-white border-2">
    <div className="flex items-center justify-between">
      <div>
        <span className=" text-blue-500">{post.community?.Communityname || "Last Updated"}</span>
        <span className="text-gray-600 mx-2">•</span>
        <span className="text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
    <h2 className="text-lg font-bold mt-2">{`${post.Postname}`}</h2>
    <p className="mt-2 text-gray-300">{post.Postdescription}</p>
  </div>
);

export default Post;
