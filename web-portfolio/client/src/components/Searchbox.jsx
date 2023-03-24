import '../styles/searchbox.css'

function Searchbox(props) {
    return (
        <div className="search-container">
            <input type="text" placeholder='Search' id="search-box" onChange={(e) => props.setSearchQuery(e.target.value)} />
        </div>

    )
}

export default Searchbox