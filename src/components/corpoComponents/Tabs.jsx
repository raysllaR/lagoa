/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React from 'react';
import style from './styles/Tabs.module.css';

function Tabs({
  groups, setDadosCard, listItens, idGrupoSelecionado, setIdGrupoSelecionado,
}) {
  // Entrega o id da primeira posição do array

  const mudarIdGrupoParaIdTabSelecionado = ({ target }) => setIdGrupoSelecionado(target.id);

  React.useEffect(() => {
    setIdGrupoSelecionado(groups[0].id);
  }, []);

  React.useEffect(() => {
    const setItensCardsUsandoIdGrupoSelecionado = (array) => array.filter((item) => item.grupos.includes(idGrupoSelecionado));

    const listItensCard = setItensCardsUsandoIdGrupoSelecionado(listItens);
    listItensCard.sort((obj1, obj2) => (((obj1[idGrupoSelecionado] > obj2[idGrupoSelecionado])) ? -1 : 1));
    setDadosCard(listItensCard);
  }, [idGrupoSelecionado]);

  return (
    <div className={style.Tabs} id="tabs">
      {groups.map((group) => (
        <button onClick={mudarIdGrupoParaIdTabSelecionado} key={group.id} id={group.id} className={group.id === idGrupoSelecionado ? style.buttonAtivo : ''}>{group.nome}</button>
      ))}
    </div>
  );
}

export default React.memo(Tabs); // A aplicação estava sendo recarregada duas vezes, uma pelo corpo e outra por sozinha, o memo evita q ela seja recarregada pelo corpo
