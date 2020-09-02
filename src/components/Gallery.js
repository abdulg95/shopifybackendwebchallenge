/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startLoadPhotos } from '../actions/photos';
import Photo from './Photo';
import { setSearchField } from '../actions/search';

const Gallery = ({ errors, photos,search, dispatch,auth }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(startLoadPhotos());
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsLoading(false);
    }
  }, [photos]);

  const handleOnChange = (event) => {   
    dispatch(setSearchField(event.target.value));
  }; 

  const tags = photos.map(photo =>photo.tags).flat();

  function isSearchedTag(tag) {
    return tag.toLowerCase().includes(search.toLowerCase());
  }

  const filteredPhotos = photos.filter(photo =>{
    return (photo.caption.toLowerCase().includes(search.toLowerCase())||photo.tags.some(isSearchedTag));
  })


  return (
    <div>     
      <div className='tc pa1 pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search images or tags'
        onChange={handleOnChange}
      />
      </div>   
      <div className="photos-list">
        {errors && errors.get_error && (
          <p className="errorMsg centered-message">{errors.get_error}</p>
        )}
        {isLoading ? (
          <div className="loading-msg centered-message">Loading...</div>
        ) : (
          filteredPhotos.map((photo) => <Photo key={photo.id} id={photo.id} caption={photo.caption} tags={photo.tags} userid={photo.userid} auth={auth} />)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
  search: state.search || '',
  auth: state.auth
});

export default connect(mapStateToProps)(Gallery);
