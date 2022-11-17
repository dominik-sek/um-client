import { Body } from "../src/layout/body";
import { NextPageWithLayout } from './_app';
import { Sidebar } from '../src/components/shared/navigation/sidebar';

export const Settings:NextPageWithLayout = ():JSX.Element =>{
  return (
    <Body navbar>
        settings
    </Body>
  )
}
export default Settings;

Settings.getLayout = (page) =>{
  return (
    <>
      <Sidebar />
      {page}
    </>
  )
}