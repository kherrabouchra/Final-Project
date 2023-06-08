import { Collapse, Grid, Text } from "@nextui-org/react";
import CircularProgressWithLabel from "./CircularProgress";
import { WhiteBtn } from "./GlobalComponents";
export default function CollapseList( ) {
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
       
        <Collapse  title="Introduction to python programming " > 
     
       <div style={{display: "flex", alignItems:"flex-start", justifyContent:"space-between"}}>
       <div style={{display:"flex", flexDirection:"column", padding:" 0 20px"}}>
       <Text>dlkf,lz</Text>
       <Text>dlkf,lz</Text>
 
       <Text>dlkf,lz</Text>
</div>
        <CircularProgressWithLabel value={"40"}/>
        
         </div>
           <WhiteBtn style={{height:"35px"}}>Resume</WhiteBtn>
          </Collapse>
          <Collapse title="Deep learning">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
          <Collapse title="Option C">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  );
}
