import * as firebaseService from '../firebase/firebaseService'; 

export const getImageUrl = async (imageName) => {
    const imageUrl = await firebaseService.getImageUrl(imageName);
    return imageUrl;
}