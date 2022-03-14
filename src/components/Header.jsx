/* eslint-disable react/button-has-type */
import React from 'react';
import style from './styles/Header.module.css';

function Header() {
  function goToLoginPage() {
    window.location.href = '/login';
  }

  return (
    <header className={style.Header}>
      <div className={style.topo}>
        <div className={style.divLogoSoFaltaEu}>
          <img src="https://sofaltaeuimagens.s3-sa-east-1.amazonaws.com/sofaltaeu.svg" alt="Logo só falta eu" />
        </div>
        <div className={style.divButtons}>
          <button className={style.button} onClick={goToLoginPage}>
            Entrar / Cadastro
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={style.icon}
              style={{
                color: 'rgb(48, 58, 66)', width: '19px', height: '19px', marginLeft: '7px',
              }}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </button>

          <button className={`${style.buttonCelular} ${style.button}`}>
            Compre pelo celular
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="icon"
              style={{
                color: 'rgb(48, 58, 66)', width: '19px', height: '19px', marginLeft: '7px',
              }}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
            </svg>
          </button>
        </div>
      </div>
      <a href="/" className={style.aLogoLagoa}>
        <img src="https://sofalta.eu/meuingresso/public/lagoa/logos/logo-lagoa.svg" alt="Logo lagoa" />
      </a>
      <div className={style.divImgOnda} />
    </header>
  );
}

export default React.memo(Header);
