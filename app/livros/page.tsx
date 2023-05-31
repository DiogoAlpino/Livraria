'use client'
import React, { useState } from 'react';
import LivrosList from './livrosList';

type ILivro = {
  nome?: string,
  lancamento?: string,
  descricao?: string,
  categoria?: string,
}

const initialState = {
  nome: '',
  lancamento: '',
  descricao: '',
  categoria: ''
}

function CreateBookForm() {
  const [livro, setLivro] = useState<ILivro>(initialState);
  // const [nome, setNome] = useState('');
  // const [dataNascimento, setDataNascimento] = useState('');
  // const [biografia, setBiografia] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });

      setLivro(initialState);

      if (response.ok) {
        // Livro criado com sucesso
        console.log('Livro criado com sucesso!');
      } else {
        // Lidar com erros de criação de livro
        console.error('Erro ao criar o livro:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar o livro:', error);
    }
  };

  const handleOnChange = (value: String, key: string) => {
    setLivro((prev) => ({ ...prev, [key]: value }))
  }
  // console.log(livro);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input value={livro.nome} onChange={(e) => handleOnChange(e.target.value, "nome")} />
        </div>
        <div>
          <label>Data de lancamento:</label>
          <input
            type="date"
            value={livro.lancamento}
            onChange={(e) => handleOnChange(e.target.value, "lancamento")}
          />
        </div>
        <div>
          <label>Descricao:</label>
          <textarea value={livro.descricao} onChange={(e) => handleOnChange(e.target.value, "descricao")} />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={livro.categoria}
            onChange={(e) => handleOnChange(e.target.value, "categoria")}
          />
        </div>
        <button type="submit">Criar Livro</button>
      </form>
      <LivrosList />
    </main>
  );
}

export default CreateBookForm;