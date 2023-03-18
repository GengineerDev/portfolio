import '../styles/searchbox.css'

function Searchbox() {
    return (
        <div className="search-container">
            <input type="text" placeholder='Search' id="search-box"/>
            <button type="submit" class="search-button"><i class="fa fa-search"></i></button>
        </div>

    )
}

export default Searchbox