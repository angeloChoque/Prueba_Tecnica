import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UseCharacterStore } from "@/services/UseApi";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Character } from "@/types/Character";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormEdit() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const { characters, updateCharacter } = UseCharacterStore();
  const { register, handleSubmit, setValue, reset } = useForm<Character>();

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit: SubmitHandler<Character> = (data) => {
    if (selectedCharacter) {
      updateCharacter(selectedCharacter.id, data);
    }
    reset();
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setValue("name", character.name);
    setValue("status", character.status);
    setValue("species", character.species);
    setValue("gender", character.gender);
    setValue("image", character.image);
    setSearchTerm("");
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-white bg-yellow-400 hover:bg-yellow-500">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Edit Character</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && filteredCharacters.length > 0 && (
              <ul className="absolute max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 bg-white w-full z-10">
                {filteredCharacters.map((character) => (
                  <li
                    key={character.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectCharacter(character)}
                  >
                    {character.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 ">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Enter character name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                {...register("status")}
                id="status"
                placeholder="Alive, Dead, or Unknown"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species</Label>
              <Input
                {...register("species")}
                id="species"
                placeholder="Enter species"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                {...register("gender")}
                id="gender"
                placeholder="Enter gender"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                {...register("image")}
                id="image"
                type="url"
                placeholder="Enter image URL"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
