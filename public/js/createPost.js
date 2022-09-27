async function submitPost() {
    const title = document.querySelector('#postTitle').value.trim();
    const contents = document.querySelector('#postContents').value.trim();
    const response = await fetch(`/newPost`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
            'Content-Type': 'text/html'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create project');
    }
}


document.querySelector('#submit-post').addEventListener('click', submitPost);