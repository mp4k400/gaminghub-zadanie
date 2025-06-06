
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User, Calendar, Database, Code } from "lucide-react";

interface User {
  id: number;
  name: string;
  level: number;
  gamesPlayed: number;
  achievements: number;
  favoriteGenres: string[];
}

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const nextLevelExp = user.level * 100;
  const currentExp = (user.level - 1) * 100 + 65; // Symulacja obecnego doświadczenia
  const expProgress = ((currentExp % 100) / 100) * 100;

  const recentAchievements = [
    { name: "Mistrz RPG", description: "Ukończ 10 gier RPG", unlocked: true },
    { name: "Kolekcjoner", description: "Dodaj 50 gier do biblioteki", unlocked: true },
    { name: "Recenzent", description: "Napisz 5 recenzji", unlocked: false },
    { name: "Explorer", description: "Sprawdź 100 różnych gier", unlocked: true }
  ];

  const gameStats = [
    { label: "Gry w bibliotece", value: user.gamesPlayed, color: "text-purple-600" },
    { label: "Ukończone gry", value: Math.floor(user.gamesPlayed * 0.6), color: "text-green-600" },
    { label: "Średnia ocena", value: "8.5/10", color: "text-blue-600" },
    { label: "Czas gry", value: "420h", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-purple-100 mt-1">Poziom {user.level} • Gaming Enthusiast</p>
              
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Postęp do poziomu {user.level + 1}</span>
                  <span>{Math.round(expProgress)}%</span>
                </div>
                <Progress value={expProgress} className="bg-purple-400" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Statystyki
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{stat.label}</span>
                <span className={`font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Favorite Genres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Ulubione Gatunki
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.favoriteGenres.map((genre, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {genre}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              AI analizuje Twoje preferencje, aby dostarczać lepsze rekomendacje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Ostatnie Osiągnięcia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    achievement.unlocked 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-400 text-white'
                  }`}>
                    {achievement.unlocked ? '✓' : '?'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Ostatnia Aktywność
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Dodano Cyberpunk 2077 do biblioteki</span>
              <span className="text-xs text-gray-500">2 godziny temu</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Wystawiono ocenę dla The Witcher 3</span>
              <span className="text-xs text-gray-500">1 dzień temu</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Odblokowano osiągnięcie "Mistrz RPG"</span>
              <span className="text-xs text-gray-500">3 dni temu</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
