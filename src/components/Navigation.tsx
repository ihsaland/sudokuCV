import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Navigation: React.FC = () => {
  return (
    <div>
      <Button
        component={Link}
        to="/projects"
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Projects
      </Button>
      <Button
        component={Link}
        to="/coding"
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Coding Problems
      </Button>
    </div>
  );
};

export default Navigation; 