import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Carrinho.css';

const Carrinho = ({itensCarrinho, itens, date, groups, idGrupoSelecionado, setIdGrupoSelecionado, buttonCompraText, setButtonCompraText}) => {
  let [ yy, mm, dd ] = date.split('-'); 
  mm = new Date(date).toLocaleString('default', {month: 'long'});

  const next = (event) => {
    event.stopPropagation()
      let indexOf;
      groups.findIndex((grupo, index) => {
        console.log(index); 
        if(grupo.id == idGrupoSelecionado) {
          indexOf = index
        }
      });

      if(groups.length -1 > indexOf){
        setIdGrupoSelecionado(groups[indexOf+1].id)
      }

  }

  React.useEffect(()=>{
    console.log("lgth ", Object.keys(itensCarrinho).length === 0)
    if(Object.keys(itensCarrinho).length === 0){
      document.querySelectorAll('.btn-carrinho-next').forEach(item => item.setAttribute("disabled", "disabled"));
      
    } else {
      document.querySelectorAll('.btn-carrinho-next').forEach(item => item.removeAttribute('disabled'))
    }

    document.querySelectorAll('.contador-carrinho').forEach(contador => {
      const keys = Object.keys(itensCarrinho);

      contador.innerText = keys.reduce( (soma, key) => { return soma + itensCarrinho[key].quantidade }, 0);
    });
  }, [itensCarrinho]);

  const openCarrinho = ({target}) => {
    const divCarrinho = document.querySelector('.container-carrinho');
    const divListaProdutosCarrinho = document.querySelector('.lista-produtos-carrinho');
    const divContainerBtnCarrinho = document.querySelector('.container-btn-carrinho');

    if(divCarrinho.classList.contains('fechado')){
      divCarrinho.classList.remove('fechado');
      divCarrinho.classList.add('aberto'); 
      divListaProdutosCarrinho.classList.add('aberto');
      if(Object.keys(itensCarrinho).length != 0) {
        divContainerBtnCarrinho.classList.add('aberto-com-produtos')
        divContainerBtnCarrinho.classList.remove('fechado')
      } else{
        divContainerBtnCarrinho.style.display = 'none'
      }
    } else {
      if(divContainerBtnCarrinho.classList.contains('aberto-com-produtos')){
        divContainerBtnCarrinho.classList.remove('aberto-com-produtos');
        divContainerBtnCarrinho.classList.add('fechado')
      } else{
        divContainerBtnCarrinho.style.display = 'flex'
      }
      divListaProdutosCarrinho.classList.remove('aberto');
      divCarrinho.classList.remove('aberto');
      divCarrinho.classList.add('fechado');
    }
  }

  return (
    <div className="container-carrinho fechado" onClick={openCarrinho}>
      <div className="container-details-carrinho">
        <div className="details-carrinho">
          <div className="container-data-carrinho">
          <div className="dia-data-carrinho full">{dd}</div>
          <div className="separador-data-carrinho full"></div>
          <div className="conainer-mes-ano-carrinho">
            <div className="mes-data-carrinho full">{mm}</div>
            <div className="ano-mes-carrinhos">de {yy}</div>
          </div>
          </div>
          <div className="container-itens-carrinho">
          <div className="word-total-carrinho">Total</div>
          <div className="container-valor-carrinho">
            <div className="container-icon-carrinho">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '27px', height: '27px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <div className="contador-carrinho">0</div>
            </div>
            <div className="label-total-carrinho">
              <span>R$</span>
              <div className="valor-carrinho">0,00</div>
            </div>
          </div>
          <div className="container-detail-botton-carrinho">
            <svg className="seta-carrinho para-baixo" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" style={{color: 'rgb(90, 108, 124)', width: '25px', height: '25px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
            <div className="detail-botton-carrinho"></div>
          </div> 
          </div>    
        </div>
          <div className="lista-produtos-carrinho fechado"><span className="nenhum-produto">Nenhum produto adicionado ao carrinho</span></div>
        </div>
        <div className="container-btn-carrinho fechado">
            <Link to='/' className="btn-carrinho btn-carrinho-buy-other-day" onClick={(event) => event.stopPropagation()}>Comprar para outro dia
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '17px', height: '17px', marginRight: '5px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </Link>
          <button className="btn-carrinho btn-carrinho-next" onClick={next} >{buttonCompraText}
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '21px', height: '21px', marginTop: '2px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
    </div>
  )
}

export default React.memo(Carrinho);