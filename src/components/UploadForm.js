import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhoto } from '../actions/photos';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { setSearchField } from '../actions/search';

const UploadForm = ({ errors, dispatch,auth }) => {
  const [photo, setPhoto] = useState(null);  
  const [caption, setCaption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErroMsg] = useState(null);
  const [tags, setTags] = useState(["example tag"]);

  useEffect(() => {
    setErroMsg(errors);
  }, [errors]);

  useEffect(() => {
    setErroMsg(''); // reset error message on page load
    dispatch(setSearchField(''));// reset search on pageload
  }, []);

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };  
  
  const handleOnCaptionChange = (event) => {
    const text = event.target.value;
    setCaption(text);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();    
    if (photo && caption) {
      const userid = auth.user.id;
      setErroMsg('');
      dispatch(beginAddPhoto(photo,caption,tags,userid));      
      setIsSubmitted(true);
    }
  };

  return (
    <React.Fragment>
      {errorMsg && errorMsg.upload_error ? (
        <p className="errorMsg centered-message">{errorMsg.upload_error}</p>
      ) : (
        isSubmitted && (
          <p className="successMsg centered-message">
            Photo uploaded successfully.
          </p>
        )
      )}
      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data"
        className="upload-form"
      >
        <Form.Group>
          <Form.Label>Choose photo to upload</Form.Label>          
          <Form.Control type="file" name="photo" onChange={handleOnChange} />
          <Form.Control
                required
                type="text"
                name="caption"
                placeholder="Write a caption.." 
                maxLength="50"               
                onChange={handleOnCaptionChange}
              />          
         <ReactTagInput 
          tags={tags} 
          maxTags={5}
          onChange={(newTags) => setTags(newTags)}
        />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`${!photo && !caption ? 'disabled submit-btn' : 'submit-btn'}`}
          disabled={photo && caption ? false : true}
        >
          Upload
        </Button>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
  auth: state.auth,

});

export default connect(mapStateToProps)(UploadForm);