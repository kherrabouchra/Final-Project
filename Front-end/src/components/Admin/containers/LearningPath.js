import React, { useEffect, useState } from 'react'
import { Arrow, BlackBtn, CheckBox, Container, GoBack, P, SubHeader, TextSub, WhiteBtn } from '../../Global/GlobalComponents'
import api from '../../../api/api'
import { Grid, Input, Text } from '@nextui-org/react'
import { Table ,Dropdown} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';


const LearningPath = () => {
  const [path, setPath]=useState({name:'',description:'', course:'', badge:''})
 const[badge, setBadge]=useState('')
 const[order, setOrder]=useState([0])
 const[success, setSuccess]=useState(false)
const [courses, setCourses]=useState([])
const navigate =useNavigate()
const [error, setError]= useState('')
const Badges =[
  'Silver', 'Bronze', 'Gold' , 'Platinium'
]

    useEffect(()=>{
        api.get('courses')
        .then(
            (res)=>{ 
                if(res.data.status==="success"){
                        setCourses(res.data.data)
                }
            }
        ).catch((err)=>console.log(err))
    }, [])
console.log(courses);
        
  // let list = [1,2,3,4,5,6,7,'']
  // let sourceElement = courses

  // const [sortedList, setSortedList] = React.useState(list)

  // /* add a new entry at the end of the list.  */
  // const newLine = () => {
  //   console.log(sortedList)
  //   setSortedList(sortedList.concat(''))
  // }
  
  // /* change opacity for the dragged item. 
  // remember the source item for the drop later */
  // const handleDragStart = (event) => {
  //   event.target.style.opacity = 0.5
  //   sourceElement = event.target
  //   event.dataTransfer.effectAllowed = 'move'
  // }

  // /* do not trigger default event of item while passing (e.g. a link) */
  // const handleDragOver = (event) => {
  //   event.preventDefault()
  //   event.dataTransfer.dropEffect = 'move' 
  // }

  // /* add class .over while hovering other items */
  // const handleDragEnter = (event) => {
  //   event.target.classList.add('over')    
  // }

  // /* remove class .over when not hovering over an item anymore*/
  // const handleDragLeave = (event) => {
  //   event.target.classList.remove('over')
  // }

  // const handleDrop = (event) => {
  //   /* prevent redirect in some browsers*/
  //   event.stopPropagation()
    
  //   /* only do something if the dropped on item is 
  //   different to the dragged item*/
  //   if (sourceElement !== event.target) {

  //     /* remove dragged item from list */
  //     const list = sortedList.filter((item, i) => 
  //       i.toString() !== sourceElement.id)

  //     /* this is the removed item */
  //     const removed = sortedList.filter((item, i) => 
  //       i.toString() === sourceElement.id)[0]

  //     /* insert removed item after this number. */
  //     let insertAt = Number(event.target.id)

  //     console.log('list with item removed', list)
  //     console.log('removed:  line', removed)
  //     console.log('insertAt index', insertAt)

  //     let tempList = []

  //     /* if dropped at last item, don't increase target id by +1. 
  //        max-index is arr.length */
  //     if (insertAt >= list.length) {
  //       tempList = list.slice(0).concat(removed)
  //       setSortedList(tempList)
  //       event.target.classList.remove('over')
  //     } else
  //     if ((insertAt < list.length)) {
  //     /* original list without removed item until the index it was removed at */
  //       tempList = list.slice(0,insertAt).concat(removed)

  //       console.log('tempList', tempList)
  //       console.log('insert the rest: ', list.slice(insertAt))

  //       /* add the remaining items to the list */
  //       const newList = tempList.concat(list.slice(
  //         insertAt))
  //       console.log('newList', newList)

  //       /* set state to display on page */
  //       setSortedList(newList)
  //       event.target.classList.remove('over')
  //     }
  //   }
  //   else console.log('nothing happened')
  //   event.target.classList.remove('over') 
  // }

  // const handleDragEnd = (event) => {
  //   event.target.style.opacity = 1
  //   console.log('-------------------------------------------------------------')
  // }

  // /* log changes in current input field */
  // const handleChange = (event) => {
  //   event.preventDefault()
  //   console.log('event.target.value', event.target.value)

  //   /* create new list where everything stays the same except that the current
  //   item replaces the existing value at this index */
  //   const list = sortedList.map((item, i) => {
  //     if (i !== Number(event.target.id)) { 
  //       return item }
  //     else return event.target.value   
  //   })
  //   setSortedList(list)
  // }

  // /* filter list where only items with id unequal to current id's are allowed */
  // const handleDelete = (event) => {
  //   event.preventDefault()
  //   const list = sortedList.filter((item, i) => 
  //     i !== Number(event.target.id))
  //   console.log(event.target.id)
  //   setSortedList(list)
  // }
  
  // /* create list of items */
  // const listItems = () => {

  //   return courses.map((item, i) => (
  //     <div key={i} className='dnd-list'>
  //       <TextSub           
  //         id={i}
  //         type='text'
  //         className='input-item'  
  //         draggable='true' 
  //         onDragStart={handleDragStart} 
  //         onDragOver={handleDragOver} 
  //         onDragEnter={handleDragEnter}
  //         onDragLeave={handleDragLeave}
  //         onDrop={handleDrop}
  //         onDragEnd={handleDragEnd}
  //         onChange={handleChange}
  //         placeholder='Enter text here'
          
  //       >{courses[i].name}</TextSub>
  //       <div id={i} className='delButton' onClick={handleDelete}>X</div>
  //     </div>
  //   )
  //   )
  // }

  
  // console.log('sorted', sortedList)
  const handleSelectionChange = (selectedItems) => {
    if (!selectedItems) {
      setOrder(0);
    } else {
      const selectedEntries = Array.from(selectedItems);
      setPath({ ...path, course: selectedEntries });
      setOrder(selectedEntries);
      console.log(selectedEntries);
    }
  };
  
const handleorder=(o,i)=>{
  const order= [];
   order.push(o);
  return  order[i];
}
  console.log(path);



  const handlebadge = (selectedKeys) => {
    setBadge(selectedKeys.currentKey);
 
    setPath({ ...path, badge: Badges[selectedKeys.currentKey]});
  };

  
 
  const checkFields = () => {
    if(  !path.name ||
       !path.description ||
       !path.course ||
       !path.badge ){   setError("Please fill all the required fields");
       return false;}
     else{return true;}}
  
  const handleSubmit =()=>{
    if(!checkFields()){return;};

    api.post('/paths', path)
    .then((res)=>{ console.log(res.data);
      if(res.data.status==='success'){
        setSuccess(true)
        setError('')
      }
    }).catch((err)=>console.log(err))
  }
  return (
    <div style={{marginLeft:'18%', background:'#fafafa', height:'100vh', width :"82%"}}>
     {/* <div style={{margin : 0, padding:0}}><GoBack  color={'black'}/></div>  */}
     
     <div style={{margin:" 0 0 0 18%" , padding:0,left:0,top:0, position:"absolute"}}>
       <Link to="/course-management"> <GoBack style={{margin:0}} color={'black'}/> </Link>
      </div> 
      <SubHeader>Create a new learning path</SubHeader>
     <Container style={{margin:'50px', padding:"60px", width:"92%" , height:"100%"}}>
    
    {!success ? <>
      <Input style={{margin:'15px'}} label='Name:'  value={path.name}
       onChange={(e)=>setPath({...path, name: e.target.value})}/>
      {/* <div className='page'>
      <div className='container'> 
        {listItems()}
        <BlackBtn className='addButton' onClick={() => newLine()}>+ Add course</BlackBtn>
      </div>
    </div> */}

    <Input  fullWidth  value={path.description} 
    onChange={(e)=>setPath({...path, description: e.target.value})}
      style={{margin:'15px' , width:'100%'}} label='Description:'/>
   
     <Table 
      aria-label="Example static collection table with multiple selection"
      css={{
        height: "auto",
        minWidth: "100%",

      }}
       color='primary'
      label="Courses:"
      selectionMode="multiple"
      value={path.course}   onSelectionChange={handleSelectionChange} // Update the selection handler
       
    >
      <Table.Header>
        <Table.Column>Course</Table.Column>
        <Table.Column>Order</Table.Column>

      </Table.Header>
      <Table.Body>
      {courses && courses.map((c, index) => (
          <Table.Row key={c.courseID}>
            <Table.Cell>{c.name}</Table.Cell>
            <Table.Cell >{path.course.length!==0 && handleorder(path.course.size, index)}</Table.Cell>

          </Table.Row>
        ))}
 
      </Table.Body>
    </Table>
   <P style={{margin:'10px'}}>Please select courses in the right order.</P>

<Grid.Container  fullwidth style={{margin:'40px'}}>
  <Grid>
  <Text style={{margin:"10px"}}>Badge:</Text>

    </Grid>
    <Grid  >
    <Dropdown > 
         <Dropdown.Button color="none" bordered css={{ tt: "capitalize" }}>
           {badge? Badges[badge]:"Select a badge" } 
         </Dropdown.Button>
         <Dropdown.Menu  css={{width:'100%'}}
           aria-label="Single selection actions"
           color="none" name='inst'
           disallowEmptySelection
           selectionMode="single"
           selectedKeys={badge}
           onSelectionChange={handlebadge}
         >

          {Badges.map((b, index)=>
    <Dropdown.Item  key={index}>{b}</Dropdown.Item>
          
          )} 
         </Dropdown.Menu>
       </Dropdown></Grid></Grid.Container>


{error && <div className='errmsg'> {error}</div>}

       <BlackBtn onClick={handleSubmit}>Save</BlackBtn></> : <> 
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
       
       <SubHeader>Learning path created successfully !</SubHeader>
       <CheckBox></CheckBox>
       <WhiteBtn onClick={()=>navigate ('/course-management')}> <MdArrowBack/> Go back to courses</WhiteBtn>
       </div></>}
     </Container>
    </div>
  )
} 
 
export default LearningPath
