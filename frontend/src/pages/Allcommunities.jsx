import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { toast, useToast } from '@/components/ui/use-toast';
import { Separator } from '@radix-ui/react-separator';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import not_found from '../assets/not_found.svg'
import { TbArrowsJoin } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Allcommunities = () => {
  const [allComms, setAllComms] = useState([]);
  const [filteredComms, setFilteredComms] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // ensure allcoms is a array before filtering it
    if(Array.isArray(allComms)){
      setFilteredComms(allComms.filter(comm =>
        comm.Communityname.toLowerCase().includes(searchTerm)
      ));
    }
  };

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/u/comm/all-community`);
        const communities = response.data.Communities;
        setAllComms(communities);
        setFilteredComms(communities);
      } catch (err) {
        console.log(err);
      }
    };
    getCommunities();
  }, []);


  const handlejoincomm = async (communityId) => {
    console.log(communityId);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/u/comm/add-to-community`, {
        communityId,
       });
    
        console.log(response.status);

        if(response.status === 200){
            toast({
                className: "bg-black border-green-500",
                description: "Community joined",
            })
        }
    }catch(err){
        console.log(err.message);
    }
  }

  const handleNavigation = (commId) => {
    navigate(`/u/community/${commId}`); // Navigate to the page with community ID in the URL
  };

  return (
    <div className='p-2'>
      <Toaster />
      <div className='flex flex-col w-[800px] max-h-fit space-y-8'>
        <div className='flex justify-between'>
          <p className='text-[20px] font-mono max-w-fit px-4 py-1 rounded-md bg-gray-900'>
            All Communities
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
          <Input onChange={handleChange} id="search" className="col-span-3" placeholder="Search" />
        </div>
        <div className='flex flex-col space-y-8'>
        
          {
          filteredComms?.length === 0?
            <div className="pt-12 flex flex-col space-y-5 text-center text-white">
                <img className='h-[14rem]' src={not_found} />
                <p className='text-xl font-mono'>No Communities found</p>
            </div>
          :
          filteredComms?.map((comm) => (
            <div key={comm._id} onClick={() => handleNavigation(comm._id)} className='border rounded-md border-gray-800 p-4 cursor-pointer'>
              <div className="space-y-1">
                <h4 className="text-2xl font-semibold font-mono leading-none">
                  {comm.Communityname}
                </h4>
                <p className="text-lg font-medium text-muted-foreground">
                  {comm.Communitydescription}
                </p>
              </div>
              <Separator className="my-5" />
              <div className="flex justify-between">
                <div className="flex font-mono text-md h-5 items-center space-x-4">
                  <div>Made by {comm.ownerUsername}</div>
                  <Separator orientation="vertical"/>
                  <div className='flex items-center space-x-2'>
                    <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/>
                    </svg>                            
                    <p>{(comm.members?.length ?? 0) === 1 ? `1 Member` : `${comm.members?.length ?? 0} Members`}</p>
                  </div>
                </div>
                <div className="">
                  <TbArrowsJoin onClick={() => {handlejoincomm(comm._id)}} size={24} className='hover:size-8 duration-300' />
                </div>
              </div>
            </div>
          ))
          }

        </div>
      </div>
    </div>
  );
};

export default Allcommunities;
