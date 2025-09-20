import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  userType?: 'patient' | 'doctor';
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ userType = 'patient' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your intelligent assistant. ${
        userType === 'patient' 
          ? "I'm here to help you with your questions and provide support."
          : "I can help you with insights and support for your professional needs."
      } How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sampleQuestions = userType === 'patient' 
    ? [
        "What do my survival statistics mean?",
        "Tell me about side effects",
        "How effective is my treatment?",
        "What should I expect during treatment?"
      ]
    : [
        "Show me latest treatment outcomes",
        "What are current survival trends?",
        "Analyze patient data patterns",
        "Compare treatment effectiveness"
      ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage, userType),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (question: string, type: 'patient' | 'doctor'): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (type === 'patient') {
      if (lowerQuestion.includes('survival') || lowerQuestion.includes('statistics')) {
        return "Your survival probability of 87% over 5 years is very encouraging. This is based on similar cases with your cancer type, stage, and demographic factors. Remember, these are statistical averages - your individual outcome may be better with proper treatment adherence.";
      }
      if (lowerQuestion.includes('side effect')) {
        return "Side effects vary by treatment type. Your recommended treatments show moderate side effect profiles. We can discuss specific management strategies for each potential side effect to minimize their impact on your quality of life.";
      }
      if (lowerQuestion.includes('treatment') || lowerQuestion.includes('effective')) {
        return "Your top recommended treatment has a 92% effectiveness rate for cases similar to yours. This combines targeted therapy with your specific genetic markers, which research shows improves outcomes significantly.";
      }
      return "I understand you have questions about your care. Could you be more specific about what aspect you'd like to discuss? I can help explain your treatment options, side effects, or survival statistics in detail.";
    } else {
      if (lowerQuestion.includes('outcome') || lowerQuestion.includes('treatment')) {
        return "Recent data shows immunotherapy combined with targeted therapy achieving 78% response rates in Stage II cases. This represents a 15% improvement over traditional protocols in the past 12 months.";
      }
      if (lowerQuestion.includes('trend') || lowerQuestion.includes('survival')) {
        return "Current 5-year survival trends show consistent improvement across most cancer types. Early detection programs have contributed to a 23% improvement in outcomes, particularly in rural screening initiatives.";
      }
      if (lowerQuestion.includes('data') || lowerQuestion.includes('pattern')) {
        return "Pattern analysis reveals that patients with AI-assisted treatment selection show 34% fewer severe side effects and 12% better treatment adherence rates compared to standard protocols.";
      }
      return "I can provide clinical insights, treatment outcome analysis, or help interpret patient data patterns. What specific area would you like to explore?";
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg hover:shadow-glow z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-xl z-50 border-primary/20">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 bg-primary/5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              Smart Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 space-y-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Sample Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Sample questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto text-xs p-2 text-left justify-start whitespace-normal"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};