import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

const CommunityPage = () => {
  const { id } = useParams(); // Get the community ID from the URL
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  const [getAllPosts,setgetAllPosts] = useState([])
  const [isOpennew, setIsOpennew] = useState(false);
  const [isOpendelete, setIsOpendelete] = useState(false);
  const [isOpenleave, setIsOpenleave] = useState(false);

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    Communityname: '',
    Communitydescription: ''
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.Postname || !formData.Postdescription){
        toast({
            className: "bg-black border-red-500 text-white",
            description: "Incomplete fields",
        });
        return;
    }

  try {
    formData.commId = id;
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/u/comm/post/create-post`, formData);
    
    if(response.status === 200){
        toast({
            className: "bg-black border-green-500",
            description: "Your Post is Created",
        })
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/u/comm/community/${id}`)
            setgetAllPosts(response.data.Communities)
        }
        catch(err){
            console.log(err);
        }
        setIsOpennew(false);
    }
    

  } catch (error) {
      toast({
        className: "bg-black border-red-500 text-white",
        description: error.response.data.err || "An error occurred while creating Post",
      });
      console.error('Error creating post');
    }
  };


  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/u/comm/community/${id}`);
        setCommunity(response.data);
      } catch (error) {
        console.error("Failed to fetch community", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!community) return <div>Community not found.</div>;

  return (
    <div className="min-h-screen text-white p-6">
      <Toaster />
      {/* Community Header */}
      <div className="pb-6 flex justify-between items-center">
        <div className="">  
          <h1 className="text-4xl font-bold">{community.Communityname}</h1>
          <p className="text-lg text-muted-foreground mt-2">{community.Communitydescription}</p>
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm font-medium">Made by: {community.ownerUsername}</span>
            <span className="text-sm font-medium">
              {community.members?.length === 1
                ? "1 Member"
                : `${community.members?.length ?? 0} Members`}
            </span>
          </div>
        </div>
        <div className="">
          <Dialog opennew={isOpennew} onOpenChange={setIsOpennew}>
            <DialogTrigger asChild>
            <Button className='text-[20px] font-mono max-w-fit px-4 py-1 rounded-md bg-gray-900' onClick={() => setIsOpennew(true)} >New Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] border-gray-900">
                <DialogHeader>
                  <DialogTitle className='text-2xl font-bold'>Create a New Post!</DialogTitle>
                  <DialogDescription className='text-md'>
                  Share your thoughts, ideas, or updates with the community. Add a title, description, and optional image to start the discussion.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Postname" className="text-right text-md">
                        Title
                        </Label>
                        <Input onChange={handleChange} id="Postname" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Postdescription" className="text-right text-md">
                        Description
                        </Label>
                        <Input onChange={handleChange} id="Postdescription" className="col-span-3" />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Community Posts Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <div className="mt-4 space-y-4">
          {community.posts && community.posts.length > 0 ? (
            community.posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition"
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{post.description}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  Posted by: {post.authorUsername}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No posts yet. Be the first to post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
