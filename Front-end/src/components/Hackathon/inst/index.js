import {Children, React, useEffect, useState} from 'react'
import { DashboardContainer, DashboardContainerDisplay } from '../../Dashboard/DashboardElements';
 
import { Arrow, BlackBtn, CheckBox, DeleteButton, GoBack, Header, P, SubHeader, TextSub, WhiteBtn } from '../../Global/GlobalComponents'; 
 import { DoodleArrow } from '../../LandingSection/LandingContent';
import TextField from '@mui/material/TextField';
import { Switch, Spacer } from "@nextui-org/react";
import { Radio, Grid } from "@nextui-org/react";
import { FilterBtnWrapper } from '../../Course/Courses/LearnElements';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { TextWrapper } from '../../HeroSection/HeroElements';
import { ContentWrapper } from '../../Course/Details/CourseElements';
import { TypeWrapper, TypeContainer, TypeCheckBox } from '../../Signup/SignupElements';
import { Link as L, Navigate, useLocation, useNavigate } from 'react-router-dom';
 import { TextEditor } from '../../Global/TextEditor';

 import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Input } from "@nextui-org/react";    
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Image } from '@mantine/core';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript'; 
import Highlight from '@tiptap/extension-highlight';
import api from '../../../api/api';
import { MdArrowBack } from 'react-icons/md';




// register languages that your are planning to use
lowlight.registerLanguage('ts', tsLanguageSyntax);

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const codeExample =
  escapeHtml(`// Valid braces Kata – https://www.codewars.com/kata/5277c8a221e209d3f6000b56

const pairs: Record<string, string> = {
  '[': ']',
  '{': '}',
  '(': ')',
};

const openBraces = Object.keys(pairs);
 
  `);
  const handleImageUpload = (file)=>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch('https://api.imgbb.com/1/upload?key=api_key', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      .catch(() => reject(new Error('Upload failed')));
  });

