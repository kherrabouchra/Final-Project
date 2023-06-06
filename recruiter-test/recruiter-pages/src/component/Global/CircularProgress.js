import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

function CircularProgressWithLabel(props) {
  return (
    <>
      <RingProgress      size={70}   roundCaps      thickness={9}
        sections={[{ value: `${props.value}`, color: 'blue'  }]}
        label={
          <Text color="black" weight={700} align="center" size="xs">
       {props.value}%
          </Text>
        }
      />
 
    </>
  );
} 

export default CircularProgressWithLabel;