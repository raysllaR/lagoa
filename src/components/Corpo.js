import React from 'react';

const Corpo = () => {

  const [dadosApi, setDadosApi] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const requisicaoGetApi = async (url) => {
    try {
      setLoading(true);

      let response = await fetch(url);
      if (!response.ok) {
        throw "Erro de conexão com o servidor!"
      }

      let responseJson = await response.json();

      if(responseJson.itens.length === 0) throw "Não há engressos disponiveis para o dia selecionado!";

      setDadosApi(responseJson);   
      
      
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
    requisicaoGetApi(`https://sofalta.eu/api/v4/empreendimentos/lagoa/produtos/ingressos/ingressos?data=2022-03-10`);
  }, []);
  if(dadosApi) console.log(dadosApi.itens[0]);
  if(error) return <div>{error}</div>
  if(loading) return (
  <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: '#fff', display: 'block'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#01549d" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
  </svg>)

  return (
    (dadosApi === null) 
      ? null 
      : (
          <div>Corpo</div>
        )
  )
}

export default Corpo;