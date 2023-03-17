import icon from '/face_co.svg'
import MainButton from '../components/MainButton'
import axios from 'axios'
import '../styles/login.css'

function Login() {

    const handleSignIn = async () => {
        const username = document.querySelector('input[type="text"]').value
        const password = document.querySelector('input[type="password"]').value
    
        try {
            const response = await axios.post('/api/users', { username, password })
            const data = response.data
            console.log(data.user)
            alert("Success!")
            // Redirect user to /admin here
        } catch (err) {
            console.error(err.response.data.message)
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
