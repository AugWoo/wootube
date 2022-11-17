const videoContainer = document.querySelector('#videoContainer');
const form = document.querySelector('#commentForm');

const addComment = (text, id) => {
  const videoComments = document.querySelector('.video__comments ul');
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.classList.add('video__comment');
  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';
  const span = document.createElement('span');
  span.innerText = `${text}`;
  const span2 = document.createElement('span');
  span2.innerText = '❌';
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value;
  const videoId = videoContainer.dataset.video_id;
  if (text.trim() === '') {
    alert('Not vacuum.');
    return;
  }
  const { response } = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });
  textarea.value = '';
  const { newCommentId } = await response.json();
  if (response === 201) {
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}
