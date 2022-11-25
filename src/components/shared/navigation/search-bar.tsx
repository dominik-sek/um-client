export const SearchBar = ():JSX.Element =>{
  return (
    <div className={''}>
      <input type="text"
             placeholder={'🔎 Search'}
             className={'text-sm bg-gray-medium dark:bg-gray-dark w-full text-white' +
               'rounded-md px-4 py-2 border border-gray-light/30'}/>
    </div>
  );
}