export function Dropzonem( props) {
  const {data,setData}=props;
  const theme = useMantineTheme();
  const [file, setFile] = useState('');
  function base64ToAscii(base64) {
    const binaryString = atob(base64);
    let asciiString = '';
  
    for (let i = 0; i < binaryString.length; i++) {
      const asciiCode = binaryString.charCodeAt(i);
      asciiString += String.fromCharCode(asciiCode);
    }
  
    return asciiString;
  }
  
  

const handledrop =(files)=>{
  setFile(files[0]);
  const reader = new FileReader();
  reader.onload = (event) => {
    const dataURL = event.target.result;
  console.log(dataURL);
  setData({...data, banner: dataURL})
}
  reader.readAsDataURL(file); 
}

  return (
    <Dropzone
    onDrop= {handledrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}  maxHeight={'250px'}
       maxWidth={'1000px'}      accept={IMAGE_MIME_TYPE} >
    <div classNames='previewImage'>
  {file ? <img  src={URL.createObjectURL(file)} alt="dropped file"  style={{ maxWidth: '100%', maxHeight: '250px' }} /> : ' '}
      </div>
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'pointer' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            The file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}





const steps = ['0', '1', '2', '3'];
export const Rte=({editorContent, setEditorContent})=>{
  const editor = useEditor({
    extensions: [
        Link,Image,
      StarterKit, 
      CodeBlockLowlight.configure({
        lowlight,    
        Underline, 
        Superscript,
        SubScript,
        Highlight,
        }), TextAlign.configure({ types: ['heading', 'paragraph']
    
      }),
    ]  , content: editorContent
    ,onUpdate() {
     setEditorContent(editor.getHTML());  
   }, 
  });
  return(
    <RichTextEditor   
    editor={editor}   controls={[
   ['bold', 'italic', 'underline', 'link', 'Embed image'],
   ['unorderedList', 'h1', 'h2', 'h3'],
   ['sup', 'sub'],
   ['alignLeft', 'alignCenter', 'alignRight'],
 ]}   onImageUpload={handleImageUpload}>
 <RichTextEditor.Toolbar>
 <RichTextEditor.ControlsGroup>
     <RichTextEditor.Bold />
     <RichTextEditor.Italic />
     <RichTextEditor.Underline />
     <RichTextEditor.Strikethrough />
     <RichTextEditor.ClearFormatting />
     <RichTextEditor.Highlight />
     <RichTextEditor.Code /> 
     {/* <RichTextEditor.CodeBlock />  */}
     
     
   </RichTextEditor.ControlsGroup>

   <RichTextEditor.ControlsGroup>
     <RichTextEditor.H1 />
     <RichTextEditor.H2 />
     <RichTextEditor.H3 />
     <RichTextEditor.H4 />
   </RichTextEditor.ControlsGroup>

   <RichTextEditor.ControlsGroup>
     <RichTextEditor.Blockquote />
     <RichTextEditor.Hr />
     <RichTextEditor.BulletList />
     <RichTextEditor.OrderedList />
     <RichTextEditor.Subscript />
     <RichTextEditor.Superscript />
   </RichTextEditor.ControlsGroup>

   <RichTextEditor.ControlsGroup>
     <RichTextEditor.Link />
     <RichTextEditor.Unlink />

   </RichTextEditor.ControlsGroup>

   <RichTextEditor.ControlsGroup>
     <RichTextEditor.AlignLeft />
     <RichTextEditor.AlignCenter />
     <RichTextEditor.AlignJustify />
     <RichTextEditor.AlignRight />
   </RichTextEditor.ControlsGroup>
 </RichTextEditor.Toolbar>

 <RichTextEditor.Content />
</RichTextEditor>)
}

const NewHackathonForm =()=>{  
  
  const [editorContents, setEditorContents] = useState([]);
  useEffect(() => {
    setEditorContents(questions.map(() => `<p>Regular paragraph</p><pre><code>${codeExample}</code></pre>`));
  }, [questions]);
  
  const handleEditorChange = (index, value) => {
    setEditorContents((prevContents) => {
      const updatedContents = [...prevContents];
      updatedContents[index] = value;
      return updatedContents;
    });
  };

 const location= useLocation();
 
 const[user, setUser]=useState('');
 useEffect(()=>{
  setUser(location.state)
  console.log(user);
 }, [])
  
useEffect(()=>{
  setData({...data, creator:user.userID})
}, [user])
  
  const [checked, setChecked] = useState(' ');
  const [selected, setSelected] =  useState('');
const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [questions, setQuestions] = useState([{
    question:'', points:'', solution:''
  }]);
  const [success, setSuccess]=useState(false)
const [auto, setAuto]= useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    background:'',
    creator:'',
    level: '',
    rules:'', 
    type:'hackathon',
    Qtype:'',
    evaluationCriteria:'',
    creationDate : new Date(), banner:'', grading:''
    
  }) 

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    } 
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => { 

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

 

  const handleTypeClick = (t) => {
    setSelected(t)
     setData({...data, Qtype: t})
  };

  const handleKeyDown = (event) => {
  
    if (event.key === 'Enter') {
      if (activeStep===0) handleSubmit( ); 
    }
  
  };
 useEffect (()=>{
  setData({
    ...data,
    level: checked
  });
 },[checked])
 
 const addQuestion = () => {
  setQuestions((prev) => [...prev, { question:'', points:'', solution:'' } ] );
};
const handlePointsChange = (index, value) => {
  setQuestions((prev) =>
    prev.map((q, idx) => (idx === index ? { ...q, points: value } : q))
  );
};
 
 const checkFields =()=>{
  const credentials = !data.name || !data.description ||!data.background || !data.evaluationCriteria || !data.level ||  !data.rules;
  if (activeStep===0 & credentials) {
    setError("Please fill all the required fields");
    return false;
  } 
  if(activeStep===1 & !selected  ) {setError('Please select your prefrences');
return false;}
  
  setError('');
  return true;
}
function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


}

const handleImageUpload = (file)=>{ 
  const formData = new FormData();
  formData.append('image', file);

  fetch('https://api.imgbb.com/1/upload?key=api_key', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {  
      console.log(result.data.url);
    })
    .catch((err) => console.log(err));
};

 const handleSubmit=()=>{
  if(!checkFields()){return;}
  handleScrollToTop();
  handleNext();


}

  const handleQuestionChange = ( value) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[0].question = value;
      return updatedQuestions;
    });
  };


useEffect(()=>{

handleQuestionChange( editorContents.toString() )
console.log(questions); 

}, [editorContents])

  const handleSolutionChange = (index, value) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index].solution = value;
      return updatedQuestions;
    });
  };
  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions]; // Create a copy of the questions array
      updatedQuestions.splice(index, 1); // Remove the question at the specified index
      return updatedQuestions;
    });
  };

 const handleCreatehack =()=>{

  api.post('/hackathons', data)
  .then(
    (result)=>{
      console.log(result.data);
      if(result.data.status==='success'){
        console.log(result.data.message);

        questions.forEach((q) => {
                                     
          api.post('/hackathons/questions', {id:result.data.id, question: q.question,
                  
                    solution: q.solution,
                    points: q.points})
              .then((res)=>{console.log(res.data);
                if(res.data.status==="success"){console.log(res.data.message);
                setSuccess(true)}
              }).catch((err)=>console.log(err))})

               
      }
    })


    .catch((error)=>{console.log(error)})


 }

 const navigate=useNavigate()
