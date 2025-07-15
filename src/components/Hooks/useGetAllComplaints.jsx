import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setallComplaints } from '@/Redux/complaintSlice';
import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';

const useGetAllComplaints = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${COMPLAINT_API_ENDPOINT}/getAll`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setallComplaints(res.data.allcomplaints));
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, [dispatch]);
};

export default useGetAllComplaints;
