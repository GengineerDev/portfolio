import MainButton from '../components/MainButton'
import Searchbox from '../components/Searchbox'
import SelectCategory from '../components/SelectCategory'
import ModalForm from '../components/ModalForm'
import Modal from '@material-ui/core/Modal'
import { useState, useEffect } from 'react'
import '../styles/admin.css'
import axios from '../axios-config'

function Admin() {
  const [showForm, setShowForm] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Recent Work')
  const categories = ['Recent Work', 'Organizations', 'Competitions', 'Initiatives']
  const [entries, setEntries] = useState([])
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    axios.get(`/api/entries/${activeCategory}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error(err))
  }, [activeCategory])

  const handleClick = () => {
    setShowForm(true)
  }

  return (
      <div className='admin form'>
          <MainButton type="special" handleClick={handleClick}>ADD AN ENTRY</MainButton>
          <br /><br /><br />
          <h1>--- or ---</h1>
          <br /><br /><br />
          <div className='admin container'>
            <SelectCategory
              name="category-search"
              id="category-search"
              onChange={(e) => setActiveCategory(e.target.value)}
              options={categories}
            />

            <Searchbox setSearchQuery={setSearchQuery} />


          </div>
          
          <select name="listbox" size='10' onChange={(e) => setDisabled(e.target.value === '')}>
          {entries
            .filter((entry) => entry.category === activeCategory && entry.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((entry) => (
              <option key={entry._id} value={entry.title}>
                {entry.title}
              </option>
            ))
          }
          {entries.filter((entry) => entry.category === activeCategory && entry.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <option disabled>No entries found in this category</option>
          )}

          </select>

          <div className='admin container gap'>
              <MainButton type="special" disabled={disabled}>EDIT</MainButton>
              <MainButton type="special" disabled={disabled}>DELETE</MainButton>
          </div>
          {showForm && <Modal
              onClose={() => {
                setDisabled(true)
                setShowForm(false)
              }}
              open={showForm}
              style={{
                  position: 'absolute',
                  backgroundColor: '#dedfe0',
                  boxShadow: '2px solid black',
                  height:'400px',
                  width: '600px',
                  margin: 'auto',
                  borderRadius: '50px'
              }}
          >
            <ModalForm categories={categories}/>
          </Modal>}

      </div>
        
    )
}

export default Admin