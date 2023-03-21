import MainButton from '../components/MainButton'
import Searchbox from '../Components/Searchbox'
import '../styles/admin.css'


function Admin() {

    return (
        <div className='admin form'>
            <MainButton>ADD AN ENTRY</MainButton>
            <br /><br /><br />
            <h1>--- or ---</h1>
            <br /><br /><br />
            <div className='admin container'>
 
                <select name="category" id="category-search">
                    <option value="default">--Choose--</option>
                    <option value="recent-work">Recent Work</option>
                    <option value="organizations">Organizations</option>
                    <option value="competitions">Competitions</option>
                    <option value="initiatives">Initiatives</option>
                </select>


                <Searchbox />

            </div>
            <select name="listbox" size='10'>
                <option value="Merceders"> Merceders </option>  
                <option value="BMW"> BMW </option>  
                <option value="Jaguar"> Jaguar </option>  
                <option value="Lamborghini"> Lamborghini </option>  
                <option value="Ferrari"> Ferrari </option>  
                <option value="Ford"> Ford </option>  
            </select>
            <div className='admin container gap'>
                <MainButton>EDIT</MainButton>
                <MainButton>DELETE</MainButton>
            </div>


        </div>
        
    )
}

export default Admin