import wallpaper from '../assets/white-wallpaper.jpg';
import AvatarComponent from '../components/AvatarComponent';

const Avatar = () => {
  return (
    <div
      className='min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4'
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className='w-full flex justify-center'>
        <AvatarComponent />
      </div>
    </div>
  );
};

export default Avatar;
