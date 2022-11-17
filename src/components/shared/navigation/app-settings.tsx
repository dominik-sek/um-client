interface AppSettingsProps{
  children?: React.ReactNode;
}
export const AppSettings = (props:AppSettingsProps):JSX.Element =>{
  return (
    <div className={'flex items-center gap-x-5 rounded-md '}>
      <div>
        🌻
      </div>
      <div>
        🌻
      </div>
      <div>
        🌻
      </div>
      <div>
        🌻
      </div>
      {props.children}
    </div>
  );
}