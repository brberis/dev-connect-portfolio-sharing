// edit project handler
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('#description').value;
    const image_url = document.querySelector('#image-url').value;
    const github_url = document.querySelector('#github-url').value;
    const date = document.querySelector('#date').value;
    const public = document.querySelector('#public').checked;

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        image_url,
        github_url,
        public,
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
  
  document.querySelector('.edit-project-form').addEventListener('submit', editFormHandler);