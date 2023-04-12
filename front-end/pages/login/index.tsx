import React, { useState } from 'react';
import { getUser } from '../api/apiAll';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validation = await getUser(email, password);
    console.log(validation);

    if (validation) {
      localStorage.setItem('user', JSON.stringify({ email: email, loggedIn: true }));

      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 max-w-sm w-full mx-auto rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="block w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-gray-500 text-sm text-center">
          Não tem uma conta?{' '}
          <Link href="/registro" className="text-blue-500">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
