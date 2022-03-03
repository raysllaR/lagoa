import React from 'react';
import style from "./styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.Footer}>
    <div className={style.content}>
      <div className={style.linkRedesSociais}>
        <a href="https://www.facebook.com/LagoaParqueseHoteis/" target="_blank">
          <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-facebook.svg" alt="Facebook Lagoa Parques e Hotéis" />
        </a>
        <a href="https://www.instagram.com/LagoaParqueseHoteis/" target="_blank">
          <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-instagram.svg" alt="Instagram Lagoa Parques e Hotéis" />
        </a>
        <a href="https://www.youtube.com/user/lagoaquenteoficial" target="_blank">
          <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-youtube.svg" alt="Youtube Lagoa Parques e Hotéis" />
        </a>
        <a href="https://www.tripadvisor.com.br/Attraction_Review-g1012170-d2349356-Reviews-Lagoa_Termas_Parque-Caldas_Novas_State_of_Goias.html" target="_blank">
          <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-tripadvisor.svg" alt="Tripadvisor Lagoa Parques e Hotéis" />
        </a>
        <a href="https://goo.gl/maps/ovfNu5nhahWXptAv8" target="_blank">
          <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-map.svg" alt="Localização Lagoa Parques e Hotéis" />
        </a>
      </div>
      <div className={style.infoParque}>
        <div className={style.infoTelephone}>
        <a href="https://api.whatsapp.com/send?phone=+556434550150&text=Ol%C3%A1!%20Vim%20do%20site%20Lagoa%20Parques%20e%20Hot%C3%A9is,%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas.">
            <img src="https://sofalta.eu/meuingresso/public/assets/social/icon-whatsapp.svg" alt="Whatsapp Lagoa Parques e Hotéis"/>
            (64) 3455-0150
        </a>
        </div>
        <p>Avenida Lagoa Quente, 05 - St. Lagoa Quente, Caldas Novas - GO</p>
        <p>Horário de funcionamento 9h às 18h</p>
      </div>
      <div className={style.logoLagoaFooter}>
        <a href="https://lagoa.com.br">
          <img src="https://sofalta.eu/meuingresso/public/lagoa/logos/logo-lagoa-white.svg" alt="logo-lago" />
        </a>
      </div>
    </div>
  </footer>
  )
}

export default React.memo(Footer);