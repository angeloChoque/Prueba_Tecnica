import { Character } from "@/types/Character";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CharacterStore = {
  characters: Character[];
  loading: boolean;
  error: string | null;
  fetchCharacters: () => void;
};

export const UseCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      characters: [],
      loading: false,
      error: null,
      fetchCharacters: () => {
        set({ loading: true, error: null });
        fetch("https://rickandmortyapi.com/api/character")
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch characters");
            }
            return res.json();
          })
          .then((data) => {
            set({ characters: data.results, loading: false });
          })
          .catch((err) => {
            set({ error: err.message, loading: false });
          });
      },
    }),
    { name: "Characters-Storage" }
  )
);
