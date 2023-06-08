import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerWrapper= styled.div`

padding : 50px 80px;

`

export const HackathonCard= styled(Link)`
padding: 40px;
color: black;
 display: flex;
 justify-content: space-around;
 flex-direction:column;
width: 330.32px;
height: 380.36px;
margin: 15px;
background: #f4f4f490;
mix-blend-mode: normal;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
border-radius: 20px;
transition: all 0.2s ease-in-out;

&:hover{
transition: all 0.2s ease-in-out;
    cursor: pointer; 
    width: 335.32px;
height: 385.36px;
}

`


export const HackCardWrapper = styled.div`

display: flex; 
justify-content: flex-start;
flex-wrap: wrap;
padding:30px;
`


export const CalendarIcon = ()=>{
    return( 
        <svg  width="16" height="16" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.9268 1.9938C31.9268 1.47589 31.7238 0.979189 31.3626 0.612971C31.0013 0.246754 30.5113 0.0410156 30.0004 0.0410156C29.4895 0.0410156 28.9995 0.246754 28.6382 0.612971C28.277 0.979189 28.074 1.47589 28.074 1.9938H31.9268ZM28.074 9.0238C28.074 9.54171 28.277 10.0384 28.6382 10.4046C28.9995 10.7708 29.4895 10.9766 30.0004 10.9766C30.5113 10.9766 31.0013 10.7708 31.3626 10.4046C31.7238 10.0384 31.9268 9.54171 31.9268 9.0238H28.074ZM11.1218 1.9938C11.1218 1.47589 10.9188 0.979189 10.5576 0.612971C10.1963 0.246754 9.7063 0.0410156 9.19539 0.0410156C8.68448 0.0410156 8.19449 0.246754 7.83323 0.612971C7.47196 0.979189 7.269 1.47589 7.269 1.9938H11.1218ZM7.269 9.0238C7.269 9.54171 7.47196 10.0384 7.83323 10.4046C8.19449 10.7708 8.68448 10.9766 9.19539 10.9766C9.7063 10.9766 10.1963 10.7708 10.5576 10.4046C10.9188 10.0384 11.1218 9.54171 11.1218 9.0238H7.269ZM35.009 13.3199V29.3327H38.8618V13.3199H35.009ZM29.2299 35.1911H9.96595V39.0966H29.2299V35.1911ZM4.18677 29.3327V13.3199H0.333992V29.3327H4.18677ZM9.96787 7.46158H29.226V3.55602H9.97173V7.46158H9.96787ZM36.9354 14.101H2.26038V18.0066H36.9354V14.101ZM28.074 1.9938V9.0238H31.9268V1.9938H28.074ZM7.269 1.9938V9.0238H11.1218V1.9938H7.269ZM9.96595 35.1911C8.09542 35.1911 6.88565 35.1871 5.99566 35.0661C5.1596 34.9509 4.89761 34.7673 4.75121 34.6189L2.02729 37.3801C3.00975 38.376 4.21952 38.7646 5.48131 38.9365C6.69108 39.1005 8.2033 39.0966 9.96595 39.0966V35.1911ZM0.333992 29.3327C0.333992 31.1195 0.33014 32.6544 0.491956 33.8788C0.661479 35.1579 1.04483 36.3862 2.02729 37.3801L4.75121 34.6189C4.6048 34.4705 4.42372 34.2049 4.31006 33.3574C4.19063 32.4572 4.18677 31.2289 4.18677 29.3327H0.333992ZM35.009 29.3327C35.009 31.2289 35.0052 32.4552 34.8857 33.3574C34.7721 34.2049 34.591 34.4705 34.4446 34.6189L37.1685 37.3801C38.151 36.3842 38.5343 35.1579 38.7038 33.8788C38.8657 32.6524 38.8618 31.1195 38.8618 29.3327H35.009ZM29.2299 39.0966C30.9925 39.0966 32.5066 39.1005 33.7145 38.9365C34.9763 38.7646 36.188 38.376 37.1685 37.3801L34.4446 34.6189C34.2982 34.7673 34.0362 34.9509 33.2001 35.0661C32.3102 35.1871 31.1004 35.1911 29.2299 35.1911V39.0966ZM38.8618 13.3199C38.8618 11.5331 38.8657 9.99824 38.7038 8.77385C38.5343 7.49478 38.151 6.26648 37.1685 5.27251L34.4446 8.03374C34.591 8.18215 34.7721 8.44773 34.8857 9.29524C35.0052 10.1974 35.009 11.4238 35.009 13.3199H38.8618ZM29.2279 7.46158C31.0985 7.46158 32.3102 7.46548 33.2001 7.58656C34.0362 7.70177 34.2982 7.88533 34.4446 8.03374L37.1685 5.27251C36.1861 4.27659 34.9763 3.88799 33.7126 3.71615C32.5047 3.55211 30.9906 3.55602 29.2299 3.55602L29.2279 7.46158ZM4.18677 13.3199C4.18677 11.4238 4.19063 10.1974 4.31006 9.29524C4.42372 8.44773 4.6048 8.18215 4.75121 8.03374L2.02729 5.27251C1.04483 6.26843 0.661479 7.49478 0.491956 8.77385C0.33014 10.0002 0.333992 11.5331 0.333992 13.3199H4.18677ZM9.96787 3.55602C8.20523 3.55602 6.69108 3.55211 5.48323 3.71615C4.21952 3.88799 3.00782 4.27659 2.02729 5.27251L4.75121 8.03374C4.89761 7.88533 5.1596 7.70177 5.99566 7.58656C6.88757 7.46548 8.09542 7.46158 9.96787 7.46158V3.55602Z" fill="black" fill-opacity="0.38"/>
        </svg>
        
    )
}