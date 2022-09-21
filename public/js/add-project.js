
//Add Project
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('#description').value;
    const image_url = document.querySelector('#image-url').value;
    const github_url = document.querySelector('#github-url').value;
    const date = document.querySelector('#date').value;
    let public = document.querySelector('#public').value;
    if (public === 'on') {
        public = true
    }else{
        public = false
    }

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

window.datepicker = datepicker

window.test = () => {
  window.start = datepicker('[data-cy="daterange-input-start"]', {
    id: 1,
    alwaysShow: 0,
  })
  window.end = datepicker('[data-cy="daterange-input-end"]', {
    id: 1,
    alwaysShow: 0,
  })

  window.single = datepicker('input', {
    alwaysShow: 0,
    defaultView: 'overlay',
  })
}
