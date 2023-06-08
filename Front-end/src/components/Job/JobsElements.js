import styled from "styled-components"


export const RecJobCard  =()=>{
    return(
        <div     class="card7">
  <div class="card__image">
    
  </div>
  <div class="card__content">
    <p class="card__title">Card Title</p>
    <p class="card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <a class="card__button" href="#">Read More</a>
  </div>
</div>

    )
}

export const JobRow =styled.div`
display: flex;
flex-direction: row;
@media screen  and (max-width:760px){
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    width:100%;
    margin:0;
 
}
`
export const JobColumn= styled.div`

`

export const JobCard = styled.div`
height: 1000px;
width:230px;
border-radius: 35px;
`