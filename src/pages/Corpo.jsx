/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/corpoComponents/Cards';
import Carrinho from '../components/corpoComponents/Carrinho';
import Loading from '../components/corpoComponents/Loading';
import MessageError from '../components/corpoComponents/MessageError';
import Tabs from '../components/corpoComponents/Tabs';
import { fetchGetDayIgressos } from '../store/dadosApi';
import style from './styles/Corpo.module.css';

function Corpo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, data } = state.fetchGetApiIngressos;
  const [itensCarrinho, setItensCarrinho] = React.useState([]);
  const [dadosApi, setDadosApi] = React.useState(null);
  const [itensCards, setItensCard] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [idGrupoSelecionado, setIdGrupoSelecionado] = React.useState(null);
  const [buttonCompraText, setButtonCompraText] = React.useState('Próximo passo');

  const callDispatch = async () => {
    const data = await dispatch(fetchGetDayIgressos());

    if (data.payload.message != null) { return setError(data.payload); }
    if (data.payload != null) { return setDadosApi(data.payload); }
  };

  React.useEffect(() => {
    const dataSelecionada = window.atob(
      window.location.href.split('http://localhost:3000/lagoa/#/ingressos/')[1],
    );
    callDispatch(dataSelecionada);

    try {
      if (localStorage.getItem('itensLista')) {
        setItensCarrinho(JSON.parse(localStorage.getItem('itensLista')));
      }
    } catch (e) {
      localStorage.setItem('itensLista', []);
      setItensCard({});
    }
  }, []);

  React.useEffect(() => {
    if (dadosApi != null
      && dadosApi.grupos !== null
      && idGrupoSelecionado != null) {
      let indexOf;

      dadosApi.grupos.findIndex((group, index) => {
        if (group.id === idGrupoSelecionado) { indexOf = index; }
      });

      if (indexOf === dadosApi.grupos.length - 1) {
        setButtonCompraText('Finalizar Compra');
      } else { setButtonCompraText('Próximo passo'); }
    }
  }, [buttonCompraText, dadosApi, idGrupoSelecionado]);

  const changeTextButtonOutroDia = () => {
    document.querySelector('.outro-dia').innerText = window.innerWidth < 546 ? 'Outro dia' : 'Comprar para outro dia';
  };
  React.useEffect(() => {
    // TODO: alterar como ta pegando o tamanho da tela
    window.addEventListener('resize', changeTextButtonOutroDia);
  }, []);

  if (state.fetchGetApiIngressos.error) { return <MessageError error={error} />; }
  if (loading && !itensCards) { return <Loading />; } // O loading só encerra quando os cards tiverem itens para ser exibidos
  if (!dadosApi) { return null; }

  return (
    <section className={style.ContainerCorpoSite}>
      <Carrinho
        itens={dadosApi.itens}
        itensCarrinho={itensCarrinho}
        groups={dadosApi.grupos}
        idGrupoSelecionado={idGrupoSelecionado}
        setIdGrupoSelecionado={setIdGrupoSelecionado}
        buttonCompraText={buttonCompraText}
        setButtonCompraText={setButtonCompraText}
        setItensCarrinho={setItensCarrinho}
      />
      <Tabs
        setDadosCard={setItensCard}
        listItens={dadosApi.itens}
      />
      {itensCards && (
        <Cards
          itens={itensCards}
          qtdParcelamentos={dadosApi.maximoQtdParcelamento}
          setItensCarrinho={setItensCarrinho}
          itensCarrinho={itensCarrinho}
        />
      ) /** Evita chamar o componente duas vezes */}
    </section>
  );
}

export default Corpo;
