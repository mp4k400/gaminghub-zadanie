
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  image: string;
  description: string;
  price: number;
  releaseDate: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const handleAddToLibrary = () => {
    toast({
      title: "Dodano do biblioteki!",
      description: `${game.title} został dodany do Twojej biblioteki gier.`,
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-green-600";
    if (rating >= 8) return "text-yellow-600";
    if (rating >= 7) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <span className={`font-bold ${getRatingColor(game.rating)}`}>
              {game.rating}/10
            </span>
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
            {game.title}
          </CardTitle>
          <Badge variant="outline">{game.genre}</Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {game.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(game.releaseDate).toLocaleDateString('pl-PL')}
          </div>
          <div className="font-bold text-lg text-purple-600">
            {game.price} zł
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={handleAddToLibrary}
          >
            Dodaj do biblioteki
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
