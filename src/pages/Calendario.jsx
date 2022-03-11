import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './styles/Calendario.module.css';

function Calendario() {
  useEffect(() => {
    const initCalendar = async () => {
      await new window.CalendarSFE('#calendar', 'lagoa', true);
    };

    initCalendar();
  });

  return (
    <div className={style.Calendario}>
      <div className={style.container}>
        <h2 className={style.titulo}>Escolha uma data para efetuar suas compras</h2>
        <p>Os preços mudam de acordo com a data selecionada e a temporada.</p>
        <div id="calendar" />
        <h2>O que você pode fazer agora?</h2>
        <div className={style.fazerAgora}>
          <Link to="/login" className={style.buttons}>
            <div>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="jss40" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className={style.text}>Minha conta</div>
          </Link>
          <Link to="/login" className={style.buttons}>
            <div>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="jss40" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className={style.text}>Minhas compras</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
