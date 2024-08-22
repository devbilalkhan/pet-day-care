import { useDebounce } from '@/hooks/hooks';
import  { create} from 'zustand'

type SearchStore = {
  searchText: string;
  setSearchText: (text: string) => void;

}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchText: "",
  setSearchText: (text) => set({searchText: text} ),

}))