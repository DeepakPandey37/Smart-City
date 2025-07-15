import React, { useState } from 'react';
import Navbar from './Shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';

const Register = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    file: null, // 🔁 changed from photo → file
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("location", input.location);
      formData.append("type", input.type);
      formData.append("file", input.file || "https://via.placeholder.com/150"); // 🔁 changed photo → file

      const res = await axios.post(`${COMPLAINT_API_ENDPOINT}/registerComplaint`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Complaint registered successfully');
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to register complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl font-bold p-5">Register a Complaint</h1>
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="border rounded-md border-gray-200 p-6 bg-white shadow-xl w-full max-w-2xl"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={input.title}
                onChange={changeHandler}
                placeholder="e.g. Garbage not collected"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={input.description}
                onChange={changeHandler}
                placeholder="Explain your complaint..."
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={input.location}
                onChange={changeHandler}
                placeholder="e.g. Sector 5, Near Park"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={input.type}
                onChange={changeHandler}
                placeholder="e.g. Garbage, Road, Electricity"
                required
              />
            </div>
            <div>
              <Label htmlFor="file">Photo (Optional)</Label>
              <Input
                id="file"
                type="file"
                name="file" // 🔁 changed from photo → file
                accept="image/*"
                onChange={changeHandler}
              />
            </div>
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
