"use client";
import { useDebounce } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";

type SearchFormProps = {};

function SearchForm(props: SearchFormProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText);
  return (
    <>
      <form className="w-full h-full" action="">
        <input
          type="search"
          className="w-full h-full bg-white/20 rounded-md px-5 outline-none 
          focus:bg-white/50 hover:bg-white/30 placeholder-white/50
          transition"
          placeholder="Search pets..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </form>
      {debouncedText}
    </>
  );
}

export default SearchForm;
