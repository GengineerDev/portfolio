import { useState } from 'react'
import Card from './Card'
import '../styles/tabpages.css'
function Tabpages() {
    const [activeTab, setActiveTab] = useState('Recent Work')

    const handleTabClick = (tabName) => {
      setActiveTab(tabName)
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
            {activeTab === 'Recent Work' && (
                <section>
                    <Card 
                        thumbnail = "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_07/2233721/171120-smile-stock-njs-333p.jpg"
                        alt = "Picture of ALORA"
                        title = "ALORA (Private repo)"
                        caption = "ALORA is an offline LMS made using MERN stack, RPi, router, and signal booster."
                        images = {['https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80', 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80']}
                    />
                
                </section>
            
            
            )}
            {activeTab === 'Organizations' && (
            <p>This is the content for Organizations tab.</p>
            )}
            {activeTab === 'Competitions' && (
            <p>This is the content for Competitions tab.</p>
            )}
            {activeTab === 'Initiatives' && (
            <p>This is the content for Initiatives tab.</p>
            )}
        </div>
        </>
    )
}

export default Tabpages