import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';
import { setmyComplaints } from '@/Redux/complaintSlice';

const ComplaintTable = () => {
  const {myComplaints} = useSelector((store)=>store.complaint);
  const dispatch = useDispatch();
  useEffect(
    ()=>{
      const fetchComplaints = async()=>{
        try{
       const res = await axios.get(`${COMPLAINT_API_ENDPOINT}/getComplaints`,{
          withCredentials: true,
        });
        if(res.data.success){
           dispatch(setmyComplaints(res.data.complaints))
        }
        }catch(error){
 console.error('Failed to fetch my complaints:', error);
        }
      }
      fetchComplaints();
    }, [dispatch])
  return (
    <div>
      <Table>
        <TableCaption>A list of registered complaints.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myComplaints && myComplaints.length > 0 ? (
            myComplaints.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{item?.title || 'Untitled'}</TableCell>
                <TableCell className="text-right">{item?.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No complaints found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplaintTable;
