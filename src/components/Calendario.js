import React, { useEffect } from 'react';

const Calendario = () => {

    useEffect(() => {
        async function pao(){
            await new window.CalendarSFE('#calendar', 'lagoa', false)
        } 
        pao();
    })

  return (
    <div id="calendar"></div>
  )
}

export default Calendario;