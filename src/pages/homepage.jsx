import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer'

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <section id="home" className="container mx-auto py-16">
          <h2 className="text-4xl font-bold text-center text-gray-800">Tasks</h2>
          
          <h4 className="text-1xl font-bold text-center text-gray-800">Hi this is my daily task manager, click on Tasks in navbar to go there</h4>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;


