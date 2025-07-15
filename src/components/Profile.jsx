import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Pen, Mail, Contact } from 'lucide-react';

import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import ComplaintTable from './ComplaintTable';
import UpdateProfileDialog from './UpdateProfileDialog';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="rounded-full object-cover h-full w-full"
                src={user?.profile?.profilePhoto}
                alt="User"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className="my-6">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4" />
            <span>{user?.phonenumber}</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Complaints</h2>
          <ComplaintTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
