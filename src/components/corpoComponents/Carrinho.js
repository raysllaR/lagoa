import React from 'react';
import './styles/Carrinho.css';

const Carrinho = ({itensCarrinho, itens, date, groups, idGrupoSelecionado, setIdGrupoSelecionado, buttonCompraText, setButtonCompraText, setItensCarrinho}) => {
  let [ yy, mm, dd ] = date.split('-'); 
  mm = new Date(date).toLocaleString('default', {month: 'long'});
  const [ openClosedCarrinho, setOpenClosedCarrinho ] = React.useState('close');

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

      if(buttonCompraText === 'Finalizar Compra'){
        window.location.href = '/login'
      }
  }

  const excluirItemCarrinho = (event) => {
    event.stopPropagation();

    delete itensCarrinho[event.target.getAttribute('value')]
    if((Object.keys(itensCarrinho).length === 0)){
      setOpenClosedCarrinho('close');
    }
    setItensCarrinho({...itensCarrinho})
  }

  //TODO: mudar a setinha de direção quando clicar no para abrir o carrinho
  
  const adicionarItensNoListCarrinho = () => {
    const divProdutosCarrinho = document.querySelector('.lista-produtos-carrinho');
    divProdutosCarrinho.innerHTML = ``;
    
    if(Object.keys(itensCarrinho).length === 0){
      divProdutosCarrinho.innerHTML = `<span>Nenhum produto adicionado ao carrinho</span>`;
    } else {
     
      Object.keys(itensCarrinho).forEach(key => {
        const newProdutosListaCarrinho = document.createElement('div');
        newProdutosListaCarrinho.classList.add('produto-lista-carrinho')
        newProdutosListaCarrinho.setAttribute('id', itensCarrinho)

        newProdutosListaCarrinho.innerHTML += ` 
          <div class="produto-lista-carrinho" value="${key}"><div class="nome-produto-lista-produtos-carrinho" value="${key}">INGRESSO ANTECIPADO DAY USER + ALMOÇO BOSQUE</div>
          <div class="container-qtde-e-valor-produto">
          <div class="qtde-produto-lista-produtos-carrinho" value="${key}">1x</div>
          <div class="valor-produto-lista-produtos-carrinho" value="${key}">R$&nbsp;99,90</div>
          <svg class="icon-excluir-item-lista-produtos-carrinho" value="${key}" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div></div>
        `
        divProdutosCarrinho.appendChild(newProdutosListaCarrinho);
      });
      
      document.querySelectorAll('.icon-excluir-item-lista-produtos-carrinho').forEach(item => item.addEventListener('click', excluirItemCarrinho));
    }
  }

  React.useEffect(()=>{
    if(Object.keys(itensCarrinho).length === 0){
      document.querySelectorAll('.btn-carrinho-next').forEach(item => item.setAttribute("disabled", "disabled"));
      
    } else {
      document.querySelectorAll('.btn-carrinho-next').forEach(item => item.removeAttribute('disabled'))
    }

    document.querySelectorAll('.contador-carrinho').forEach(contador => {
      const keys = Object.keys(itensCarrinho);

      contador.innerText = keys.reduce( (soma, key) => { return soma + itensCarrinho[key].quantidade }, 0);
    });

    document.querySelectorAll('.valor-carrinho').forEach(valor => {
      const keys = Object.keys(itensCarrinho);

      let addVirgula = keys.reduce( (soma, key) => { return soma + (itensCarrinho[key].quantidade * itensCarrinho[key].item.tarifarios[0].valor) }, 0)
      
      valor.innerText = (addVirgula/100).toLocaleString("pt-BR", { minimumFractionDigits: 2, currency: 'BRL' });
    });

    adicionarItensNoListCarrinho();
    
  }, [itensCarrinho]);

  React.useEffect(() => {
    const setasCarrinho = document.querySelectorAll('.seta-carrinho');
    const divCarrinho = document.querySelector('.container-carrinho');
    const divListaProdutosCarrinho = document.querySelector('.lista-produtos-carrinho');
    const divContainerBtnCarrinho = document.querySelector('.container-btn-carrinho');
    
    setasCarrinho.forEach(seta => seta.classList.toggle('para-cima'));

    switch(openClosedCarrinho){
      case 'open':
        if(divCarrinho.classList.contains('fechado')){
          document.querySelector('#tabs').style.marginTop = '200px';
          divCarrinho.classList.remove('fechado');
          divCarrinho.classList.add('aberto'); 
          divListaProdutosCarrinho.classList.add('aberto');
          if(Object.keys(itensCarrinho).length !== 0) {
            divContainerBtnCarrinho.classList.add('aberto-com-produtos')
            divContainerBtnCarrinho.classList.remove('fechado')
          } else{
            divContainerBtnCarrinho.style.display = 'none'
          }
        }
        break;
        case 'close':
          document.querySelector('#tabs').style.marginTop = '10px';
          if(divContainerBtnCarrinho.classList.contains('aberto-com-produtos')){
            divContainerBtnCarrinho.classList.remove('aberto-com-produtos');
            divContainerBtnCarrinho.classList.add('fechado')
          } else{
            divContainerBtnCarrinho.style.display = 'flex'
          }
          divListaProdutosCarrinho.classList.remove('aberto');
          divCarrinho.classList.remove('aberto');
          divCarrinho.classList.add('fechado'); 
          break;
    }
  }, [openClosedCarrinho]);

  React.useEffect(() => {
    const divCarrinhoFull = document.querySelector('.details-carrinho-full');
    const divDetailsCarrinho = document.querySelector('.details-carrinho');
    window.addEventListener('scroll', function(){
      const distanciaDoElementoAoTop = -2;
      divCarrinhoFull.style.top = divDetailsCarrinho.getBoundingClientRect().top + document.querySelector('.container-carrinho').clientHeight - 120 <= distanciaDoElementoAoTop ? 0 : '-90px'
    });
  }, []);

  return (
    <div className="container-carrinho fechado" onClick={() => setOpenClosedCarrinho( (openClosedCarrinho == 'close') ? 'open' : 'close' )}>
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
            <svg className="seta-carrinho para-baixo para-cima" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" style={{color: 'rgb(90, 108, 124)', width: '25px', height: '25px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
            <div className="detail-botton-carrinho"></div>
          </div> 
          </div>    
        </div>
          <div className="lista-produtos-carrinho fechado"><span className="nenhum-produto">Nenhum produto adicionado ao carrinho</span></div>
        </div>
        <div className="container-btn-carrinho fechado">
          <button className="btn-carrinho btn-carrinho-buy-other-day" onClick={(event) => {event.stopPropagation(); window.location.href="/"}}>
              <span className='outro-dia'>Comprar para outro dia</span>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '17px', height: '17px', marginRight: '5px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            
          </button>
          <button className="btn-carrinho btn-carrinho-next" onClick={next} >{buttonCompraText}
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '21px', height: '21px', marginTop: '2px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
    </div>
  )
}

export default React.memo(Carrinho);