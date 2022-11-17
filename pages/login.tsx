import { Body } from '../src/layout/body';
import React from 'react';
import { Header } from '../src/typography/header/header';
import { HeaderLevel } from '../src/enums/header-level';
import { LinkButton } from '../src/components/shared/link-button/link-button';
import { Button } from '../src/components/shared/button/button';
import { Input } from 'postcss';
import { FloatingInput } from '../src/components/shared/floating-input/floating-input';

const Login = ():JSX.Element => {
  return(
    <Body isLoginPage className={'w-full !m-0 !p-0'}>
      <div className={'grid grid-cols-2 w-full'}>

        <div className={'flex justify-center items-center'}>
          <div className={'p-8 border w-3/4 h-5/6'}>
            content
          </div>
        </div>

        <div className={'bg-gray-medium'}>
          <div className={'p-8 w-full h-full flex flex-col justify-center gap-y-10'}>

            <div className={'flex flex-col items-center gap-y-14'}>
              <img className={'w-1/4'} src={'https://picsum.photos/200'} alt={'logo'}/>
              <Header level={HeaderLevel.H3} >
                Login to your account
              </Header>
            </div>

            <div className={'flex flex-col items-center gap-y-5'}>
              <div className={'flex flex-col w-full items-center gap-y-5'}>
                <div className="relative w-3/4">
                  {/*TODO: add type enum*/}
                  <FloatingInput
                    name={'Username'}
                    type={'text'}
                    placeholder={'Username'} />
                </div>
                <div className="relative w-3/4">
                  <FloatingInput
                    name={'Password'}
                    type={'password'}
                    placeholder={'Password'} />
                </div>
              </div>

              <div className={'flex w-3/4 justify-between'}>
                  <LinkButton textColorClass={'text-blue-light'} url={'/'} className={'text-sm w-fit'}> Contact with an administrator </LinkButton>
                  <LinkButton textColorClass={'text-red-light'} url={'/'} className={'text-sm w-fit'}> Forgot Password? </LinkButton>
              </div>
              <Button className={'w-3/4'}> Login </Button>
            </div>

          </div>
        </div>

      </div>
    </Body>
  )
}



export default Login;