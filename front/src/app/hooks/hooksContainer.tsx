import NeedLoginModal from '../components/general/modal/needLogin';
import ShareModal from '../components/general/modal/shareModal';
import useAnalitics from './custom/useAnalitics';
import useRedirect from './custom/useRedirect';
import useCheckUserInfo from './state/useCheckUserInfo';
import useCreateAvatar from './state/useCreateAvatar';
import useGetBodiesList from './state/useGetBodiesList';

const HooksContainer = () => {
  useAnalitics();
  useRedirect();
  useCheckUserInfo();
  useGetBodiesList();
  useCreateAvatar(); // this create the avatar on change detected

  return (
    <>
      <ShareModal />
      <NeedLoginModal />
    </>
  );
};

export default HooksContainer;
