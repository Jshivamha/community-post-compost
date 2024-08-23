import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/auth/authContext';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async() => {    
      try{
          const response = await axios.post('http://localhost:3000/logout',{},{ withCredentials: true});
          if(response.status === 200){
              toast({
                  className: "bg-black border-green-500",
                  description: "Successfully logged Out ",
              })
          }

          setTimeout(() => {
              logout();
              navigate('/');
          },1000)
      }catch(err){
          console.log(err);   
      }
  }

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-black bg-opacity-50">
      <div className={"container mx-auto px-8 py-6 flex items-center " + (isAuthenticated ? "" : "justify-between")}>
        <div className='flex items-center'>
          <svg className='h-6 mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#ffffff" d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z"/>
          </svg>        
          <div className="text-2xl font-mono font-semibold text-white mr-14">Compost</div>
        </div>
        {
          isAuthenticated ?
          <div className='flex bg-transparent w-full justify-between items-center'>
            <div>
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-8 mt-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/u/dashboard" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">Dashboard</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/u/all-communities" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">All Communities</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/u/my-communities" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">My Communities</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/u/my-posts" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">My Posts</NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div>
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-8 mt-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink onClick={() => handleSubmit()} className="text-white cursor-pointer font-mono text-lg hover:text-gray-500 transition-colors duration-300">Logout</NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          :
          <div>
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8 mt-1">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/signup" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">Sign Up</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="font-mono text-lg text-gray-500">/</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login" className="text-white font-mono text-lg hover:text-gray-500 transition-colors duration-300">Log In</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
