import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/corpoComponents/Cards';
import Carrinho from '../components/corpoComponents/Carrinho';
import Loading from '../components/corpoComponents/Loading';
import MessageError from '../components/corpoComponents/MessageError';
import Tabs from '../components/corpoComponents/Tabs';
import { fetchGetDayIgressos } from '../store/dadosApi';
import './styles/Corpo.css';

const Corpo = () => {

  //TODO: mudar a forma como os itens do carrinho são salvos! E selecionar o dia da compra!

  const [itensCarrinho, setItensCarrinho] = React.useState([]);
  const [dadosApi, setDadosApi] = React.useState(null);
  const [itensCards, setItensCard] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [ date, setDate ] = React.useState(null);

  const callDispatch = async (date) => {
    date = date.split('-').reverse().join('-');
    setDate(date)
    const data = await dispatch(fetchGetDayIgressos(date));
    
    if(data.payload.message != null) return setError(data.payload);
    if(data.payload != null) return setDadosApi(data.payload);
  }

  React.useEffect(() => {
    let dataSelecionada = window.atob(window.location.href.split('http://localhost:3000/lagoa/#/ingressos/')[1])
    callDispatch(dataSelecionada);

    try{
      if(localStorage.getItem('itensLista')){
        setItensCarrinho(JSON.parse(localStorage.getItem('itensLista')));
      }
    }catch(e){
      localStorage.setItem('itensLista', []);
      setItensCard({});
    }
  }, []);

  React.useEffect(() => {
    if(state.fetchGetApiIngressos.loading != null)
      setLoading(state.fetchGetApiIngressos.loading);
  }, [state]);


  if(error) return  <MessageError error={error} />
  if(loading && !itensCards) return <Loading />  //O loading só encerra quando os cards tiverem itens para ser exibidos
  if(!dadosApi) return null;
  return (
    <section className='container-corpo-site'>
      <Carrinho itens={dadosApi.itens} itensCarrinho={itensCarrinho} date={date} />
      <Tabs groups={dadosApi.grupos} setDadosCard={setItensCard} listItens={dadosApi.itens} />
      {itensCards && <Cards itens={itensCards} qtdParcelamentos={dadosApi.maximoQtdParcelamento} setItensCarrinho={setItensCarrinho} itensCarrinho={itensCarrinho} date={date} /> /** Evita chamar o componente duas vezes*/}
    </section>    
  );
}

export default Corpo;