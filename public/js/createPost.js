async function submitPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const contents = document.querySelector('#postContents').value.trim();
    console.log(title, contents);
    const response = await fetch(`/newPost`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('response: ', response);
    if (response.ok) {
        //document.location.replace('/dashboard');
    } else {
        alert('Failed to create project');
    }
}


document.querySelector('#submit-post').addEventListener('submit', submitPost);