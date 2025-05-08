import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

const WorkExperience: React.FC = () => {
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = React.useState<Experience>({
    company: '',
    position: '',
    duration: '',
    description: ''
  });

  const handleAddExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      setExperiences([...experiences, currentExperience]);
      setCurrentExperience({
        company: '',
        position: '',
        duration: '',
        description: ''
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Work Experience
      </Typography>
      
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6">{exp.position}</Typography>
          <Typography variant="subtitle1">{exp.company}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {exp.duration}
          </Typography>
          <Typography paragraph>{exp.description}</Typography>
        </Box>
      ))}

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Company"
          value={currentExperience.company}
          onChange={(e) => setCurrentExperience({
            ...currentExperience,
            company: e.target.value
          })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Position"
          value={currentExperience.position}
          onChange={(e) => setCurrentExperience({
            ...currentExperience,
            position: e.target.value
          })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Duration"
          value={currentExperience.duration}
          onChange={(e) => setCurrentExperience({
            ...currentExperience,
            duration: e.target.value
          })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={currentExperience.description}
          onChange={(e) => setCurrentExperience({
            ...currentExperience,
            description: e.target.value
          })}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAddExperience}
          disabled={!currentExperience.company || !currentExperience.position}
        >
          Add Experience
        </Button>
      </Box>
    </Box>
  );
};

export default WorkExperience; 