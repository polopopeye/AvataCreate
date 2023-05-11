/* eslint-disable @next/next/no-img-element */
import Comments from '@/app/components/comments/comments';
import UserComments from '@/app/components/comments/userComments';
import Container from '@/app/components/general/containers/container';
import { setCidFile } from '@/app/store/slices/infoFile/infoFile.slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const InfoPage = () => {
  const found = true; // profile exists?

  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = router.query;

  useEffect(() => {
    if (!cid || cid === '') return;
    dispatch(setCidFile(cid));

    return () => {
      dispatch(setCidFile(''));
    };
  }, [cid]);

  return (
    <Container>
      WIP - THIS WILL BE THE PROFILE PAGE WHERE YOU CAN UPLOAD/CREATE AND
      CUSTOMIZE YOUR AVATAR
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
  );
};

export default InfoPage;
