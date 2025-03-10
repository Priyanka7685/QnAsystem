"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";

const Search = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = React.useState(searchParams.get("search") || "")
    
    React.useEffect(() => {
        setSearch(() => searchParams.get("search") || "" );
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("search", search);
        router.push(`${pathname}?${newSearchParams}`)
    };

    return (
        <form className="flex w-full flex-row gap-4" onSubmit={handleSearch}>
        <Input
            type="text"
            placeholder="Search questions"
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <button className="relative z-10 shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
            Search
        </button>
    </form>
    )
}

export default Search;