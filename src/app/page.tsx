// Use 'use client' directive for client-side components in Next.js
'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import from next/image for optimized images
import './Home2.css';

// Define a type for the state to improve type safety
type BackgroundColorState = {
  srvc: string;
  Online: string;
  Business: string;
};

export default function Home2() {
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColorState>({
    srvc: '#D616F5',
    Online: '#D616F5',
    Business: '#D616F5',
  });

  const handleMouseOver = (id: keyof BackgroundColorState) => {
    setBackgroundColor({ ...backgroundColor, [id]: '#5efc03' });
  };

  const handleMouseOut = () => {
    setBackgroundColor({
      srvc: '#D616F5',
      Online: '#D616F5',
      Business: '#D616F5',
    });
  };

  return (
    <div className="page">
      <div className="text1">
        Fact check: Smaller companies represent 90% of all companies and
        <br />
        are responsible for nearly 70% of both jobs and
        <br />
        gross domestic product (GDP) worldwide.
      </div>
      {/* Use Next.js Image component for optimized images */}
      <Image src="/homeimage.jpg" alt="" className="homeimage" layout="fill" />
      <div className="btn1">
        <button
          className="btn"
          id="srvc"
          style={{ backgroundColor: backgroundColor.srvc }}
          onMouseOver={() => handleMouseOver('srvc')}
          onMouseOut={handleMouseOut}
        >
          {/* Use Next.js Image component for optimized images */}
          <Image src="/service.jpg" alt="" className="btnimage" layout="fill" />
          <div className="btnText">Service</div>
        </button>
      </div>
      <div className="btn2">
        <button
          className="btn"
          id="Business"
          style={{ backgroundColor: backgroundColor.Business }}
          onMouseOver={() => handleMouseOver('Business')}
          onMouseOut={handleMouseOut}
        >
          {/* Use Next.js Image component for optimized images */}
          <Image src="/growbusiness.jpg" alt="" className="btnimage" layout="fill" />
          <div className="btnText">Product</div>
        </button>
      </div>
      <div className="btn3">
        <button
          className="btn"
          id="Online"
          style={{ backgroundColor: backgroundColor.Online }}
          onMouseOver={() => handleMouseOver('Online')}
          onMouseOut={handleMouseOut}
        >
          {/* Use Next.js Image component for optimized images */}
          <Image src="/onlnetraining.jpg" alt="" className="btnimage" layout="fill" />
          <div className="btnText">Online Training</div>
        </button>
      </div>

      <div className="text2">
        At Interface Hub, LLC., we believe in the power of technology to transform small businesses.
        <br />
        Our mission is to provide top-tier IT services, cutting-edge products,
        <br />
        and comprehensive training to help our clients overcome challenges and
        <br />
        capitalize on opportunities in a rapidly evolving digital landscape with
        very affordable price.
      </div>
    </div>
  );
}
