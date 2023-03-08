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