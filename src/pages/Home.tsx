import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { UseCharacterStore } from "@/services/UseApi";

import FormAdd from "@/components/form/FormAdd";
import FormEdit from "@/components/form/FormEdit";

export default function Home() {
  const [filter, setFilter] = useState<string>("");

  const { characters, error, loading, fetchCharacters } = UseCharacterStore();

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Rick and Morty Explorer
      </h1>
      <div className="flex items-center max-w-sm mx-auto mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Filter characters..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pr-7 text-white"
          />
          <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
            🔍
          </span>
        </div>
        <div className="flex gap-2 ml-2">
          <FormAdd />
          <FormEdit />
        </div>
      </div>
      <div className="sm:mx-10 lg:mx-20 xl:mx-44 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCharacters.map((character) => (
          <Card key={character.id} className="shadow-md bg-card">
            <CardHeader>
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg h-full object-cover w-full"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-2xl text-gray-950">
                {character.name}
              </CardTitle>
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
                <Badge variant="outline" className="ml-2 text-white">
                  {character.species}
                </Badge>
                <Badge variant="outline" className="ml-1 text-white mt-2">
                  {character.gender}
                </Badge>
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
