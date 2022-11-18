import type { NextPage } from 'next';
import React from 'react';
import { Body } from '../../src/layout/body';
import { NextPageWithLayout } from '../_app';
import { CardGroup } from '../../src/components/shared/card/card-group';
import { Card } from '../../src/components/shared/card/card';
import { LinkButton } from '../../src/components/shared/link-button/link-button';
import { Sidebar } from '../../src/components/shared/navigation/sidebar';


const Home: NextPage = () => {

  const profileIcon = () =>{
    return(
      <img className={'w-10 h-10 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'}/>
    )
  }
  return (
    <Body navbar>
      admin page
      <CardGroup>

        <Card
          title={'Degree courses'}
          className={'flex flex-col'}>


        </Card>
        <Card
          title={'Upcoming Assignments'}
          className={'flex flex-col col-start-3'}>
          <div className={'flex flex-col gap-y-2'}>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 1
              </div>
            </LinkButton>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 2
              </div>
            </LinkButton>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 3
              </div>
            </LinkButton>

          </div>

        </Card>

        <Card
          title={'Recent Messages'}
          className={'flex flex-col'}>

          <div className={'flex flex-col gap-y-2'}>
            <LinkButton className={'flex !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>

            <LinkButton className={'flex  !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>

            <LinkButton className={'flex !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>
          </div>

        </Card>

      </CardGroup>
    </Body>
  );
};
export default Home;
