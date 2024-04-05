import Entry from "./Entry";

export interface SingleEntry {
  name: string,
  number: string,
  id: string,
};

export const PhoneBook = ({ allData, searchStr, deleteCallback } :
  { allData: Array<SingleEntry>, searchStr: string, deleteCallback: (arg: string) => void }) => {

  return (
    <div>
      { allData
        .filter(d => d.name.match(new RegExp(searchStr, "i")))
        .map(d =>
          <Entry
            key={d.name}
            deleteCallback={deleteCallback}
            data={d}
          />
        )}
    </div>
  )
};
