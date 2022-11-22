import { Body } from "../src/layout/body"

export const Unauthorized = () =>{
  return(
    <Body>
     <div className={'w-full h-full flex text-center items-center justify-center'}>
       <h1>Unauthorized to view this content</h1>
     </div>
    </Body>
  )
}
export default Unauthorized;