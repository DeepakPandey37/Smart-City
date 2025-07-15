import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { toast } from 'sonner'; 
import { setUser } from '@/Redux/authSlice';
import { USER_API_ENDPOINT } from '@/Utils/api';

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div className="font-mono text-2xl">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">
              Smart <span className="text-purple-600">City</span>
            </h1>
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          <ul className="flex gap-5 font-mono text-lg">
            {user && user.role === 'admin' ? (
              <>
                <li><Link to={"/admin/complaints/table"}>Complaints</Link></li>
                 <li><Link to={"/admin/notice"}>Notice</Link></li>
              </>
            ) : (
              <>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/registercomplaint"}>Register-Complaint</Link></li>
                <li><Link to={"/getAll"}>All-Complaints</Link></li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex gap-2">
              <Link to={"/login"}><Button variant="link">Login</Button></Link>
              <Link to={"/signup"}><Button>Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname)}`
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      className="w-10 h-10 rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio set"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 items-center justify-between">
                  <Button variant="link" className="flex items-center gap-1">
                    <User2 size={16} />
                    <Link to={"/profile"}>View Profile</Link>
                  </Button>
                  <Button
                    variant="link"
                    className="flex items-center gap-1"
                    onClick={logoutHandler}
                  >
                    <LogOut size={16} />
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
