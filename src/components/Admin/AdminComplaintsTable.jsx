import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';


const formattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AdminComplaintsTable = () => {
  const navigate = useNavigate();
  const { allComplaints } = useSelector((store) => store.complaint);

  

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto mt-10">
      <Table>
        <TableCaption>A list of all registered complaints</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allComplaints?.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5" className="text-center">No complaints found</TableCell>
            </TableRow>
          ) : (
            allComplaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>{formattedDate(complaint.createdAt)}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint?.applicant?.fullname || "Anonymous"}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      complaint.status === "Solved"
                        ? "bg-green-200 text-green-800"
                        : complaint.status === "Working"
                        ? "bg-blue-200 text-blue-800"
                        : complaint.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/admin/complaints/${complaint._id}`)}
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View Details</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminComplaintsTable;
