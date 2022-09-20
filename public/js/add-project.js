//Add Project
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="project-title"]').value;
    const post_content = document.querySelector('#project_content').value;

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);