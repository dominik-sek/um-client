import {CardGroup} from "../../components/shared/card/card-group";
import { Body } from "../../layout/body";


const AdminPanel = () => {

  const profileIcon = () =>{
    return(
      <div className={'flex items-center justify-center'}>
        <img className={'w-10 h-10 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'}/>
      </div>
    )
  }
  return (
    <Body>
      ADMIN PAGE
      <CardGroup>

      </CardGroup>
    </Body>
  );
};
export default AdminPanel;
