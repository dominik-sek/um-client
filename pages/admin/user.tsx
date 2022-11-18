import { FloatingInput } from '../../src/components/shared/floating-input/floating-input';
import { Card } from '../../src/components/shared/card/card';
import { CardGroup } from '../../src/components/shared/card/card-group';
import { Body } from '../../src/layout/body';

export const User = ():JSX.Element =>{
  return (
    <Body navbar>
      <CardGroup>
        <Card className={'!col-span-1'} title={'Contact Info'}>
          <div className={'relative'}>
            <FloatingInput name={'email'} type={'text'}
                            placeholder={'email'} />
          </div>
          <div className={'relative'}>
            <FloatingInput name={'phone'} type={'text'}
                            placeholder={'phone'} />
          </div>
          <div className={'relative'}>
            <FloatingInput name={'address'} type={'text'}
                            placeholder={'address'} />
          </div>
        </Card>
        <Card className={'!col-span-1'} title={' Address'}>
          <div className={'relative'}>
            <FloatingInput name={'street'} type={'text'}
                            placeholder={'street'} />
          </div>
          <div className={'relative'}>
            <FloatingInput name={'city'} type={'text'}
                            placeholder={'city'} />
          </div>
          <div className={'relative'}>
            <FloatingInput name={'zip'} type={'text'}
                            placeholder={'zip'} />
          </div>
        </Card>

      </CardGroup>

    </Body>
  )
}
export default User;