/* eslint-disable @next/next/no-img-element */
import { getEmojiFromUnicode } from '@/app/utils/misc/randomEmoji';
import { useSelector } from 'react-redux';

interface IAvatarProps {
  size?: string;
}

const Avatar = ({ size }: IAvatarProps) => {
  const { coverImg, id } = useSelector((state: any) => state.user);

  const avatarDefaultClassName =
    'rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ';

  const avatarClassName = size
    ? avatarDefaultClassName + size
    : avatarDefaultClassName + 'w-52 h-52';

  return (
    <div className="avatar w-full mx-auto justify-center  rounded-full">
      <div className={avatarClassName}>
        {id ? (
          <img referrerPolicy="no-referrer" src={coverImg} alt={'profile'} />
        ) : (
          <div className="text-3xl text-white text-center h-full  bg-white">
            <p className="pt-1">{getEmojiFromUnicode(coverImg)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
