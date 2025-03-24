import { ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
  return (
    <ListGroup.Item>
      <strong>Valutazione: {comment.rate}</strong>
      <p>{comment.comment}</p>
    </ListGroup.Item>
  );
};

export default SingleComment;
