const logIn = async(e) => {
    e.preventDefault()

    const username = document.getElementById('inputusername').value.trim()
    const password = document.getElementById('loginpassword').value.trim()

    if (!username || !password) return

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.replace('/')
    else alert('Failed to log in.')
}
if (document.getElementById('loginsubmit')) document.getElementById('loginsubmit').addEventListener("click", logIn)

const signUp = async(e) => {
    e.preventDefault()

    const username = document.getElementById('inputusername').value.trim()
    const password = document.getElementById('signuppassword').value.trim()
    const passwordConfirm = document.getElementById('signuppassword2').value.trim()

    if (!username || !password || !passwordConfirm) return
    if (password !== passwordConfirm) return alert('Passwords do not match')

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }) 
    if (response.ok) document.location.replace('/')
    else alert('Failed to sign up.')
}
if (document.getElementById('signupsubmit')) document.getElementById('signupsubmit').addEventListener("click", signUp)

async function logOut(e){
    e.preventDefault()

    const response = await fetch('/api/user/logout', {
        method: 'POST'
    })

    if(response.ok) document.location.replace('/')
    else alert('Logout failed somehow.')
}
if (document.getElementById('logoutbutton')) document.getElementById('logoutbutton').addEventListener("click", logOut)

async function newPost(e){
    e.preventDefault()

    const title = document.getElementById('posttitle').value.trim()
    const body = document.getElementById('posttext').value.trim()

    const response = await fetch('/api/blog/newpost', {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.replace('/user')
    else alert('Post Failed.')
}
if (document.getElementById('postsubmit')) document.getElementById('postsubmit').addEventListener("click", newPost)

async function newComment(e){
    e.preventDefault()

    const body = document.getElementById('commenttext').value.trim()
    const postId = window.location.href.split('/').pop().replace('?', '')

    const response = await fetch('/api/blog/newcomment', {
        method: 'POST',
        body: JSON.stringify({body, postId}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.reload()
    else alert('Post Failed.')
}
if (document.getElementById('commentsubmit')) document.getElementById('commentsubmit').addEventListener("click", newComment)

const navigateComments = (e) =>{
    e.stopPropagation()

    if (e.target.nodeName == 'I' || e.target.nodeName == 'BUTTON') return
    const postId = e.currentTarget.dataset.postid

    return document.location.replace(`/comment/${postId}`)
}
document.querySelectorAll(".blogpost").forEach(post => {
    post.addEventListener("click", navigateComments)
})

const editPost = (e) => {
    e.stopPropagation()

    const id = e.currentTarget.dataset.edit
    const targetElement = document.querySelector(`[data-posttext="${id}"]`)

    targetElement.contentEditable = true
    targetElement.classList.add("editing")
    targetElement.focus()
    document.querySelectorAll(".blogpost").forEach(post => {
        post.removeEventListener("click", navigateComments)
    })

    targetElement.addEventListener("blur", saveEditedPost)
}
document.querySelectorAll(".editpost").forEach(edit => {
    edit.addEventListener("click", editPost)
})

const saveEditedPost = async(e) => {
    const targetElement = e.target
    targetElement.removeEventListener("blur", saveEditedPost)
    targetElement.classList.remove("editing")
    document.querySelectorAll(".blogpost").forEach(post => {
        post.addEventListener("click", navigateComments)
    })

    const id = e.currentTarget.dataset.posttext
    const body = targetElement.innerText.trim()
    const user = document.querySelector('.username').innerText

    const response = await fetch('/api/blog/postedit', {
        method: "PUT",
        body: JSON.stringify({body, id}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.replace(`/user/${user}`)
    else alert('Failed to edit.')
}

const deletePost = async(e) => {
    e.stopPropagation()

    const id = e.currentTarget.dataset.delete
    const user = document.querySelector('.username').innerText
   
    const response = await fetch('/api/blog/postdelete', {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.replace(`/user/${user}`)
    else alert('Failed to delete.')
}
document.querySelectorAll(".deletepost").forEach(post => {
    post.addEventListener("click", deletePost)
})