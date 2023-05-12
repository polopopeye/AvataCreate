import Link from 'next/link';

const Home = () => {
  return (
    <main>
      HIIII!!!! THIS IS THE HOME PAGE
      <div>test!</div>
      <Link href="/test">AVATAR CREATOR PROFILE</Link>
      <Link href="/test2">GALLERY OF AVATARS CREATED</Link>
    </main>
  );
};

export default Home;
