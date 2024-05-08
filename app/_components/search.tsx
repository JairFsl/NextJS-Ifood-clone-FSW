"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
}

const Search = ({ placeholder = "Buscar Restaurantes" }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;

    return router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex flex-row gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder={placeholder}
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button className="px-2.5" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
