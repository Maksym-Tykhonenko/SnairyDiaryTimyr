import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import { getStoryById, QuizQuestion } from '../data/stories';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface RouteProp {
  params: {
    storyId: string;
    quizType: 'multiple-choice' | 'sentence-completion' | 'title-selection';
  };
}

interface Props {
  navigation: NavigationProp;
  route: RouteProp;
}

const QuizScreen: React.FC<Props> = ({ navigation, route }) => {
  const { storyId, quizType } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const story = getStoryById(storyId);
  const questions: QuizQuestion[] = story ? 
    (quizType === 'multiple-choice' ? story.quizzes.multipleChoice :
     quizType === 'sentence-completion' ? story.quizzes.sentenceCompletion :
     story.quizzes.titleSelection) : [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(new Array(questions.length).fill(false));
    }
  }, [questions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = correct;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed, navigate to results
      navigation.navigate('Results', {
        storyId,
        score,
        totalQuestions: questions.length
      });
    }
  };

  const getQuizTypeTitle = () => {
    switch (quizType) {
      case 'multiple-choice':
        return 'Stage 2';
      case 'sentence-completion':
        return 'Stage 3';
      case 'title-selection':
        return 'Stage 4';
      default:
        return 'Quiz';
    }
  };

  const getStageNumber = () => {
    switch (quizType) {
      case 'multiple-choice':
        return 2;
      case 'sentence-completion':
        return 3;
      case 'title-selection':
        return 4;
      default:
        return 1;
    }
  };

  if (!story || !currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Question not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={getQuizTypeTitle()} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1}
            </Text>
            {showResult && (
              <Text style={[styles.resultIcon, isCorrect ? styles.correctIcon : styles.incorrectIcon]}>
                {isCorrect ? '✓' : '✗'}
              </Text>
            )}
          </View>
          
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          {selectedAnswer !== null && (
            <Text style={styles.yourAnswer}>
              Your answer: {currentQuestion.options[selectedAnswer]}
            </Text>
          )}
          
          {showResult && (
            <Text style={[styles.feedback, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
              {isCorrect ? 'Correct answer!' : 'Wrong answer!'}
            </Text>
          )}
          
          {showResult && (
            <View style={styles.divider} />
          )}
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                showResult && index === currentQuestion.correctAnswer && styles.correctOption,
                showResult && selectedAnswer === index && !isCorrect && styles.incorrectOption
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loading State */}
        {selectedAnswer !== null && !showResult && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </ScrollView>

      {/* Next Button */}
      {showResult && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'Next stage'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ff6b35',
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  correctIcon: {
    color: '#4CAF50',
  },
  incorrectIcon: {
    color: '#f44336',
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  yourAnswer: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctFeedback: {
    color: '#4CAF50',
  },
  incorrectFeedback: {
    color: '#f44336',
  },
  divider: {
    height: 2,
    backgroundColor: '#ff6b35',
    marginTop: 10,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 2,
    borderColor: '#ff6b35',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#ff6b35',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#f44336',
    borderColor: '#f44336',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#999',
    fontSize: 16,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default QuizScreen;
