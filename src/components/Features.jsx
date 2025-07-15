import React, { useState } from 'react';
import { Button } from './ui/button';
import AllComplaints from './AllComplaints';
import MiniComplaints from './MiniComplaints';
import { useNavigate } from 'react-router-dom';
import Latest from './Latest';

const Features = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("All-Complaints");

  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className="text-4xl font-bold mb-6">Features</div>

      <div className="flex gap-4 flex-wrap">
        <Button
          variant={active === "All-Complaints" ? "default" : "outline"}
          onClick={() => setActive("All-Complaints")}
        >
          All Complaints
        </Button>

        <Button
          variant={active === "Register-Complaints" ? "default" : "outline"}
          onClick={() =>  
            navigate("/registercomplaint")}
        >
          Register Complaint
        </Button>

        <Button
          variant={active === "Latest-Notification" ? "default" : "outline"}
          onClick={() => setActive("Latest-Notification")}
        >
          Latest Notification
        </Button>
      </div>

      <div className="mt-8">
        {active === "All-Complaints" && <MiniComplaints />}
        
        {active === "Latest-Notification" && <Latest />}
      </div>
    </div>
  );
};

export default Features;
