import { CloudinaryContext, Video } from "cloudinary-react";
import styled from "styled-components";

export const RadioInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin-right: 15px;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid #333;
  border-radius: 50%;
  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 3px;
  }
  :hover {
    ::after {
      background-color: rgb(98, 12, 103, 0.6);
    }
  }
  :focus {
    outline: 2px solid rgb(98, 12, 103, 0.2);
  }
  :checked {
    ::after {
      background-color: rgb(98, 12, 103);
    }
    :hover {
      background-color: white;
      border: 2px solid rgb(98, 12, 103);
      ::after {
        background-color: rgb(98, 12, 103);
      }
    }
  }
`;

export const TextInput = styled.input`
  font-size: 17.4px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #666;
`

export const Label = styled.label`
  font-size: 17.4px;
  color: #222;
`;

export const OptionsContainer = styled.div`
  margin: 20px 40px;
`

export const SyllabusTitle = styled.h2`
  margin: 20px;
`

export const SyllabusList = styled.ul`
  list-style: none;
  margin: 25px;
  font-size: 20px;
`

export const SyllabusIndex = styled.span`
  font-weight: 700;
`

export const UploadButton = styled.button`
  font-size: 16px;
  margin: 5px 200px;
  padding: 8px 14px;
  border-radius: 50px;
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;

  &:hover &:active {
    transform: 5px;
  }
`

export const CsvLink = styled.a`
  color: #008ae6;
  font-size: 25px;
`

export const VideoWndw = styled(Video)`
  width: 70%;
  height: auto;
  border-radius: 30px;
  margin: 15px 260px;
  padding: 15px;
  border: 2px solid rgb(0, 0, 0, 0.3);
  background-color: rgb(0, 0, 0, 0.2);
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.2);
`