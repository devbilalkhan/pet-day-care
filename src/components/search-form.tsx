"use client";
import { useDebounce } from "@/hooks/hooks";
import { useSearchStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { setTimeout } from "timers";

type SearchFormProps = {};

function SearchForm(props: SearchFormProps) {
  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSearchText(e.target.value);
  };

  return (
    <>
      <form className="w-full h-full" action="">
        <input
          type="search"
          className="w-full h-full bg-white/20 rounded-md px-5 outline-none 
          focus:bg-white/50 hover:bg-white/30 placeholder-white/50
          transition"
          value={searchText}
          placeholder="Search pets..."
        onChange={handleOnChange}
        />
      </form>
    </>
  );
}

export default SearchForm;
