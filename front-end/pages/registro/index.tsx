import React, { useState } from 'react';
import api from '../api/apiAll';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    console.log(name, email, password)
    const user = {
        "name": name,
        "password": password.toString(),
        "email": email.toString(),
        "phone": phone
    }
    console.log(user)
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await api.post("/user", user, headers)
    .then((response) => {
      console.log(response)
    }).catch((err) => {
      if(err.response) {
        console.log(err.response);
      } else {
        console.log("ERR: Tente mais tarde!")
      }
    })
    
    setName("");
    setEmail("");
    setPassword("");
    setPhone(undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 max-w-sm w-full mx-auto rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Registro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="submit"
            className="block w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-gray-500 text-sm text-center">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-500">
            Faça o login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
