import React from "react";
import { Coin,Card1, Section,Card, Mac , LargeText, SmallText,
    Underline, Card2, Card3,JobSection, LandingP, Trophy, Sprinkle, DoodleArrow} from "./LandingContent";
// import { CircleDoodle } from "../Global/GlobalComponents";
import { Headline } from "../HeroSection/HeroElements";
import { Btn, P , WhiteBtn, Arrow} from "../Global/GlobalComponents";
import 'aos/dist/aos.css';
import CircularStatic from "../Global/CircularProgress";
import { useEffect } from "react";
import AOS from 'aos';
import { NavBtnLink } from "../NavBar/NavBarElement";
import Footer from '../Footer/index'
import { useNavigate } from "react-router-dom";

export const LandingSection=()=>{
    useEffect(() => {
        AOS.init({
          duration: 1000,
           once: false,
           delay:30000,
        });
      }, []);
const navigate=useNavigate();



         return( < > 
         
         
          <JobSection   >
         <LargeText data-aos="slide-up">Find a job 
<br/> that actually 
<br/>suits you.</LargeText>   
<div style={{display:"flex",alignItems: "flex-end"}}>
<SmallText>
Don't let top talent slip through your fingers! Solve job challenges, pass real-time interviews and join the companies that are looking to hire you.  </SmallText>
<DoodleArrow/>
</div>
<WhiteBtn style={{margin :'220px 0 0 60px'}} onClick={()=>navigate('/login')}>Explore jobs <Arrow/>  
</WhiteBtn>
      </JobSection> <Card><Mac /></Card>
     
      <div style={{position: "absolute", top:"1720px", left:"400px" , margin:"auto"}}> 
      <div style={{display:"flex" , alignItems: "baseline"}}>
      <Headline data-aos="slide-up">Master your <Underline/>paths </Headline><Sprinkle/> </div> 
      <LandingP data-aos="slide-up">How does it work? Take these three simple steps and
        see if you’re the lucky one !</LandingP>
      </div>

      <div>
  <Card1 data-aos="slide-up" ><LargeText>1</LargeText> 
  <SmallText>Choose your own learning 
path to improve your skills, 
or explore courses and
recommendations.</SmallText>  
 </Card1>
  <Card2 data-aos="slide-up"><LargeText>2</LargeText>
<SmallText>Learn, <br/> Practice, <br/>Repeat.</SmallText>  
</Card2>
   <Card3 data-aos="slide-up"><LargeText>3</LargeText> 
<SmallText>Race to the Top of Machine Learning mastery with Fun and Engaging  hackathons.</SmallText><Trophy/></Card3>
   <Coin data-aos="slide-up"/> 
   <div style={{position: 'absolute',top:"3140px" , color:"white", width:"700px", left: "600px" }}>
    <Headline data-aos="slide-left">Earn points and build 
        up your profile.</Headline>
        <NavBtnLink  onClick={()=>navigate('/login')} style={{ position: 'absolute',top:"840px", marginTop:"20px", fontSize:"large",  padding:'  10px 14px'}}>Get started <Arrow/></NavBtnLink>
        </div>
     <div style={{position: 'absolute',top:"4840px", width :"100%", marginBottom:0}}>  <Footer/></div>
   
    <Section className="section" ></Section> </div> 
    </> ) 
}