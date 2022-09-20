// delete project handler
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="project-title"]').value.trim();
    const content = document.querySelector('input[name="content"]');
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        title,
        content: content.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-project-form').addEventListener('submit', editFormHandler);