import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  testCases: {
    input: string;
    output: string;
  }[];
  template: string;
}

const problems: Problem[] = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    difficulty: "Easy",
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]"
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    template: `def twoSum(nums: List[int], target: int) -> List[int]:
    # Write your solution here
    pass`
  },
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    testCases: [
      {
        input: "s = '()'",
        output: "True"
      },
      {
        input: "s = '()[]{}'",
        output: "True"
      },
      {
        input: "s = '(]'",
        output: "False"
      }
    ],
    template: `def isValid(s: str) -> bool:
    # Write your solution here
    pass`
  },
  {
    title: "Reverse Integer",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    difficulty: "Medium",
    testCases: [
      {
        input: "x = 123",
        output: "321"
      },
      {
        input: "x = -123",
        output: "-321"
      },
      {
        input: "x = 120",
        output: "21"
      }
    ],
    template: `def reverse(x: int) -> int:
    # Write your solution here
    pass`
  }
];

const CodingProblem: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    selectRandomProblem();
  }, []);

  const selectRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    const problem = problems[randomIndex];
    setCurrentProblem(problem);
    setUserCode(problem.template);
    setTestResults([]);
  };

  const runTests = () => {
    if (!currentProblem) return;

    try {
      // Create a safe evaluation environment
      const safeEval = new Function('code', `
        return function() {
          ${userCode}
          return {
            twoSum: typeof twoSum === 'function' ? twoSum : undefined,
            isValid: typeof isValid === 'function' ? isValid : undefined,
            reverse: typeof reverse === 'function' ? reverse : undefined
          };
        }
      `)();

      const functions = safeEval();
      const results: { passed: boolean; message: string }[] = [];

      currentProblem.testCases.forEach((testCase, index) => {
        try {
          let result;
          let expected;

          if (currentProblem.title === "Two Sum") {
            const nums = JSON.parse(testCase.input.split('nums = ')[1].split(', target')[0]);
            const target = parseInt(testCase.input.split('target = ')[1]);
            result = functions.twoSum(nums, target);
            expected = JSON.parse(testCase.output);
          } else if (currentProblem.title === "Valid Parentheses") {
            const s = testCase.input.split("'")[1];
            result = functions.isValid(s);
            expected = testCase.output === "True";
          } else if (currentProblem.title === "Reverse Integer") {
            const x = parseInt(testCase.input.split('x = ')[1]);
            result = functions.reverse(x);
            expected = parseInt(testCase.output);
          }

          const passed = JSON.stringify(result) === JSON.stringify(expected);
          results.push({
            passed,
            message: `Test case ${index + 1}: ${passed ? 'Passed' : 'Failed'}\nExpected: ${testCase.output}\nGot: ${JSON.stringify(result)}`
          });
        } catch (error: any) {
          results.push({
            passed: false,
            message: `Test case ${index + 1}: Error - ${error.message}`
          });
        }
      });

      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      setAlertMessage(allPassed ? 'All tests passed! 🎉' : 'Some tests failed. Try again!');
      setShowAlert(true);
    } catch (error: any) {
      setAlertMessage(`Error: ${error.message}`);
      setShowAlert(true);
    }
  };

  if (!currentProblem) return null;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 3,
      padding: { xs: 2, sm: 4 },
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
            {currentProblem.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ color: '#333333' }}>
            Difficulty: {currentProblem.difficulty}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3, color: '#000000' }}>
            {currentProblem.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
            Test Cases:
          </Typography>
          {currentProblem.testCases.map((testCase, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#333333' }}>
                Input: {testCase.input}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333333' }}>
                Output: {testCase.output}
              </Typography>
            </Box>
          ))}

          <TextField
            fullWidth
            multiline
            rows={10}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '14px'
              }
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={runTests}
              sx={{ 
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#45a049' }
              }}
            >
              Run Tests
            </Button>
            <Button 
              variant="outlined" 
              onClick={selectRandomProblem}
              sx={{ 
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': { 
                  borderColor: '#1976D2',
                  bgcolor: 'rgba(33, 150, 243, 0.04)'
                }
              }}
            >
              New Problem
            </Button>
          </Box>
        </Paper>
      </motion.div>

      {testResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
              Test Results:
            </Typography>
            {testResults.map((result, index) => (
              <Box 
                key={index} 
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  bgcolor: result.passed ? 'success.light' : 'error.light',
                  borderRadius: 1
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    whiteSpace: 'pre-line',
                    color: result.passed ? 'success.contrastText' : 'error.contrastText'
                  }}
                >
                  {result.message}
                </Typography>
              </Box>
            ))}
          </Paper>
        </motion.div>
      )}

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertMessage.includes('passed') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodingProblem; 