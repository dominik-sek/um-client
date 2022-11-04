import type { NextPage } from 'next';
import { Body } from '../src/layout/body';

import React from 'react';
import { ContentCard } from '../src/components/content-card';
import { ChatSmall } from '../src/components/chat/chat-small';
//TODO: optional dropdown for filtering
const Home: NextPage = () => {
  return (
    <Body>
      <div className={'grid w-full gap-y-10 gap-x-10 grid-cols-2 auto-cols-max grid-rows-auto  items-center'}>
          <ContentCard title={'Wiadomości'}>
          <div className={'divide-primary divide-y'}>
            <ChatSmall name={'Ug'} message={'hello sir'} />
            <ChatSmall name={'Ug'} message={'hello sir'} />
            <ChatSmall name={'Ug'} message={'hello sir'} />
          </div>
          </ContentCard>

          <ContentCard title={'Oceny'}>
            lorem
          </ContentCard>

          <ContentCard className={'col-span-full'} title={'Kursy'}>
            kursy
          </ContentCard>

      </div>


    </Body>
  );
};
export default Home;
