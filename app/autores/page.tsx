'use client'
import React, { useState } from 'react';
import AutoresList from './autoresList';

type IAutor = {
  nome?: string,
  dataNascimento?: string,
  biografia?: string,
}

const initialState = {
  nome: '',
  dataNascimento: '',
  biografia: ''
}

function CreateAutorForm() {
  const [autor, setAutor] = useState<IAutor>(initialState);
  // const [nome, setNome] = useState('');
  // const [dataNascimento, setDataNascimento] = useState('');
  // const [biografia, setBiografia] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    /* const data = {
      nome,
      dataNascimento,
      biografia,
    }; */

    try {
      const response = await fetch('http://localhost:3000/api/autores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autor),
      });

      setAutor(initialState); 

      if (response.ok) {
        // Autor criado com sucesso
        console.log('Autor criado com sucesso!');
      } else {
        // Lidar com erros de criação de autor
        console.error('Erro ao criar o autor:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar o autor:', error);
    }
  }; 

  const handleOnChange = (value: String, key: string) => {
    setAutor((prev) => ({...prev, [key]: value}))
  }
  console.log(autor);
  
  return (
    <main>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input value={autor.nome} onChange={(e) => handleOnChange(e.target.value, "nome")} />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={autor.dataNascimento}
          onChange={(e) => handleOnChange(e.target.value, "dataNascimento")}
        />
      </div>
      <div>
        <label>Biografia:</label>
        <textarea value={autor.biografia} onChange={(e) => handleOnChange(e.target.value, "biografia")} />
      </div>
      <button type="submit">Criar Autor</button>
    </form>
    <AutoresList />
   </main>
  );
}

export default CreateAutorForm;