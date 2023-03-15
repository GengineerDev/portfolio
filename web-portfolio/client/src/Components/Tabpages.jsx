import React, { useState } from 'react'
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
            <p>This is the content for Recent Work tab.</p>
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