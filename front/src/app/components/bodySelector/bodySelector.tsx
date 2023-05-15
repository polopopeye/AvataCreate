import { fetchAvatarCreateBody } from '@/app/store/slices/avatar/avatar.action';
import { setUserInfo } from '@/app/store/slices/user/user.slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BodySelector = () => {
  const { avatarBodies } = useSelector((state: any) => state.avatar);
  const { id: userId, currentBodyId } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  if (!avatarBodies || avatarBodies.length === 0) return <div>loading...</div>;

  const handleBodyChange = async (bodyId: string) => {
    document.getElementById('my-drawer')?.click();
    if (currentBodyId === bodyId) return;

    toast.info('Changing  Avatar Body...', {
      toastId: 'updatingBodyAvatar',
      type: 'info',
      isLoading: true,
      autoClose: false,
    });

    dispatch(
      fetchAvatarCreateBody({
        user_id: userId,
        body_id: bodyId,
      }) as any,
    );

    dispatch(setUserInfo({ currentBodyId: bodyId }) as any);
  };

  return (
    <>
      <div className="drawer overflow-hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-hidden pt-10 pl-5">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open Body Selector
          </label>
        </div>

        <div className="drawer-side overflow-hidden">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {avatarBodies
              .filter((body: { style: string }) => body.style === 'phr')
              .map((body: any, i: number) => {
                const { thumbnail_url, id: bodyId } = body;

                const isActive = currentBodyId === bodyId ? 'active' : '';

                return (
                  <li key={i}>
                    <a
                      className={isActive}
                      onClick={() => handleBodyChange(bodyId)}
                    >
                      <img src={thumbnail_url} />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BodySelector;
