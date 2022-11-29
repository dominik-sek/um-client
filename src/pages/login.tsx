import React from 'react';
import { useRef } from 'react';
import clsx from 'clsx';
import {loginUser} from "../api/user/login-user";
import {Header} from "../typography/header/header";
import {Button} from "../components/shared/button/button";
import {HeaderLevel} from "../enums/header-level";
import {FloatingInput} from "../components/shared/floating-input/floating-input";
import {LinkButton} from "../components/shared/link-button/link-button";
import { Body } from '../layout/body';
import { useNavigate } from 'react-router-dom';
import {fetchProfile} from "../api/user/fetch-profile";
import {fetchUserRole} from "../api/user/fetch-user-role";

const Login = ():JSX.Element => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidationError, setIsValidationError] = React.useState(false);

  const navigate = useNavigate();

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
    const response = await loginUser(username, password)

    if (response) {
      setIsValidationError(false);
      await fetchProfile().then((response) => {
        localStorage.setItem('user', JSON.stringify(response));

      })
      await fetchUserRole().then((role) => {
        localStorage.setItem('role', role.role);
        navigate(`/${role.role}`);
      })
      // await navigate(`/${localStorage.getItem('role')}`);
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
