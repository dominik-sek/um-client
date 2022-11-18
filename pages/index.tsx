import type { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppProps } from 'next/app';

const AdminDashboard = dynamic(() => import('./admin') );
const TeacherDashboard = dynamic(() => import('./teacher') );
const StudentDashboard = dynamic(() => import('./student') );

const Home: NextPage = ({ data }:InferGetServerSidePropsType<GetServerSideProps>) =>{

    switch(data.role){
        case 'ADMINISTRATOR':
            return <AdminDashboard />
        case 'PRACOWNIK':
            return <TeacherDashboard />
        case 'STUDENT':
            return <StudentDashboard />
        default:
            return <div>Brak dostępu</div>

    }
  }

export default Home;

// @ts-ignore
export async function getServerSideProps({req}) {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/checkauth',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.cookie
      },
      credentials: 'include',

    })
  const data = await res.json()

  // Pass data to the page via props
  return {
    props: { data }
  }
}