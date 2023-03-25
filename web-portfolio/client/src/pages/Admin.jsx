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
  const [showEdit, setShowEdit] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Recent Work')
  const categories = ['Recent Work', 'Organizations', 'Competitions', 'Initiatives']
  const [entries, setEntries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    axios.get(`/api/entries/${activeCategory}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error(err))
  }, [activeCategory])

  const handleAddClick = () => {
    setShowForm(true)
  }

  const handleEditClick = () => {
    setShowForm(true)
    setShowEdit(true)
  }

  const handleCloseModal = () => {
    setShowForm(false)
    setShowEdit(false)
    axios.get(`/api/entries/${activeCategory}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error(err))
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios.delete(`/api/entries/${selectedEntry}`)
        .then(res => {
          console.log(res)
          alert("Success!")
          setEntries(entries.filter(entry => entry._id !== selectedEntry))
        })
        .catch(err => console.error(err))
    }
  } 

  return (
      <div className='admin form'>
          <MainButton type="special" handleClick={handleAddClick}>ADD AN ENTRY</MainButton>
          <br /><br /><br />
          <h1>--- or ---</h1>
          <br /><br /><br />
          <div className='admin container adjustToRight'>
            <SelectCategory
              name="category-search"
              id="category-search"
              onChange={(e) => setActiveCategory(e.target.value)}
              options={categories}
            />

            <Searchbox setSearchQuery={setSearchQuery} />
          </div>
          
          <select name="listbox" size='10' onChange={(e) => {
            setSelectedEntry(e.target.value)
            setDisabled(e.target.value === '')
          }}>
          {entries
            .filter((entry) => entry.category === activeCategory && entry.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((entry) => (
              <option key={entry._id} value={entry._id}>
                {entry.title}
              </option>
            ))
          }
          {entries.filter((entry) => entry.category === activeCategory && entry.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <option disabled>No entries found in this category</option>
          )}

          </select>

          <div className='admin container gap'>
              <MainButton type="special" disabled={disabled} handleClick={handleEditClick}>EDIT</MainButton>
              <MainButton type="special" handleClick={handleDelete} disabled={disabled}>DELETE</MainButton>
          </div>
          {showForm && <Modal
              onClose={handleCloseModal}
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
            <ModalForm categories={categories} edit={showEdit}/>
          </Modal>}

      </div>
        
    )
}

export default Admin