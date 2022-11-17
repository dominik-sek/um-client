import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './UserContext';
export { RouteGuard };

function RouteGuard({ children } : any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const userContext = useContext(UserContext);


  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url:string) {
    // redirect to login page if accessing a private page and not logged in

    //we need to call checkauth because the server sends a httponly cookie
    const isSessionActive = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(
        (response) => {
          return response.status === 200;
        })

    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!isSessionActive && !publicPaths.includes(path)) {
      userContext.setUser(null);
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }

    //if user is logged in, then redirect to home page
    if (isSessionActive && publicPaths.includes(path)) {
      router.push('/');
    }
  }

  return (authorized && children);
}