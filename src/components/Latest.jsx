import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPLAINT_API_ENDPOINT } from '@/Utils/api';
import { Loader2 } from 'lucide-react';

const Latest = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${COMPLAINT_API_ENDPOINT}/notifications/get`, {
        withCredentials: true,
      });

      if (res.data.success && Array.isArray(res.data.notifications)) {
        setNotifications(res.data.notifications);
        console.log(res.data.notifications)
      } else {
        console.warn("No notifications found or wrong format.");
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">📢 Latest Notifications</h1>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin" /> Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-muted-foreground">No notifications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notifications.map((note) => (
            <Card key={note._id} className="shadow-sm border border-muted">
              <CardHeader>
                <CardTitle className="text-lg">{note.noticeTitle}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{note.noticeDescription}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Latest;
