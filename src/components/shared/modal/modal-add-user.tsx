import { FloatingInput } from '../floating-input/floating-input';

interface ModalAddUserProps {

}

//TODO: ADD user to database
export const ModalAddUser = (props: ModalAddUserProps): JSX.Element => {
  return (
    <div className={'grid md:grid-cols-3 h-full py-6'}>

      <div className={''}>
        <FloatingInput placeholder={'Imię'} name={'imie'} />
      </div>
      <div className={''}>

      </div>
      <div className={''}>

      </div>


    </div>

  );
};