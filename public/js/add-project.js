//Add Project
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('#description').value;

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description
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