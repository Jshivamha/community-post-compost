import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

const Mycommunities = () => {
    const [getAllComms,setgetAllComms] = useState([])

    const [formData, setFormData] = useState({
        Communityname: '',
        Communitydescription: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.Communityname || !formData.Communitydescription){
            toast({
                className: "bg-black border-red-500 text-white",
                description: "Incomplete fields",
            });
            return;
        }
    
      try {
        const response = await axios.post('http://localhost:3000/u/new-community', formData);
        console.log(response.status);
        
        if(response.status === 200){
          toast({
              className: "bg-black border-green-500",
              description: "Your Community is Created",
          })
            try{
                const response = await axios.get('http://localhost:3000/u/user-community')
                setgetAllComms(response.data.Communities)
            }
            catch(err){
                console.log(err);
            }
        }
        
  
      } catch (error) {
          toast({
            className: "bg-black border-red-500 text-white",
            description: error.response.data.err || "An error occurred while creating community",
          });
          console.error('Error creating community');
        }
      };

    useEffect(() => {
        const getCommunities = async () => {
            try{
                const response = await axios.get('http://localhost:3000/u/user-community')
                setgetAllComms(response.data.Communities)
            }
            catch(err){
                console.log(err);
            }
        }
        getCommunities();
    },[])

    return (
        <div className='p-2'>
            <Toaster />
            <div className='flex flex-col w-[800px] max-h-fit space-y-8'>
                <div className='flex justify-between'>
                    <p className='text-[20px] font-mono max-w-fit px-4 py-1 rounded-md bg-gray-900'>Your Communities</p>
                    <div className="space-x-4">
                        <Dialog>
                            <DialogTrigger asChild>
                            <Button className='text-[20px] font-mono max-w-fit px-4 py-1 rounded-md bg-gray-900'>New</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] border-gray-900">
                                <DialogHeader>
                                <DialogTitle className='text-2xl font-bold'>Form Your Own Community!</DialogTitle>
                                <DialogDescription className='text-md'>
                                Start a new space to connect with others. Give your community a name and description to get started
                                </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Communityname" className="text-right text-md">
                                        Title
                                        </Label>
                                        <Input onChange={handleChange} id="Communityname" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Communitydescription" className="text-right text-md">
                                        Description
                                        </Label>
                                        <Input onChange={handleChange} id="Communitydescription" className="col-span-3" />
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
                <div className='flex flex-col space-y-8'>
                    {
                        getAllComms.map((comm) => (
                            <div key={comm._id} className='border rounded-md border-gray-800 p-4'>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-semibold font-mono leading-none">{comm.Communityname}</h4>
                                    <p className="text-lg font-medium text-muted-foreground">
                                        {comm.Communitydescription}
                                    </p>
                                </div>
                                <Separator className="my-5" />
                                <div className="flex font-mono text-md h-5 items-center space-x-4">
                                    <div>Made by {comm.ownerUsername}</div>
                                    <Separator orientation="vertical"/>
                                    <div className='flex items-center space-x-2'>
                                        <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>                            
                                        <p>{comm.members.length === 1 ? `1 Member`:`${comm.members.length} Members`}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Mycommunities
