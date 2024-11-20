import { Character } from "@/types/Character";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CharacterStore = {
  characters: Character[];
  loading: boolean;
  error: string | null;
  fetchCharacters: () => void;
  addCharacters: (character: Character) => void;
};

export const UseCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],
      loading: false,
      error: null,
      fetchCharacters: () => {
        const fetchData = get().characters;
        if (fetchData.length > 0) {
          return;
        } else {
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
        }
      },
      addCharacters: (character) => {
        set((state) => ({
          characters: [
            ...state.characters,
            { ...character, id: state.characters.length + 1 },
          ],
        }));
      },
    }),
    {
      name: "Characters-Storage",
    }
  )
);
