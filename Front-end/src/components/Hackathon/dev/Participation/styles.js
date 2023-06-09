import styled from "styled-components";

export const BlurContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px); /* Adjust the blur amount as desired */
  z-index: 9999; /* Ensure the overlay is above other elements */

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: 10px 10px 10px 10px gray;
  padding: 50px;
  background-color: white;
`;
