import React , {useState}from 'react'
import {Sidebar} from '../components/Sidebar'
import {NavBar} from '../components/NavBar';
 import {Hero} from '../components/HeroSection';
import {ScrollText} from '../components/ScrollingText';
import { LandingSection } from '../components/LandingSection';
import {Hackathoncode} from '../components/Global/Hackathon'
import Footer from '../components/Footer';
export const Landing = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle =( )=>{

    setOpen(!isOpen);
  };
  return (
   <>
   <NavBar toggle={toggle}/>
   <Sidebar isOpen={isOpen} toggle={toggle} />
   <Hero/>
   <ScrollText/>
<LandingSection/>
    </>
  );
};
  