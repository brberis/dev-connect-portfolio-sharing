const { Project } = require("../../models");

//Add Project
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('#description').value;
    const image_url = document.querySelector('#image-url').value;
    const github_url = document.querySelector('#github-url').value;
    const date = document.querySelector('#date').value;
    const public = document.querySelector('#public').value;

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            image_url,
            github_url,
            date,
            public,
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