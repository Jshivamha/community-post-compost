import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/ui/Sidebar";
import Post from "../components/ui/Post";

const Dashboard = () => {
  const [posts, setPosts] = useState([]); 
  const [isCustomFeedsOpen, setIsCustomFeedsOpen] = useState(false);
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/post/getAllPosts`, 
          { withCredentials: true }
        );
        setPosts(response.data.data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      <div className="flex">
        
        <Sidebar
          isCustomFeedsOpen={isCustomFeedsOpen}
          toggleCustomFeeds={() => setIsCustomFeedsOpen((prev) => !prev)}
          isCommunitiesOpen={isCommunitiesOpen}
          toggleCommunities={() => setIsCommunitiesOpen((prev) => !prev)}
          setCreateCommunityModalOpen={setCreateCommunityModalOpen}
        />
        
        <main className="flex-1 p-6 bg-black rounded-lg shadow-lg border-2 border-white ">
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <Post
                key={post._id}
                post={post}
                className="border border-black rounded-lg p-4 bg-black shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
