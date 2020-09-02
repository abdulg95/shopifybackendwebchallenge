import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';

export const beginAddPhoto = (photo,caption,tags,userid) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('caption',caption);
      formData.append('tags',tags);      
      await axios.post(`${BASE_API_URL}/photos`, formData).then(res => {        
        const data =  {
          id: res.data._id,
          caption: caption,
          tags: tags,
          userid: userid
        }       
        axios.post(`${BASE_API_URL}/image`,data);
      }).catch((err) => {
        console.log("error",err);
      });
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const beginDeletePhoto = (id) => {
  return async (dispatch) => {
    try {      
      await axios.delete(`${BASE_API_URL}/photos/${id}`).then(res => {             
        axios.delete(`${BASE_API_URL}/images/${id}`);   
        dispatch(startLoadPhotos());
        
      }).catch((err) => {
        console.log("error",err);
      });
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const startLoadPhotos = () => {
  return async (dispatch) => {
    try {
      const photos = await axios.get(`${BASE_API_URL}/photos`);
      dispatch(loadPhotos(photos.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const loadPhotos = (photos) => ({
  type: 'LOAD_PHOTOS',
  photos
});