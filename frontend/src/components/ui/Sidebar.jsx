import React from "react";
import { IoMdHome } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineDynamicFeed } from "react-icons/md";

const Sidebar = ({
  isCustomFeedsOpen,
  toggleCustomFeeds,
  isCommunitiesOpen,
  toggleCommunities,
  setCreateCommunityModalOpen,
}) => {
  const sidebarItems = [
    { icon: <IoMdHome />, text: "Home" },
    { icon: <BsGraphUpArrow />, text: "Popular" },
    { icon: <IoSearchOutline />, text: "Explore" },
    { icon: <MdOutlineDynamicFeed />, text: "All" },
  ];

  return (
    <aside className="w-64 bg-black-800 p-4">
      <nav>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="flex items-center mb-4">
              <span className="mr-2">{item.icon}</span>
              <span className="text-gray-400">{item.text}</span>
            </li>
          ))}
          <li>
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={toggleCustomFeeds}
            >
              <span className="text-gray-400">Custom Feeds</span>
              <span>{isCustomFeedsOpen ? "▲" : "▼"}</span>
            </div>
            {isCustomFeedsOpen && (
              <ul className="ml-4 text-gray-400">
                <li className="mb-2">Feed 1</li>
                <li className="mb-2">Feed 2</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
