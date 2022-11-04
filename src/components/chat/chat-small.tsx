interface ChatSmallProps {
  name: string;
  message: string;
  // time: string;
  // avatar: string;
  className?: string;
}
export const ChatSmall = (props: ChatSmallProps) =>{
  return(
    <div className={'h-16 p-2 flex items-center justify-between gap-x-10'}>
      <div className={'flex items-center justify-center bg-primary h-12 w-12 rounded-full'}>
        {props.name}
      </div>
      <div>
        {props.message}...
      </div>

      <div>
        Reply
      </div>

    </div>
  )
}