const finish=()=>{
  setSuccess('');
  navigate('/hackathons')
}
 console.log(success);
 console.log(data, questions);
 return(
    
      <div style={{background:"black", height:"100%"}}>
      <L to='/hackathons' state={user} ><GoBack color={'white'}  /></L>
     <DashboardContainerDisplay>
    <DashboardContainer style={{height:`${activeStep === 1 ? '800px':'100%'}`, margin:'70px'}}>

    <Box sx={{ width: '90%' , margin:'auto'}}> 
      <Stepper style={{flex: 1}} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel  className='HackStepper'{...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper> 
     
      {activeStep=== 0 && 
 <>
 
 <Header>Details</Header>
 <TextSub style={{width:'70%', margin:'10px 100px' }} >Tell us about your hackathon. Please provide a brief description of your hackathon, including the name, difficulty level, terms and rules and any relevant details.</TextSub>
 
 
 <P style={{fontSize:"200", margin:'20px 100px'}}>Banner(Optional)</P>
 {/* <input value={data.banner} onChange={(e)=>setData({...data , banner: e.target.value})} style={{margin:"0px 80px" }} type="file" accept="image/*"/> */}
 <Dropzonem data={data} setData={setData}/>
 
 <Box 
      
      sx={{ padding:10,
        width: '70%',
        maxWidth: '100%',
      }}
    >  

    {/* <TextEditor/> */}
      <TextField fullWidth label="Name" id="hackname" style={{margin:' 20px'}} 
                	onChange={e => setData({...data, name: e.target.value})} 
                  value={data.name}  onKeyDown={handleKeyDown}  />
       <TextField fullWidth label="Description" id="desc" style={{margin:'0 20px'}} 
                 onChange={e => setData({...data, description: e.target.value})} 
                 value={data.description}  onKeyDown={handleKeyDown}  />
      <TextField fullWidth label="Background" id="bg"  style={{margin:'20px'}} 
     multiline  onChange={e => setData({...data, background: e.target.value})} 
     value={data.background}
          rows={5}  onKeyDown={handleKeyDown} 
          />

 
  <Grid.Container gap={2}  style={{margin:'20px'}}>
    <Grid>
      <Radio.Group 
        label="Level"
        value={checked}
        color= "primary"
        onChange={setChecked }
        orientation="horizontal"  size="sm"
      >
        <Radio value="Beginner">Begginer</Radio>
        <Radio value="Intermediate">Intermediate</Radio>
        <Radio value="Expert">Expert</Radio> 
      </Radio.Group>
    </Grid> 
    </Grid.Container>
    <TextField fullWidth label="Evaluation Criteria" id="Criteria"  style={{margin:'20px'}}  multiline
          rows={5} 	onChange={e => setData({...data, evaluationCriteria: e.target.value})} 
          value={data.evaluationCriteria}  onKeyDown={handleKeyDown} 
         />
    <TextField fullWidth label="Rules" id="Rules"  style={{margin:'20px'}}  multiline
          rows={5} 	onChange={e => setData({...data, rules: e.target.value})} 
          value={data.rules}  onKeyDown={handleKeyDown} 
         />  {error && <div className='errmsg'>{error}</div>}
    </Box>
    </> 
 
   } 

   {activeStep === 1 && 
   <>
   <Header>Content questions </Header>
 <TextSub style={{width:'70%', margin:'20px 100px' }} > Create your own questions for the hackathon, or use pre-made questions from the questions bank. Please choose one to continue.</TextSub>

 <TypeWrapper>
        <TypeContainer
         onClick={() => handleTypeClick("Questions Bank")}
         >
          <input className='radio'
            type="radio"
            id="Questions Bank"
            name="type"
            value="Questions Bank"
            checked={selected === "Questions Bank"}
            onChange={() => {}}
          />
          <label htmlFor="Questions Bank">
         

            <h1>Questions Bank</h1>
          </label>
        </TypeContainer>
        <TypeContainer 
        onClick={() => handleTypeClick("Custom")}
        >
          <input  className='radio'
            type="radio"
            id="Custom"
            name="type"
            value="Custom"
            checked={selected === "Custom"}
            onChange={() => {}}
          />
          <label htmlFor="Custom">
          

            <h1>Custom</h1>
          </label>
        </TypeContainer></TypeWrapper>
     {error && <div className='errmsg'> {error}</div>}

 </>}
 {activeStep === 2 && 
 <>
            <Header>Problem statement </Header>
            <TextSub style={{width:'70%', margin:'20px 100px' }} >Add a variety of question types to your hackathon,Fill in the question prompt to challenge your participants and make your hackathon more engaging and informative. </TextSub>
         
            
            <div style={{display:'flex', justifyContent:'flex-end', alignItems:"flex-end"}}>
            {questions.length!==0 && <BlackBtn onClick={()=>setQuestions([])}>reset</BlackBtn> }
            {questions.length===0 && <div style={{display:'flex', flexDirection:'column',alignItems:"flex-end",margin:'0 40px'}}>
              <h3 style={{color:'#F989E6' , margin:'10px'}}>Click to add instructions.</h3> <DoodleArrow/></div>  }
            <BlackBtn onClick={addQuestion}>+ Instruction</BlackBtn>
            </div>
            {questions.map((q, index) => (
      <div key={index}>
        <h2 style={{ margin: '30px' }}>Instruction {index + 1}</h2>
        <Grid css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Input
            bordered
            label="Points"
            type="number"
            placeholder="0"
            value={q.points}
            onChange={(e) => handlePointsChange(index, e.target.value)}
          />
    
        </Grid>
        <Grid>
          <Rte     editorContent={editorContents}
                setEditorContent={setEditorContents}
                value={editorContents[index]}
                onChange={(value) => handleEditorChange(index, value)}
             />
          {/* <Input type='file' accept='.csv'/> */}
        </Grid>  
        
        {/* <TextField
          fullWidth
          label={`Instruction ${index + 1}`}
          id={`question${index}`}
          style={{ margin: '20px' }}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
          value={q.question}
          multiline
          rows={5}  onKeyDown={handleKeyDown} 
        /> */}
           {/* <DeleteButton onClick={() => handleDeleteQuestion(index)}>Delete</DeleteButton> */}
  
        {/* Add other fields for solution, etc. if needed */}
      </div>
    )).reverse()}
         
          <div> 
          </div>
 </>}

            {activeStep=== 3 &&
             
             <>
        
               <>
                 <Header>Grading options</Header>
                 <TextSub style={{ width: '70%', margin: '20px 100px' }}>
                   Define the criteria and scoring system for evaluating submissions. You can also include solutions regarding the auto-grading process.
                 </TextSub>
                 <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
                   <P>Switch for auto grading</P>
                   <Switch onChange={() => setAuto(!auto)} />
                 </div> 
                 {!auto  && (
                   <>{!success &&
                     <p style={{ width: '80%', margin: '20px 10px', padding: '100px' }}>
                       Unless you pick the auto grading option, the judges of your hackathon will be determined later by the administrator along with an appropriate schedule. You will be notified.
                       <br /> Click finish to create your hackathon.
                     </p>}
                   </>
                 )}
                 {auto &&
                   questions.map((q, index) => (
                     <div key={index}>
                       <h2 style={{ margin: '30px' }}>Solution {index + 1}: </h2>
                       <TextField
                         fullWidth
                         label={`Solution ${index + 1}`}
                         id={`solution${index}`}
                         style={{ margin: '20px' }}
                         onChange={(e) => handleSolutionChange(index, e.target.value)}
                         value={q.solution}
                         multiline
                       />
                     </div>
                   )).reverse()}
               </>
               {success && (<>
           
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
       
       <SubHeader>Hackathon created successfully !</SubHeader>
       <CheckBox></CheckBox>
       <WhiteBtn onClick={finish}> <MdArrowBack/> Go back to hackathons</WhiteBtn>
       </div></> 
             )}
           </>
           
           } 


{activeStep === steps.length ? (
  <>
    <Typography sx={{ mt: 2, mb: 1 }}>
      All steps completed - you&apos;re finished
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button onClick={handleReset}>Reset</Button>
    </Box>
  </>
) : (<>
  <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 150px', alignItems: 'flex-end' }}>
    <>
    {!success ? (
      <>
        <WhiteBtn color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </WhiteBtn>
        <WhiteBtn>Preview</WhiteBtn>
        <Box sx={{ flex: '1 1 auto' }} />
        <BlackBtn style={{ padding: '10px 16px' }} onClick={activeStep !== 3 ? handleSubmit : handleCreatehack}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </BlackBtn>
      </>
    ) : (
      <>
        
      </>
    )}</>
  </Box></>
)}

         
   </Box>
      </DashboardContainer>
      </DashboardContainerDisplay>
      </div>
 


  )
    
    
    
    }
    
    export default NewHackathonForm;