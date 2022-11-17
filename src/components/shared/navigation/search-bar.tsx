export const SearchBar = ():JSX.Element =>{
  return (
    <div>
      <input type="text"
             placeholder={'🔎 Search'}
             className={'text-sm bg-gray-medium dark:bg-gray-dark text-white rounded-md px-4 py-2 w-96 border border-gray-light/30'}/>
    </div>
  );
}