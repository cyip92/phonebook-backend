import { useState } from "react";

const SearchForm = ({ searchCallback } : { searchCallback: (arg: string) => void }) => {
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const newStr = event.target.value;
    setNewSearch(newStr);
    searchCallback(newStr);
  };

  return (
    <>
      <div>
        Filter names with:
        <input
          value={newSearch}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default SearchForm;
