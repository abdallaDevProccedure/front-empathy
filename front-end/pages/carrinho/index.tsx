import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CarrinhoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getProdutosFromLocalStorage = () => {
      const produtosLocalStorage = localStorage.getItem('cartItems');
      if (produtosLocalStorage) {
        setProdutos(JSON.parse(produtosLocalStorage));
      }
    };

    getProdutosFromLocalStorage();
  }, []);

  useEffect(() => {
    const calcularTotal = () => {
      const total = produtos.reduce((accumulator, produto) => accumulator + produto.price, 0);
      setTotal(total);
    };

    calcularTotal();
  }, [produtos]);

  const handleRemoverProduto = (id) => {
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    setProdutos(novosProdutos);
    localStorage.setItem('cartItems', JSON.stringify(novosProdutos));
  };

  const handleFinalizarCompra = () => {
    localStorage.setItem('price', JSON.stringify(total));
    setTimeout(() => {
      router.push('/pagamento');
    }, 100);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold bg-blue-300 h-28 pt-8 p-2">Carrinho de Compras</h1>
        {produtos.length === 0 ? (
          <p className="text-gray-600">Nenhum produto no carrinho.</p>
        ) : (
          <div>
            <ul className="grid gap-4">
              {produtos.map((produto) => (
                <li key={produto.id} className="flex items-center bg-white rounded p-4">
                  <img src={`http://localhost:3001/files/${produto.img}`} alt="imagem" className="w-20 h-auto mr-4" />
                  <div>
                    <h2 className="text-lg font-bold mb-2">{produto.name}</h2>
                    <p className="text-blue-500 mb-1">{produto.desc}</p>
                    <p className="text-blue-500 font-bold">Preço: R$ {produto.price}</p>
                  </div>
                  <button className="ml-auto text-red-500 font-bold" onClick={() => handleRemoverProduto(produto.id)}>Remover</button>
                </li>
              ))}
            </ul>
            <p className="text-blue-500 font-bold mt-2">Total: R$ {total}</p>
            <button className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded" onClick={handleFinalizarCompra}>Finalizar Compra</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CarrinhoPage;
