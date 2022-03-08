import React, { useEffect } from 'react';
import './styles/Calendario.css';

const Calendario = ({setDate}) => {

  useEffect(() => {
      const initCalendar = async (event) =>{
        await new window.CalendarSFE('#calendar', 'lagoa', true)
      } 
      
      initCalendar();
  })

  return (
    <div id="calendar"></div>
  )
}

export default Calendario;