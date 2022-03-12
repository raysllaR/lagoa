/* eslint-disable no-return-assign */
import React from 'react';

function Login() {
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
        callback: (token) => ((token) ? window.location.href = 'http://localhost:3000/' : initLogin()),
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

  return (
    <div id="entrySofaltaEu" />
  );
}

export default Login;
