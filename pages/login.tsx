import { Body } from '../src/layout/body';
import React from 'react';
import { Header } from '../src/typography/header/header';
import { HeaderLevel } from '../src/enums/header-level';
import { LinkButton } from '../src/components/shared/link-button/link-button';
import { Button } from '../src/components/shared/button/button';
import { FloatingInput } from '../src/components/shared/floating-input/floating-input';
import { loginUser} from '../src/api/user/login-user';
import { useRouter } from 'next/router';
import { useUserContext } from '../src/user';
import { useRef } from 'react';
import clsx from 'clsx';

const Login = ():JSX.Element => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidationError, setIsValidationError] = React.useState(false);

  const router = useRouter();
  //TODO: ERROR HANDLING ON INPUT FIELDS
  // const userContext = React.useContext(UserContext);
  const user = useUserContext();
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);
    setPassword(event.target.value);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginUser(username, password);

    if (response) {
      setIsValidationError(false);
      const role = user.userRole.role;
      await router.push(`/${role}`);
    } else {
      setIsValidationError(true);
      inputRef.current!.focus();
      setTimeout(() => {
        setIsValidationError(false);
      }, 3000);
    }
  }
  return(
    <Body isLoginPage className={'w-full !m-0 !p-0 !text-base '}>
      <div className={'lg:grid flex flex-col lg:grid-cols-2 lg:grid-rows-none w-full'}>

        <div className={'flex justify-center items-center min-h-screen'}>
          <div className={'p-8 border w-3/4 h-5/6'}>
            swiper
          </div>
        </div>

        <div className={'bg-gray-medium min-h-screen flex items-center'}>

          <div className={'p-8 w-full h-fit flex flex-col justify-center gap-y-10'}>

            <div className={'flex flex-col items-center gap-y-14'}>
              <img className={'w-1/4'} src={'https://picsum.photos/200'} alt={'logo'}/>
              <Header level={HeaderLevel.H3} >
                Login to your account
              </Header>
            </div>

            <div className={'flex flex-col items-center gap-y-5'}>
              <form className={'flex flex-col w-full items-center gap-y-8 w-3/4'} onSubmit={handleSubmit}>
                <div className="relative w-full">
                  {/*TODO: add type enum*/}
                  <FloatingInput
                    onChange={handleUsernameChange}
                    name={'Username'}
                    type={'text'}
                    placeholder={'Username'}
                    isValidationError={isValidationError}
                    ref={inputRef}
                  />
                  <p className={clsx('absolute text-xs pt-1 pb-1 text-red-light opacity-0 duration-200', isValidationError && '!opacity-100')}>Invalid username or password</p>
                </div>

                <div className="relative w-full">
                  <FloatingInput
                    onChange={handlePasswordChange}
                    name={'Password'}
                    type={'password'}
                    placeholder={'Password'}
                    isValidationError={isValidationError}
                  />
                </div>



              <div className={'flex w-full justify-between'}>
                  <LinkButton textColorClass={'!text-blue-light'} url={'/'} className={'text-sm w-fit'}> Contact with an administrator </LinkButton>
                  <LinkButton textColorClass={'!text-red-light'} url={'/'} className={'text-sm w-fit'}> Forgot Password? </LinkButton>
              </div>
              <Button type={'submit'} className={'w-full'}> Login </Button>
            </form>
            </div>

          </div>
        </div>

      </div>
    </Body>
  )
}

export default Login;

export async function getStaticProps(){
  return{
    props:{
      noNavigation: true,
    }
  }
}