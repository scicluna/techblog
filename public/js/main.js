//handles our logins
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

//handles our sign ups
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

//handles our logouts
const logOut = async(e)=>{
    e.preventDefault()

    const response = await fetch('/api/user/logout', {
        method: 'POST'
    })

    if(response.ok) document.location.replace('/')
    else alert('Logout failed somehow.')
}
if (document.getElementById('logoutbutton')) document.getElementById('logoutbutton').addEventListener("click", logOut)

//handles new posts
const newPost = async(e)=>{
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

//handles new comments
const newComment = async(e)=>{
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

//handles navigation to our comments section for a particular post
const navigateComments = (e) =>{
    e.stopPropagation()

    if (e.target.nodeName == 'I' || e.target.nodeName == 'BUTTON') return //preventing propagation issues
    const postId = e.currentTarget.dataset.postid

    return document.location.replace(`/comment/${postId}`)
}
document.querySelectorAll(".blogpost").forEach(post => {
    post.addEventListener("click", navigateComments)
})

//handles post editing
const editPost = (e) => {
    e.stopPropagation()

    const id = e.currentTarget.dataset.edit //targetting the post id
    const targetElement = document.querySelector(`[data-posttext="${id}"]`) //targetting the body element

    targetElement.contentEditable = true //making the field editable
    targetElement.classList.add("editing")
    targetElement.focus() //changing our focus to that element
    document.querySelectorAll(".blogpost").forEach(post => {
        post.removeEventListener("click", navigateComments)
    }) //removing our event listener for accessing the comment section

    targetElement.addEventListener("blur", saveEditedPost) //adding an event listener for when we stop focusing on the editted element
}
document.querySelectorAll(".editpost").forEach(edit => {
    edit.addEventListener("click", editPost)
})

//handles saving our new edits
const saveEditedPost = async(e) => {
    const targetElement = e.target
    targetElement.removeEventListener("blur", saveEditedPost) //remove event listener so it wont fire again
    targetElement.classList.remove("editing") 
    document.querySelectorAll(".blogpost").forEach(post => {
        post.addEventListener("click", navigateComments)
    }) //readd the event listeners for accessing the comments section of each post

    const id = e.currentTarget.dataset.posttext
    const body = targetElement.innerText.trim()
    const user = document.querySelector('.username').innerText //sketchy smuggling of a variable using our html skills

    const response = await fetch('/api/blog/postedit', {
        method: "PUT",
        body: JSON.stringify({body, id}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.replace(`/user/${user}`)
    else alert('Failed to edit.')
}

//handles deleting a post
const deletePost = async(e) => {
    e.stopPropagation()

    const id = e.currentTarget.dataset.delete //uses a dataset tag from our delete button to target the proper post id
    const user = document.querySelector('.username').innerText //sketchy smuggling of a variable using our html skills
   
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