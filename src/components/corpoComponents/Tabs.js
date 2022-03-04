import React, { useState } from 'react';
import style from"./styles/Tabs.module.css";

const Tabs = ({groups, setDadosCard, listItens}) => {
  const [idGrupoSelecionado, setidGrupoSelecionado] = useState(groups[0].id); //Entrega o id da primeira posição do array

  const mudarTabSelecionado = ({target}) => {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove(`${style.buttonAtivo}`));
    target.classList.add(`${style.buttonAtivo}`);
    setidGrupoSelecionado(target.id);
  }

  React.useEffect(() => {
    const filterArrayItensIdGrupo = (array) => {
      return array.filter(item => item.grupos.includes(idGrupoSelecionado))
    }
    setDadosCard(filterArrayItensIdGrupo(listItens));
  }, [idGrupoSelecionado]);

  return (
    <div className={style.Tabs}>
      {groups.map((group) => (
        <button onClick={mudarTabSelecionado} key={group.id} id={group.id} className={group.id === idGrupoSelecionado ? style.buttonAtivo : ``}>{group.nome}</button>
      ))}
    </div>
  )
}

export default Tabs;