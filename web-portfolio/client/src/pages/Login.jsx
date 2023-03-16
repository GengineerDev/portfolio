import icon from '/face_co.svg'
import MainButton from '../components/MainButton'
import '../styles/login.css'

function Login() {
    return (
        <div className="login-form">
            <img src={icon} alt="User Avatar" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <MainButton type="special">Sign In</MainButton>
        </div>
    )
}

export default Login