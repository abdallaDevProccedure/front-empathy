import React, { useState, useEffect } from 'react';

const PagamentoPage = () => {
  const [nome, setNome] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [dataExpiracao, setDataExpiracao] = useState('');
  const [codigoSeguranca, setCodigoSeguranca] = useState('');
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados de pagamento enviados:', {
      nome,
      numeroCartao,
      dataExpiracao,
      codigoSeguranca
    });
  };

  useEffect(() => {
    const produtosLocalStorage = localStorage.getItem('price');
    setPrice(produtosLocalStorage)
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Página de Pagamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome no Cartão</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="numeroCartao">Número do Cartão</label>
        <input
          type="text"
          id="numeroCartao"
          value={numeroCartao}
          onChange={(e) => setNumeroCartao(e.target.value)}
        />
        <label htmlFor="dataExpiracao">Data de Expiração</label>
        <input
          type="text"
          id="dataExpiracao"
          value={dataExpiracao}
          onChange={(e) => setDataExpiracao(e.target.value)}
        />
        <label htmlFor="codigoSeguranca">Código de Segurança</label>
        <input
          type="text"
          id="codigoSeguranca"
          value={codigoSeguranca}
          onChange={(e) => setCodigoSeguranca(e.target.value)}
        />
        <h1>Valor total a pagar: {price}</h1>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded"
        >
          Pagar
        </button>
      </form>
    </>
  );
};

export default PagamentoPage;
