import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Rick and Morty Explorer
      </h1>
      <div className="relative max-w-sm mx-auto mb-4">
        <Input
          type="text"
          placeholder="Filter characters..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pr-7"
        />
        <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
          🔍
        </span>
      </div>

      <div className="md:mx-32 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCharacters.map((character) => (
          <Card key={character.id}>
            <CardHeader>
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg h-full object-cover w-full "
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-2xl">{character.name}</CardTitle>
              <CardDescription>
                <Badge
                  className="text-white"
                  variant={
                    character.status.toLowerCase() === "alive"
                      ? "default"
                      : "destructive"
                  }
                >
                  {character.status}
                </Badge>
                <span className="ml-2">{character.species}</span>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredCharacters.length === 0 && (
        <p className="text-center mt-4 text-muted-foreground">
          No characters found.
        </p>
      )}
    </div>
  );
}

export default App;
