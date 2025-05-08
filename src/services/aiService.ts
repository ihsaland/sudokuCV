import { trackEvent } from '../components/GoogleAnalytics';

interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class AIService {
  private static instance: AIService;
  private apiKey: string;

  private constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Generate personalized CV content
  async generateCVContent(section: string, userInput: string): Promise<AIResponse> {
    try {
      trackEvent('ai_request', 'cv', `generate_${section}`);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a professional CV writer. Generate content for the ${section} section of a CV based on the following information:`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return { success: true, data: data.choices[0].message.content };
    } catch (error) {
      console.error('Error generating CV content:', error);
      return { success: false, error: 'Failed to generate CV content' };
    }
  }

  // Provide hints for Sudoku puzzles
  async getSudokuHint(board: number[][], difficulty: string): Promise<AIResponse> {
    try {
      trackEvent('ai_request', 'game', `hint_${difficulty}`);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a Sudoku expert. Provide a helpful hint for solving this ${difficulty} difficulty puzzle without giving away the solution.`
            },
            {
              role: 'user',
              content: `Current board state: ${JSON.stringify(board)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      const data = await response.json();
      return { success: true, data: data.choices[0].message.content };
    } catch (error) {
      console.error('Error getting Sudoku hint:', error);
      return { success: false, error: 'Failed to get hint' };
    }
  }

  // Analyze user's CV and provide improvement suggestions
  async analyzeCV(cvContent: string): Promise<AIResponse> {
    try {
      trackEvent('ai_request', 'cv', 'analyze');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a professional CV reviewer. Analyze the CV content and provide specific suggestions for improvement.'
            },
            {
              role: 'user',
              content: cvContent
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return { success: true, data: data.choices[0].message.content };
    } catch (error) {
      console.error('Error analyzing CV:', error);
      return { success: false, error: 'Failed to analyze CV' };
    }
  }

  // Generate personalized interview questions based on CV
  async generateInterviewQuestions(cvContent: string): Promise<AIResponse> {
    try {
      trackEvent('ai_request', 'cv', 'interview_questions');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an experienced interviewer. Generate relevant interview questions based on the CV content.'
            },
            {
              role: 'user',
              content: cvContent
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return { success: true, data: data.choices[0].message.content };
    } catch (error) {
      console.error('Error generating interview questions:', error);
      return { success: false, error: 'Failed to generate questions' };
    }
  }
}

export default AIService; 