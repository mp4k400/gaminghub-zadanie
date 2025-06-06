
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, User, Database, Code } from "lucide-react";
import GameCard from "@/components/GameCard";
import AIRecommendations from "@/components/AIRecommendations";
import ChatBot from "@/components/ChatBot";
import UserProfile from "@/components/UserProfile";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      genre: "RPG",
      rating: 8.5,
      image: "/placeholder.svg",
      description: "Open-world action-adventure game set in a dystopian future.",
      price: 199.99,
      releaseDate: "2020-12-10"
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      genre: "RPG",
      rating: 9.8,
      image: "/placeholder.svg",
      description: "Epic fantasy RPG with rich storytelling and vast open world.",
      price: 149.99,
      releaseDate: "2015-05-19"
    },
    {
      id: 3,
      title: "Elden Ring",
      genre: "Action RPG",
      rating: 9.5,
      image: "/placeholder.svg",
      description: "Challenging action RPG from the creators of Dark Souls.",
      price: 249.99,
      releaseDate: "2022-02-25"
    }
  ];

  const handleLogin = () => {
    // Symulacja logowania
    setUser({ 
      id: 1, 
      name: "Gracz123", 
      level: 42, 
      gamesPlayed: 156, 
      achievements: 89,
      favoriteGenres: ["RPG", "Action", "Adventure"]
    });
    toast({
      title: "Zalogowano pomyślnie!",
      description: "Witaj w Gaming Hub!",
    });
  };

  const renderHomeView = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Gaming Hub
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Odkrywaj, oceniaj i znajdź swoje kolejne ulubione gry z pomocą sztucznej inteligencji
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={handleLogin}
            >
              {user ? `Witaj, ${user.name}!` : 'Zaloguj się'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => setCurrentView('games')}
            >
              Przeglądaj Gry
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Search className="w-8 h-8 text-purple-600 mb-2" />
            <CardTitle>Inteligentne Wyszukiwanie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Znajdź idealne gry dzięki zaawansowanym filtrom i AI-powered rekomendacjom
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <User className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle>Profil Gracza</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Śledź swoje osiągnięcia, ulubione gry i otrzymuj spersonalizowane sugestie
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-cyan-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Database className="w-8 h-8 text-cyan-600 mb-2" />
            <CardTitle>Baza Gier</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Dostęp do tysięcy gier z recenzjami, ocenami i szczegółowymi informacjami
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Games */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Polecane Gry</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      {user && <AIRecommendations user={user} />}
    </div>
  );

  const renderGamesView = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold">Wszystkie Gry</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Szukaj gier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap mb-6">
        {['RPG', 'Action', 'Adventure', 'Strategy', 'FPS', 'Indie'].map(genre => (
          <Badge key={genre} variant="outline" className="cursor-pointer hover:bg-purple-100">
            {genre}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredGames
          .filter(game => 
            game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.genre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(game => (
            <GameCard key={game.id} game={game} />
          ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Gaming Hub
              </h1>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentView === 'home' ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Strona Główna
                </button>
                <button
                  onClick={() => setCurrentView('games')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentView === 'games' ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Gry
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentView === 'profile' ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Profil
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              ) : (
                <Button onClick={handleLogin} size="sm">
                  Zaloguj się
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'home' && renderHomeView()}
        {currentView === 'games' && renderGamesView()}
        {currentView === 'profile' && user && <UserProfile user={user} />}
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
