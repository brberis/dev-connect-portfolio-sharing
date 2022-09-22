// edit comment handler
async function editFormHandler(event) {
    event.preventDefault();
  
    const commentText = document.querySelector('textarea[name="commentText"]').value.trim();
    var projectId = document.querySelector('input[name="projectId"]').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        commentText,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log("RES", response);
      document.location.replace('/project/' + projectId);
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);