import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
    return (
        <div className="flex flex-row gap-2">
            <Input placeholder="Buscar Restaurantes" className="border-none" />
            <Button className="px-2.5">
                <SearchIcon size={20} />
            </Button>
        </div>
    )
}

export default Search;