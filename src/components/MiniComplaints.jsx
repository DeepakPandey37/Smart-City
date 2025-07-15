import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Shared/Navbar';
import { Badge } from './ui/badge'; 
import { cn } from '@/lib/utils'; 

const MiniComplaints = () => {
  const { allComplaints } = useSelector((store) => store.complaint);

  return (
    <div>
     
      
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {allComplaints?.length > 0 ? (
          allComplaints.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-md rounded-lg p-6 border"
            >
              {/* Left Section */}
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="mt-3 text-sm text-gray-500">
                  Location: <span className="font-medium">{item?.location || 'Unknown'}</span>
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Complaint by: <span className="font-medium">{item?.applicant?.fullname || 'Unknown'}</span>
                </p>
                <Badge
                  className={cn(
                    "mt-2",
                    item.status === 'Solved' && 'bg-green-500 hover:bg-green-600',
                    item.status === 'pending' && 'bg-yellow-500 hover:bg-yellow-600',
                    item.status === 'Working' && 'bg-blue-500 hover:bg-blue-600',
                    item.status === 'Rejected' && 'bg-red-500 hover:bg-red-600'
                  )}
                >
                  {item.status}
                </Badge>
              </div>

              {/* Right Section */}
              <div className="md:w-1/3 mt-4 md:mt-0 md:ml-6 flex justify-end w-full">
                <img
                  src={item.photo}
                  alt="Complaint"
                  className="w-48 h-32 object-cover rounded-md border"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default MiniComplaints;
