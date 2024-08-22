import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import loginimg from '../assets/login_img.svg'
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/authContext';

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const { toast } = useToast()
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.email || !formData.password){
          toast({
              className: "bg-black border-red-500 text-white",
              description: "Incomplete fields",
          });
          return;
      }
  
    try {
      const response = await axios.post('http://localhost:3000/login', formData, {
        withCredentials: true,
      });
      if(response.status === 200){
        toast({
            className: "bg-black border-green-500",
            description: "Successfully logged In ",
        })
        console.log('Login successful:', response.data);
        setTimeout(() => {
          navigate('/u/dashboard')
          login();
        },1000)
      }
      

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
        <div className="flex flex-col mt-10 space-y-10">
            <img className='h-[25rem]' src={loginimg} alt='signup_img' />
        </div>
        <div className="w-[500px] p-8 mr-24">
            <h2 className="text-3xl font-mono font-bold mb-6">Welcome Back! Let's Get You <span className='text-green-400'>Connected</span></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block font-mono text-white text-md font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <Input id="email" type="email" onChange={handleChange} placeholder="Enter your email" className="w-full bg-transparent border-gray-500"/>
                </div>
                <div className="mb-6">
                <label className="block font-mono text-white text-md font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <Input id="password" type="password" onChange={handleChange} placeholder="Enter your password" className="w-full bg-transparent border-gray-500"/>
                </div>
                <Button type="submit" className="w-full font-mono text-lg bg-blue-900 text-white py-2 px-4 rounded">
                Log In
                </Button>
            </form>
        </div>
    </div>
  );
}

export default Login;
