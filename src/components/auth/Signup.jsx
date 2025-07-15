import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/Utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phonenumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);
    for (let pair of formData.entries()) {
    console.log(pair[0] + ":", pair[1]);
  }
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers:{
          "Content-Type": "multiple/form-data"
        },
       withCredentials:true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/2 bg-gray-50 rounded-md p-6 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>

          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter full name"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Create password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="my-4">
            <Label>Role</Label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="citizen"
                  name="role"
                  checked={input.role === "citizen"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label>Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="admin"
                  name="role"
                  checked={input.role === "admin"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label>Admin</Label>
              </div>
            </div>
          </div>

          <div className="my-3">
            <Label>Profile Photo (optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Account
          </Button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
