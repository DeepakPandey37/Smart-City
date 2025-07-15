import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loader2, MapPin, FileImage, CheckCircle, AlertCircle } from 'lucide-react';

const Dynamic = () => {
  const [activetab, setactiveTab] = useState('Pending');
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`${COMPLAINT_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setComplaint(res.data.getComplaint);
          setStatus(res.data.getComplaint.status);
          setactiveTab(res.data.getComplaint.status);
        } else {
          console.warn('Failed to fetch complaint:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleTabClick = async (newStatus) => {
    setactiveTab(newStatus);
    setStatus(newStatus);

    try {
      const res = await axios.post(
        `${COMPLAINT_API_ENDPOINT}/update-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log('Status updated successfully');
      } else {
        console.warn('Failed to update status:', res.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {complaint ? (
        <Card className="rounded-2xl shadow-md border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{complaint.title}</CardTitle>
            <Badge
              variant="outline"
              className={`capitalize text-sm ${
                status === 'Pending'
                  ? 'border-yellow-500 text-yellow-600'
                  : status === 'Working'
                  ? 'border-blue-500 text-blue-600'
                  : status === 'Solved'
                  ? 'border-green-500 text-green-600'
                  : 'border-red-500 text-red-600'
              }`}
            >
              {status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-600">{complaint.description}</p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} />
              <span>{complaint.location}</span>
            </div>

            <div className="text-sm text-muted-foreground">Type: {complaint.type}</div>

            {complaint.photo && (
              <div>
                <p className="text-sm mb-1 flex items-center gap-1 text-muted-foreground">
                  <FileImage size={16} /> Image of Problem:
                </p>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={complaint.photo}
                    alt="Complaint"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Change Status:</p>
              <div className="flex gap-2 flex-wrap">
                {['Pending', 'Working', 'Solved', 'Rejected'].map((label) => (
                  <Button
                    key={label}
                    variant={activetab === label ? 'default' : 'outline'}
                    onClick={() => handleTabClick(label)}
                    className="capitalize"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center text-muted-foreground py-20 gap-2">
          <Loader2 className="animate-spin" /> Loading complaint details...
        </div>
      )}
    </div>
  );
};

export default Dynamic;
