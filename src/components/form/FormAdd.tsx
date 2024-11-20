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

export default function FormAdd() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addCharacters } = UseCharacterStore();
  const { register, handleSubmit } = useForm<Character>();

  const onSubmit: SubmitHandler<Character> = (data) => {
    addCharacters(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="text-white">
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Character</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (1 Name,1 Last Name)</Label>
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
                placeholder="Enter Gender"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL (377.5 x 377.5 or larger)</Label>
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
