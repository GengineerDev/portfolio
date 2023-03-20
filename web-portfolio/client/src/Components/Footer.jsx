import '../styles/footer.css'
import useAuth from '../hooks/useAuth'

function Footer() {
    const date = new Date()
    let year = date.getFullYear()
    const isAuthenticated = useAuth()

    const handleLogout = () => {
        // handle logout logic here
    }

    return (
        <footer>
            <p>Copyright © {year} { isAuthenticated && <span>| <a href="#" onClick={handleLogout}>Logout</a></span> } <span className='right'>pedegloriodavidgenesis@gmail.com | +639193700361 | <a href='https://github.com/Gengineering' target="_blank">GitHub </a>| <a href='https://trailblazer.me/id/codingsource' target="_blank">Salesforce </a></span></p>
        </footer>
    )
}

export default Footer