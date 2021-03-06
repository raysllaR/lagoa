/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import React from 'react';
import { useSelector } from 'react-redux';
import Carrinho from '../components/corpoComponents/Carrinho';

function Login({ isCarrinho }) {
  React.useEffect(() => {
    const initLogin = async () => {
      await window.SofaltaEu.Init({
        login: true,
        register: true,
        auto: true,
        plataforma: 'ingressos',
        logo: 'https://sofaltaeuimagens.s3-sa-east-1.amazonaws.com/sofaltaeu.svg',
        content: document.getElementById('entrySofaltaEu'),
        empreendimento: 'lagoa',
        callback: (token) => {
          if (token) {
            localStorage.setItem('token', token);
            window.location.href = 'http://localhost:3000/';
          } else {
            initLogin();
          }
        },
        dominioSFE: 'https://sofalta.eu',
        callbackUsuarioExiste: () => {},
        imagemSucesso: 'https://sofaltaeuimagens.s3-sa-east-1.amazonaws.com/sofaltaeu.svg',
        imagemBackground: 'https://sofalta.eu/meuingresso/public/lagoa/cadastro/backgroundLoginCadastro.jpg',
        corPrimaria: '#1197d5',
        corSecundaria: 'black',
        iconSenhaView: 'https://sofalta.eu/meuingresso/public/assets/images/icon/eye.svg',
        iconSenhaViewOff: 'https://sofalta.eu/meuingresso/public/assets/images/icon/eye_off.svg',
      });
    };

    initLogin();
  });

  const state = useSelector((state) => state);

  return (
    <>
      {
        (state.carrinho.quantidade !== 0 && isCarrinho) && <Carrinho pageLogin changeLogo />
      }
      <div id="entrySofaltaEu" />
    </>
  );
}

export default Login;
