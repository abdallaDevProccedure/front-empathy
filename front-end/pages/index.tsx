import Link from 'next/link';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { getAllProducts } from './api/apiAll';
import { useEffect, useState } from 'react';
import VLibras from '@djpfs/react-vlibras'

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const productsAll = await getAllProducts();
      setProducts(productsAll);
    };
    fetchData();

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setLoggedIn(true);
      setEmail(parsedUser.email);
    } else {
      setLoggedIn(false);
      setEmail('');
    }
  }, []);

  const handleAddToCart = (id: any) => {
    if (loggedIn) {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        const productToAdd = products.find(product => product.id === id);
        if (productToAdd) {
          const updatedCartItems = [...parsedCartItems, productToAdd];
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
      } else {
        const productToAdd = products.find(product => product.id === id);
        if (productToAdd) {
          localStorage.setItem('cartItems', JSON.stringify([productToAdd]));
        }
      }
      setShowPopup(true);
    } else {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
//
  return (
    <div className="bg-gray-500">
      <VLibras forceOnload={true} />
      <Head>
        <title>Empathy Store</title>
        <meta name="description" content="Empathy Store - Lista de Produtos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-blue-300 h-28">
        {loggedIn ? (
          <>
          <p className="text-2xl mb-4 pt-4 p-3">Seja bem-vindo {email}!</p>
          <button>
            <Link className="ml-auto text-red-500 font-bold text-xl p-3" href={`/carrinho?userId=${email}`}>
              Ir para o Carrinho
            </Link>
          </button>
        </>
        ) : (
          <button onClick={() => (window.location.href = '/login')} className={styles.loginButton}>
            Fazer Login
          </button>
        )}
      </header>
      <main className={styles.main}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white shadow-md p-4 rounded-md">
                <img
                  src={`http://localhost:3001/files/${product.img}`}
                  alt="imagem"
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex-1">
                    <span className="text-gray-800 text-sm font-medium">{product.name}</span>
                    <p className="text-gray-600 text-xs mt-1">R$ {product.price}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-md mt-2"
                    onClick={() => handleAddToCart(product.id)}
                  ></button>
                  <button>
                  Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showPopup && (
  <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div className="popup bg-white rounded-md max-w-md p-4">
      <span
        className="popup-close absolute top-2 right-2 text-gray-500 cursor-pointer"
        onClick={handleClosePopup}
      >
        Fechar
      </span>
      {loggedIn ? (
        <div className="text-center">
          <h3>Produto adicionado ao carrinho!</h3>
          <button className="bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-md mt-4" onClick={handleClosePopup}>
            Fechar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Deseja fazer o login?</h2>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-md mr-2"
              onClick={() => window.location.href = '/login'}
            >
              Fazer Login
            </button>
            <button
              className="bg-gray-300 text-gray-600 text-sm font-medium px-3 py-2 rounded-md"
              onClick={handleClosePopup}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}
      </main>
      <footer className={styles.footer}>
        <p>Empathy Store - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}




