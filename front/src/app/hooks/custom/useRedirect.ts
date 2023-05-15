import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useRedirect = () => {
  const router = useRouter();
  const { id } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!router) return;
    if (router.pathname === '/signin') {
      if (id) {
        router.push('/profile-creator');
      }
    }

    if (router.pathname === '/profile') {
      if (!id) {
        router.push('/signin');
      }
    }

    if (router.pathname === '/') {
      if (id) {
        router.push('/profile-creator');
      } else {
        router.push('/signin');
      }
    }
  }, [id, router]);
};

export default useRedirect;
