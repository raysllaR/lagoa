import React from 'react';
import Cards from './corpoComponents/Cards';
import Carrinho from './corpoComponents/Carrinho';
import Tabs from './corpoComponents/Tabs';
import './styles/Corpo.css';

const Corpo = () => {
  const [itensCarrinho, setItensCarrinho] = React.useState([]);
  const [dadosApi, setDadosApi] = React.useState(null);
  const [itensCards, setItensCard] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const requisicaoGetApi = async (url) => {
    try {
      setLoading(true);

      let response = await fetch(url);
      if ( !response.ok ) {
        throw "Erro de conexão com o servidor!"
      }

      let responseJson = await response.json();

      if( responseJson.itens.length === 0 ) {
        throw "Não há engressos disponiveis para o dia selecionado!";
      }

      setDadosApi(responseJson);
      
      if(localStorage.getItem('itensLista')){
        setItensCarrinho(JSON.parse(localStorage.getItem('itensLista')));
      }
      //objReturnFetch = await response.json();
      //createTabsAndContainerCards(objReturnFetch.grupos);
    }
    catch(erro){
      setError(erro);
    }
    finally{
      setLoading(false);
    }
  }

  React.useEffect(() => {
    requisicaoGetApi(`https://sofalta.eu/api/v4/empreendimentos/lagoa/produtos/ingressos/ingressos?data=2022-04-16`);
  }, []);


  if(error) return <div>{error}</div>
  if(loading && !itensCards) return (  //O loading só encerra quando os cards tiverem itens para ser exibidos
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: '#fff', display: 'block'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#01549d" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
      Carregando...
    </div>)
  if(!dadosApi) return null;
  return (
    <section className='container-corpo-site'>
      <Carrinho itens={dadosApi.itens} itensCarrinho={itensCarrinho} />
      <Tabs groups={dadosApi.grupos} setDadosCard={setItensCard} listItens={dadosApi.itens} />
      {itensCards && <Cards itens={itensCards} qtdParcelamentos={dadosApi.maximoQtdParcelamento} setItensCarrinho={setItensCarrinho} itensCarrinho={itensCarrinho} /> /** Evita chamar o componente duas vezes*/}
    </section>
  );
}

export default Corpo;