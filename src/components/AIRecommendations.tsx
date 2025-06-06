
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";

interface User {
  id: number;
  name: string;
  favoriteGenres: string[];
  gamesPlayed: number;
  level: number;
  achievements: number;
}

interface AIRecommendationsProps {
  user: User;
}

const AIRecommendations = ({ user }: AIRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Symulacja AI-powered rekomendacji
    const generateRecommendations = () => {
      setIsLoading(true);
      
      // Symulujemy wywołanie AI API
      setTimeout(() => {
        const aiRecommendations = [
          {
            id: 10,
            title: "Mass Effect Legendary Edition",
            genre: "RPG",
            rating: 9.2,
            image: "/placeholder.svg",
            description: "Remastered trilogy of the legendary space RPG series.",
            price: 179.99,
            releaseDate: "2021-05-14",
            aiReason: "Polecane na podstawie Twojego zamiłowania do RPG i gier fabularnych"
          },
          {
            id: 11,
            title: "Horizon Zero Dawn",
            genre: "Action RPG",
            rating: 8.9,
            image: "/placeholder.svg",
            description: "Post-apocalyptic action RPG with robotic creatures.",
            price: 129.99,
            releaseDate: "2017-02-28",
            aiReason: "Idealne połączenie akcji i elementów RPG dla Twojego poziomu doświadczenia"
          }
        ];
        
        setRecommendations(aiRecommendations);
        setIsLoading(false);
      }, 2000);
    };

    generateRecommendations();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded-full animate-pulse"></div>
            AI analizuje Twoje preferencje...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            Rekomendacje AI dla {user.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Analiza profilu:</h4>
              <div className="flex flex-wrap gap-1">
                {user.favoriteGenres.map(genre => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Poziom {user.level} • {user.gamesPlayed} gier • {user.achievements} osiągnięć
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">AI Insights:</h4>
              <p className="text-sm text-gray-600">
                Na podstawie Twojej aktywności, AI wykrył preferencje do gier fabularnych z bogatym światem i charakterystycznymi postaciami.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Twoje Spersonalizowane Rekomendacje</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((game) => (
            <div key={game.id} className="space-y-2">
              <GameCard game={game} />
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-3">
                  <p className="text-sm text-green-700 font-medium">
                    🤖 AI: {game.aiReason}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;
