import { Collapse, Grid, Text } from "@nextui-org/react";
import CircularProgressWithLabel from "./CircularProgress";
import { P, WhiteBtn } from "./GlobalComponents";
export default function CollapseList({courses, lessons, percentage} ) {
  
  return (
    <Grid.Container gap={4}>
      {/* <Grid>
        <Collapse
          bordered
          title="Option"
          subtitle="More description about Option"
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
      </Grid> */}
      <Grid>
        <Collapse.Group bordered accordion={false}>
       


       {courses && courses.map((course , index)=>{
        const title= course.name;
        console.log(title);
        return(
              <Collapse  style={{width:"570px"}} key={index}  title={title}  > 
                  
                    <div style={{display: "flex", alignItems:"flex-start", justifyContent:"space-between", flex:1 }}>
                    <div style={{display:"flex", flexDirection:"column", padding:"  16px"}}>
                      <P>current lesson:</P>   
                                       <Text>{lessons && lessons[index].lessonName}</Text>
                    
              </div>  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                      <CircularProgressWithLabel value={percentage[index]}/>
                      <WhiteBtn style={{height:"35px", marginTop:"8px"}}>Resume</WhiteBtn>
                      </div>
                      </div>
                        </Collapse> 
)

       })}
       
         
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  );
}
