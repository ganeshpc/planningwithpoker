import { useEffect, useState } from 'react';

import { Avatar } from '@mui/material';

import { getImageUrl } from '../utils/utils';

const UserProfilePicture = ({ width, height, profilePicture }) => {
 
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {

    const getAndSetImageUrl = async (profilePicture) => {
      const url = await getImageUrl(profilePicture)
      setImageUrl(url);
    }

    if (profilePicture) {
      getAndSetImageUrl(profilePicture);
    }
  }, [])

  return (
    <Avatar
      alt="Profile Picture"
      src={imageUrl}
      sx={{
        width: width,
        height: height
      }}
    ></Avatar>
  );
};

export default UserProfilePicture;
