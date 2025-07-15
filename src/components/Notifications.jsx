import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import Navbar from './Shared/Navbar';

const Notifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    noticeTitle: '',
    noticeDescription: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('noticeTitle', input.noticeTitle);
      formData.append('noticeDescription', input.noticeDescription);

      const res = await axios.post(`${COMPLAINT_API_ENDPOINT}/notifications`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Notification posted successfully');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to post notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      
      <Navbar/>
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl border">
        <CardHeader>
          <CardTitle className="text-2xl">Post a Notification</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="noticeTitle"
                value={input.noticeTitle}
                onChange={changeHandler}
                placeholder="e.g. Water Supply Interruption"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="noticeDescription"
                value={input.noticeDescription}
                onChange={changeHandler}
                placeholder="Briefly describe the announcement..."
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Posting...' : 'Post Notification'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Notifications;
