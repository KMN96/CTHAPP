import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom, favouritesAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { isAuthenticated } from '../lib/authenticate';

const PUBLIC_PATHS = ['/register', '/login', '/', '/_error'];

export default function RouteGuard(props) {
  const [authorized, setAuthorized] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const router = useRouter();

  async function updateAtoms() {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [searchHistory, favourites, router.events, router.pathname]);

  return <>{authorized && props.children}</>;
}
