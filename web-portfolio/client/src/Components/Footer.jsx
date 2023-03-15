function Footer() {
    const date = new Date()
    let year = date.getFullYear()
    return (
        <footer>
            <p>Copyright © {year} <span className='right'>pedegloriodavidgenesis@gmail.com | +639193700361 | <a href='https://github.com/Gengineering' target="_blank">GitHub </a>| <a href='https://trailblazer.me/id/codingsource' target="_blank">Salesforce </a></span></p>
        </footer>
    )
}

export default Footer