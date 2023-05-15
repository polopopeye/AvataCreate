/* eslint-disable @next/next/no-img-element */
import BodySelector from '@/app/components/bodySelector/bodySelector';
import Comments from '@/app/components/comments/comments';
import UserComments from '@/app/components/comments/userComments';
import Container from '@/app/components/general/containers/container';
import ProfileDetails from '@/app/components/profile/ProfileDetails';
import Scene from '@/app/components/threeJS/scene';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InfoPage = () => {
  const { currentAvatarUrl } = useSelector((state: any) => state.avatar);

  const found = true; // TODO: profile exists?  Make diferents profiles...

  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = router.query;
  console.log(`fastlog => cid:`, cid);

  return (
    <>
      <div className="absolute z-50">
        <BodySelector />
      </div>
      <div className="flex w-full h-screen  z-10">
        <div className="grid h-full flex-grow card bg-base-300 rounded-box place-items-center">
          {currentAvatarUrl ? (
            <Scene />
          ) : (
            <div className="w-full mx-auto pt-8">
              <h1>Loading...</h1>
            </div>
          )}
        </div>
        <div className="grid h-full w-60 flex-grow card bg-base-300 rounded-box place-items-top pt-10 px-1">
          <ProfileDetails />
        </div>
      </div>
      <Container>
        {found ? (
          <>
            <Comments />
            <UserComments />
          </>
        ) : (
          <div className="w-full mx-auto pt-8">
            <img
              className="h-96 rounded-md mx-auto pt-8"
              src="https://media4.giphy.com/media/mPytjcsG3XS4o/giphy.gif?cid=ecf05e47yi7kpab2e0pjl4u5946u8rda6bx4p09c4rlhjyke&rid=giphy.gif&ct=g"
              alt="404"
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default InfoPage;
