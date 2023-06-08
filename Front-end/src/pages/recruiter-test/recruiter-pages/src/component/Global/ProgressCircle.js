import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export const ProgressC =()=>{ 
    
 
return(


<CircularProgressbar
  value={66}
  text={`${66}%`}
  styles={buildStyles({  
    // Rotation of path and trail, in number of turns (0-1)
   
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'round',
     // Styles for the text element
     text: {
        // Change the text color
        fill: '#000',
  
        // Center the text vertically and horizontally
        dominantBaseline: 'middle',
        textAnchor: 'middle',
        fontSize: '26px',
        fontWeight: 'bold',
      },

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(249, 137, 230, ${66 / 100}  )`,
    textColor: 'rgba(0, 0, 0, 0.54)',
    trailColor: '#d6d6d6',
  })}
/>)}