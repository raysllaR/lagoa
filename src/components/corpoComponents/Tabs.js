import React, { useState } from 'react';
import style from"./styles/Tabs.module.css";

const Tabs = ({groups, setDadosCard, listItens}) => {
  const [idGrupoSelecionado, setidGrupoSelecionado] = useState(groups[0].id); //Entrega o id da primeira posição do array

  const mudarIdGrupoParaIdTabSelecionado = ({target}) => {
    return setidGrupoSelecionado(target.id);
  }
  
  React.useEffect(() => {
    const setItensCardsUsandoIdGrupoSelecionado = (array) => {
      return array.filter(item => item.grupos.includes(idGrupoSelecionado))
    };

    let listItensCard = setItensCardsUsandoIdGrupoSelecionado(listItens);
    listItensCard.sort((obj1, obj2) => {
      return ((obj1[idGrupoSelecionado] > obj2[idGrupoSelecionado])) ? -1 : 1;
    })
    setDadosCard(listItensCard);
  }, [idGrupoSelecionado]);

  return (
    <div className={style.Tabs}>
      {console.log("Refez o html")}
      {groups.map((group) => (
        <button onClick={mudarIdGrupoParaIdTabSelecionado} key={group.id} id={group.id} className={group.id === idGrupoSelecionado ? style.buttonAtivo : ``}>{group.nome}</button>
      ))}
    </div>
  )
}

export default React.memo(Tabs); //A aplicação estava sendo recarregada duas vezes, uma pelo corpo e outra por sozinha, o memo evita q ela seja recarregada pelo corpo