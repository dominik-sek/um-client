import { Body } from '../layout/body';
import { CardGroup } from '../components/shared/card/card-group';
import { Card } from '../components/shared/card/card';
import { Button } from '../components/shared/button/button';

export const Settings = (): JSX.Element => {
  return (
    <Body>
      <CardGroup className={'grid grid-rows-3 h-screen !grid-cols-1'}>

        <Card noDivide className={'row-span-2 flex flex-col relative  h-full p-0 '}>
          <div className={'!h-2/3 bg-black relative'}>
            {/* random background image: */}
            <img className={'absolute top-0 left-0 w-full h-full object-cover object-top'}
                 src={'https://source.unsplash.com/random/1920x1080'} alt={'random'} />
            <div className={'absolute w-6 h-6 bottom-0 right-0 cursor-pointer'}>
              📷
            </div>

            <div
              className={'rounded-full bg-green-50 w-24 h-24 z-50 absolute -bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 '}>
              <img src={'https://i.pravatar.cc/300'} className={'rounded-full w-full h-full object-cover'} />
              <div className={'w-fit flex flex-col justify-center text-center'}>
                name surname
              </div>
              <div className={'absolute bottom-0 right-0 cursor-pointer'}>
                📷
              </div>
            </div>
          </div>
        </Card>

        <Card title={'Your information'} className={'row-span-1 flex flex-col relative h-full relative'}>


          <div className={'flex absolute bottom-2 right-2 gap-x-2'}>
            <Button>Save Changes</Button>
            <Button className={'!bg-gray-light'}>Discard Changes</Button>
          </div>
        </Card>

      </CardGroup>
    </Body>
  );
};
export default Settings;
