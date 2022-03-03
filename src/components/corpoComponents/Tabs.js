import React from 'react';
import "./styles/Tabs.css";

const Tabs = ({groups}) => {
  return (
    <div className="container-nav-tabs">
      {groups.map((group, index) => (
        (index === 0) 
          ? <button key={group.id} className="btn-tab btn-ativo">{group.nome}</button>
            : <button key={group.id} className="btn-tab">{group.nome}</button>
      ))}
    </div>
  )
}

export default Tabs;