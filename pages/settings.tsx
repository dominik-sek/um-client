import { Body } from "../src/layout/body";
import { Sidebar } from '../src/components/shared/navigation/sidebar';
import { NextPage } from 'next';

export const Settings:NextPage = ():JSX.Element =>{
  return (
    <Body navbar>
        settings
    </Body>
  )
}
export default Settings;
