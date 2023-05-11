import NeedLoginModal from '../components/general/modal/needLogin';
import ShareModal from '../components/general/modal/shareModal';
import useAnalitics from './custom/useAnalitics';
import useRedirect from './custom/useRedirect';
import useCheckUserInfo from './state/useCheckUserInfo';

const HooksContainer = () => {
  useAnalitics();
  useRedirect();
  useCheckUserInfo();

  return (
    <>
      <ShareModal />
      <NeedLoginModal />
    </>
  );
};

export default HooksContainer;
