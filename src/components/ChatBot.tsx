
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Cześć! Jestem AI Gaming Assistant. Pomogę Ci znaleźć idealne gry! O czym chciałbyś porozmawiać?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = {
    rpg: "RPG to świetny wybór! Polecam sprawdzić The Witcher 3, Elden Ring lub Mass Effect. Wolisz fantasy czy sci-fi?",
    action: "Gry akcji! Spróbuj Cyberpunk 2077, GTA V lub Red Dead Redemption 2. Szukasz czegoś konkretnego?",
    multiplayer: "Gry wieloosobowe są super! CS:GO, Valorant, Among Us czy może coś kooperacyjnego jak It Takes Two?",
    indie: "Indie games mają niesamowite pomysły! Sprawdź Hades, Celeste, Hollow Knight lub Stardew Valley.",
    strategy: "Strategiczne myślenie! Age of Empires, Civilization VI, StarCraft II - które Cię interesuje?",
    horror: "Lubisz się bać? 😱 Phasmophobia, Resident Evil, Silent Hill czy może coś psychologicznego jak SOMA?",
    default: "Interesujące! Powiedz mi więcej o swoich preferencjach - jaki gatunek Cię interesuje? RPG, akcja, strategia?"
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('rpg') || message.includes('fabularny')) return aiResponses.rpg;
    if (message.includes('akcja') || message.includes('action')) return aiResponses.action;
    if (message.includes('multiplayer') || message.includes('online')) return aiResponses.multiplayer;
    if (message.includes('indie') || message.includes('niezależny')) return aiResponses.indie;
    if (message.includes('strategia') || message.includes('strategy')) return aiResponses.strategy;
    if (message.includes('horror') || message.includes('straszny')) return aiResponses.horror;
    
    return aiResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Symulacja "myślenia" AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-2xl z-50 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                🤖
              </div>
              Gaming AI Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString('pl-PL', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  placeholder="Zapytaj o gry..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                >
                  Wyślij
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
