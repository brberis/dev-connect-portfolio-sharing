let params = (new URL(document.location)).searchParams;
let commentId = params.get("comment");
let del = params.get("d");
let ed = params.get("e");

if(del){
  deleteComment(commentId)
}

if(ed){
  editComment(commentId)
}

// delete comment handler
async function deleteComment(id) {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    baseUrl = window.location.href.split("?")[0];
    document.location.replace(baseUrl);
  } else {
    alert(response.statusText);
  }
}

// edit comment handler
async function editComment(id) {

  const response = await fetch(`/api/comment/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      comment_text: commentText,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/my-project/'+blogId);
  } else {
    alert(response.statusText);
  }
}
