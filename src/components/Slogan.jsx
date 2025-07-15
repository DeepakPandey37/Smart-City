import React from 'react';

const Slogan = () => {
  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto bg-white text-black text-xl md:text-2xl p-4 mt-7">
      <div className="w-1/3 flex justify-start">
        <img
          src="/images/Smary-city.png" 
          alt="Smart City"
          className="h-24 md:h-32 object-contain bg-transparent"
        />
      </div>

      <div className="w-1/3 text-center font-semibold">
        "स्वच्छता ही हमारी प्राथमिकता है"
      </div>

      <div className="w-1/3 flex justify-end">
        <img
          src="/images/Swach-bharat.png" 
          alt="Specs and Indian Flag"
          className="h-24 md:h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default Slogan;
