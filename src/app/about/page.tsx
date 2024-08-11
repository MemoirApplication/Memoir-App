"use client";

import React from 'react';
const About = () => {
  return (
  <div className=''>
    <h1 style={{
      textAlign: 'center',
      fontSize: '36px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginTop: '20px'
      }}>About Us
    </h1>
    <br />
      <h2 style={{fontSize: '24px'}}> * Intro :</h2>
      <p>We are a team of passionate developers with a love for simplicity and productivity. <br />
        Our combined experience in software development, user interface design, and project management <br />
        has led us to create a note-taking app application that is both powerful and user-friendly.
      </p>
        <h3 style={{fontSize: '18px' }}> -What the Project Is !</h3>
        <p>Our application is designed to be your go-to tool for quick and efficient note-taking, <br />
          whether you are jotting down ideas, organizing tasks, or drafting documents.
        </p>
        <br />
      <h2 style={{fontSize: '24px'}}> * Features and Benefits :</h2>
      <p>Unlike other note-taking apps, our Notepad offers <br />
        [unique features like a distraction-free interface,
        customizable themes, AI features..] <br />
        Our focus is on making your note-taking experience as seamless and productive as possible.
      </p>
      <br />
      <h2 style={{fontSize: '24px'}}> * Vision :</h2>
        <p>We envision our note-taking app becoming an indispensable tool for <br />
          students, professionals, and creatives worldwide, continually evolving to meet the needs of our users.
        </p>
    </div>
  );
};

export default About;
