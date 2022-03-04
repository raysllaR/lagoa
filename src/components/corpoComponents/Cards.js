import React from 'react';
import './styles/Cards.css';

const Cards = ({itens}) => {

  const itemMaisVendido = (arrayGrupos, arraIdGruposMaisVendidos) => {
      return arrayGrupos.find(grupo => arraIdGruposMaisVendidos.includes(grupo));
  }

  return (
    <section className="cards">
       {itens.map(item => (
           
            <div key={item.iditens} className='card'>
           {console.log(item)}
            <img alt="" className="img-card" src={`${item.imagem}`} />
            { itemMaisVendido(item.grupos, item.idGroupMaisVendidos) && <img className="img-imagem-mais-vendido" src="https://sofalta.eu/meuingresso/public/assets/images/arts/mais-vendido.png" />}
                <div className="infos-card">
                <div className="container-descricao-card">
                    <div className="container-nome-valor-produto-card">
                    <div className="nome-produto" id="${objDadosCard.id}">${item.nome}</div>
                    <div className="container-valor-produto">
                        <span className="${objDadosCard.classeActivValueOriginal}">${item.nome}</span>
                        <div className="container-display-valor">
                        <span>R$</span>
                        <div className="valor-produto" id="${objDadosCard.id}">${item.tarifarios[0].valor}</div>
                        </div>
                    <div className="max-parcelamento">${`em até ${item.nome}x`}</div>
                    </div>
                </div>
                <div className="descricao-card">
                    <p>{item.descricao}</p>
                </div>
                </div>
                <div className="container-regras-card">
                <div className="regra-card-${objDadosCard.classeContemFaixaEtaria}">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="23px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span className="regra-idade">{`A partir de 11 anos` /*  ${item.itens.ingressos[0]['idade_minima']} */}</span> 
                </div>
                <div className="regra-card-ativo"> 
                    <svg className="regra-condicao" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="23px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span className="regra-condicao">Regras e condições</span>
                </div> 
                </div>
                <div className="container-btn-card ${objDadosCard.classeIsComprar}">
                <div className="btn-comprar-card ${objDadosCard.classeIsComprar}" id="${objDadosCard.id}">
                    <div className="btn btn-subtrair ${objDadosCard.classeIsComprarBtn}" id="${objDadosCard.id}">-</div><span className="label-quantidade-produto" id="${objDadosCard.id}">0</span>
                    <div className="btn btn-adicionar ${objDadosCard.classeIsComprarBtn}" id="${objDadosCard.id}">+</div>
                </div>
                </div>
            </div>
            </div>
       ))}
    </section>
  )
}

export default Cards