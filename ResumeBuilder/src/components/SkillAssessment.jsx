import React, { useState } from 'react';
import { X, CheckCircle, Circle, Star, Trophy } from 'lucide-react';

const SkillAssessment = ({ onClose, onSkillsSelected }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedSkills, setRecommendedSkills] = useState([]);

  const questions = [
    {
      id: 1,
      category: 'Programming Languages',
      question: 'Which programming languages are you proficient in?',
      type: 'multiple',
      options: [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go',
        'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'TypeScript'
      ]
    },
    {
      id: 2,
      category: 'Web Development',
      question: 'What web development technologies do you know?',
      type: 'multiple',
      options: [
        'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js',
        'Django', 'Flask', 'Laravel', 'Next.js', 'Nuxt.js'
      ]
    },
    {
      id: 3,
      category: 'Database & Storage',
      question: 'Which databases and storage solutions have you worked with?',
      type: 'multiple',
      options: [
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
        'DynamoDB', 'Firebase', 'Elasticsearch', 'Cassandra'
      ]
    },
    {
      id: 4,
      category: 'Cloud & DevOps',
      question: 'What cloud and DevOps tools do you use?',
      type: 'multiple',
      options: [
        'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
        'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible'
      ]
    },
    {
      id: 5,
      category: 'Design & UI/UX',
      question: 'Which design and UI/UX tools are you familiar with?',
      type: 'multiple',
      options: [
        'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
        'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Styled Components'
      ]
    }
  ];

  const handleAnswerSelect = (option) => {
    const questionId = questions[currentQuestion].id;
    const currentAnswers = answers[questionId] || [];

    if (currentAnswers.includes(option)) {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(answer => answer !== option)
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, option]
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const allSelectedSkills = Object.values(answers).flat();

    // Add some suggested skills based on selected ones
    const suggestions = [];

    if (allSelectedSkills.includes('JavaScript')) {
      suggestions.push('ES6+', 'DOM Manipulation', 'AJAX');
    }
    if (allSelectedSkills.includes('React')) {
      suggestions.push('JSX', 'React Hooks', 'Redux', 'Context API');
    }
    if (allSelectedSkills.includes('Node.js')) {
      suggestions.push('RESTful APIs', 'Express.js', 'NPM');
    }
    if (allSelectedSkills.includes('Python')) {
      suggestions.push('Django', 'Flask', 'Pandas', 'NumPy');
    }
    if (allSelectedSkills.includes('AWS')) {
      suggestions.push('EC2', 'S3', 'Lambda', 'RDS');
    }

    setRecommendedSkills([...allSelectedSkills, ...suggestions]);
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold dark:text-white">Skill Assessment Results</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4 shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 dark:text-white">Assessment Complete!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Based on your responses, we've identified {recommendedSkills.length} skills for your resume.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 dark:text-gray-200">Recommended Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendedSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((question, index) => {
                const questionAnswers = answers[question.id] || [];
                return (
                  <div key={question.id} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700">
                    <h5 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      {question.category}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {questionAnswers.map((answer, answerIndex) => (
                        <span key={answerIndex} className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded text-xs dark:text-gray-300">
                          {answer}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onSkillsSelected(recommendedSkills)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Add Skills to Resume
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswers = answers[question.id] || [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-white/95 dark:bg-slate-800/95 backdrop-blur">
          <h2 className="text-xl font-bold dark:text-white">Skill Assessment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="px-6 pt-6 pb-2">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{question.category}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{question.question}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {question.options.map((option, index) => {
              const isSelected = currentAnswers.includes(option);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    p-3 text-sm border rounded-lg transition-all duration-200 text-left flex items-center gap-2
                    ${isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-blue-500'
                      : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {isSelected ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-blue-500" />
                  ) : (
                    <Circle className="w-4 h-4 flex-shrink-0 text-gray-300" />
                  )}
                  <span className="truncate">{option}</span>
                </button>
              );
            })}
          </div>

          {currentAnswers.length > 0 && (
            <div className="py-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Selected</p>
              <div className="flex flex-wrap gap-2">
                {currentAnswers.map((answer, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs font-medium dark:text-gray-300">
                    {answer}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentAnswers.length === 0}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
