import React from 'react';
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Project from './sections/Projects.jsx';
import Clients from './sections/Clients.jsx';
import Experience from './sections/Experience.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import ScrollIndicator from './components/scroll.jsx';
import LocalChatBot from './ai/LocalChatBot.jsx';


const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar/>
      <Hero/>
      <About/>
      <Project/>
      <Clients/>
      <Experience/>
      <Contact/>
      <LocalChatBot />
      <Footer/>
      <ScrollIndicator/>
    </main>
  );
};
export default App;
