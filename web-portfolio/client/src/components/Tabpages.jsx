import { useState, useEffect } from 'react'
import Card from './Card'
import axios from  '../axios-config'
import '../styles/tabpages.css'

function Tabpages() {
    const [activeTab, setActiveTab] = useState('Recent Work')
    const [entries, setEntries] = useState([])

    const handleTabClick = (tabName) => {
      setActiveTab(tabName)
    }

    useEffect(() => {
        axios.get(`/api/entries/${activeTab}`)
          .then(res => setEntries(res.data))
          .catch(err => console.error(err))
    }, [activeTab])

    const renderEntries = () => {
        if (entries.length === 0) {
          return <p>None found.</p>
        } else {
          return (
            <section>
              {entries.map((entry) => (
                <Card
                  key={entry._id}
                  thumbnail={entry.thumbnail}
                  alt={entry.title}
                  title={entry.title}
                  caption={entry.caption}
                  images={entry.images}
                />
              ))}
            </section>
          )
        }
    }
    

    return (
        <>
        <div className="tabs">
            <button
            className={activeTab === 'Recent Work' ? 'active' : ''}
            onClick={() => handleTabClick('Recent Work')}
            >
            Recent Work
            </button>
            <button
            className={activeTab === 'Organizations' ? 'active' : ''}
            onClick={() => handleTabClick('Organizations')}
            >
            Organizations
            </button>
            <button
            className={activeTab === 'Competitions' ? 'active' : ''}
            onClick={() => handleTabClick('Competitions')}
            >
            Competitions
            </button>
            <button
            className={activeTab === 'Initiatives' ? 'active' : ''}
            onClick={() => handleTabClick('Initiatives')}
            >
            Initiatives
            </button>
        </div>

        <div className="tab-content">
            {renderEntries()}
        </div>
        </>
    )
}

export default Tabpages