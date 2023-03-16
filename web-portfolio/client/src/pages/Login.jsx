import icon from '/face_co.svg'
import MainButton from '../components/MainButton'
import '../styles/login.css'

function Login() {

    const handleSignIn = async () => {
        const username = document.querySelector('input[type="text"]').value
        const password = document.querySelector('input[type="password"]').value
    
        const response = await fetch('/api/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
    
        const data = await response.json()

    
        if (response.ok) {
          console.log(data.user)
          alert("Success!")
          // Redirect user to /admin here
        } else {
          console.error(data.message)
        }
    }

    return (
        <div className="login-form">
            <img src={icon} alt="User Avatar" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <MainButton type="special" handleClick={handleSignIn}>Sign In</MainButton>
        </div>
    )
}

export default Login