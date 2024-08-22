import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import signupimg from '../assets/signup_img.svg';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { toast } = useToast()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password || !formData.username){
        toast({
            className: "bg-black border-red-500 text-white", // Customize the styles as needed
            description: "Incomplete fields", // Show the error message
        });
        return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status === 200){
        toast({
            className: "bg-black border-green-500",
            description: "Your account has been successfully created ",
        })
        navigate('/login');
      }
      console.log('Signup successful: ', response.data);

    } catch (error) {
        toast({
          className: "bg-black border-red-500 text-white",
          description: error.response.data.err || "An error occurred while signing up.",
        });
        console.error('Error signing up:', error);
      }
      
  };

  return (
    <div className="flex h-full justify-between items-center">
    <Toaster />
      <div className="w-[500px] ml-10 p-8">
        <h2 className="text-3xl font-mono font-bold mb-6">
          Join the Community and Share <span className='text-red-400'>Your Voice!</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-mono text-white text-md font-bold mb-2" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full bg-transparent border-gray-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-mono text-white text-md font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-gray-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block font-mono text-white text-md font-bold mb-2" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent border-gray-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full font-mono text-lg bg-blue-900 text-white py-2 px-4 rounded">
            Sign Up
          </Button>
        </form>
      </div>
      <div className="flex flex-col mr-24 mt-10 space-y-10">
        <img className='h-[25rem] ml-24' src={signupimg} alt='signup_img' />
      </div>
    </div>
  );
};

export default Signup;
