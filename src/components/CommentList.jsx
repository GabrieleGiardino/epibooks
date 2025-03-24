const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <p>Nessun commento per questo libro.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.rate}</strong> - {comment.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
