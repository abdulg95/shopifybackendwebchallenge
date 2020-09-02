import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { beginDeletePhoto } from '../actions/photos';
import { connect } from 'react-redux';



const Photo = ({ dispatch,id,caption,tags,userid,auth }) => {
  const onDelete = e => {
    e.preventDefault();
    dispatch(beginDeletePhoto(id)); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  
return (
<div className="photo">
<div>
<img src={`http://localhost:3300/photos/${id}`} alt={caption} />
</div>
<div className="caption">
<p>{caption}</p>
</div>
{(userid===auth.user.id) && <Button className ="deletebutton" onClick={onDelete}  variant="danger">delete image</Button>}
<ButtonGroup aria-label="Basic example">  
  {tags.map((tag) =>
                    <Button variant="secondary" >{tag}</Button>)}  
</ButtonGroup>
</div>

);
};




// const Photo = ({ id,caption,tag }) => {
//   return (
//     <Card className="photo">
//       <Card.Img
//         variant="top"
//         src={`http://localhost:3300/photos/${id}`}
//         alt="Photo"
//       />
//     <Card.Body>    
//       <Card.Text>
//         {caption}
//       </Card.Text>  
//    </Card.Body>
//     </Card>
//   );
// };
const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
  auth: state.auth
});

export default connect(mapStateToProps)(Photo);
