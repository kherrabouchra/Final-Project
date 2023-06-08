import styled from "styled-components";
import { TbEdit } from "react-icons/tb";
import { RiAddCircleLine } from "react-icons/ri";

export const Container = styled.div`
  margin: 5px auto;
  padding: 60px 150px;
`;

export const CourseContainer = styled.ul`
  list-style-type: none;
  border: 2px solid rgb(126, 134, 140, 0.3);
  border-radius: 20px;
  background-color: white;
  padding: 16px 12px 5px 12px;
  box-shadow: 3px 5px 15px lightgray;
`;

export const Span = styled.span`
    margin-left: 50px;
    color: #333;
    font-size: 15.5px;
    font-family: 'inter', sans-serif;
`

export const Header = styled.li`
  font-family: "inter", sans-serif;
  font-size: 16.5px;
  padding: 15px 16px;
  border-radius: 10px;
  background-color: rgb(126, 134, 140, 0.13);
  color: #777;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export const CourseTitle = styled.li`
  margin: 30px;
  font-family: "inter", sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-right: 40px;
`;

export const AddIcon = styled(RiAddCircleLine)`
  font-size: 25px;
  margin: 0 10px;
`;

export const EditIcon = styled(TbEdit)`
  font-size: 25px;
  margin: 0 10px;
`;

export const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #999;

    &:hover {
        color: #aaa;
    }
`