'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '../../styles.css';

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

function Card() {
  const [livro, setLivro] = useState<ILivro>(initialState);
  const { id } = useParams() as { id: string }
  const router = useRouter();

  const getBookData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // console.log(response);
      // console.log("response", response);
      
      const data = await response.json();
      if (!data) {
        return router.push("/")
      }   
      console.log("data", data);
      
      setLivro(data);

      if (response.ok) {
        console.log('Sucesso!');
      } else {
        
        console.error('Erro ao pegar data do livro:', response.status);
      }
    } catch (error) {
      console.error('Erro ao pegar data do livro:', error);
    }
  };

  const handlePut = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });
      
      if (response.ok) {
        // Livro editado com sucesso
        console.log('Livro editado com sucesso!');
      } else {
        // Lidar com erros de edicao
        console.error('Erro ao editar livro:', response.status);
      }
    } catch (error) {
      console.error('Erro ao editar livro:', error);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  const handleOnChange = (value: String, key: string) => {
    setLivro((prev) => ({...prev, [key]: value}))
  }
  // console.log(livro);
  
  return (
    <main>
      <h2>Editar Livro</h2>
    <form onSubmit={handlePut} >
      <div>
        <label>Nome:</label>
        <input value={livro.nome} onChange={(e) => handleOnChange(e.target.value, "nome")} />
      </div>
      <div>
        <label>Data de lancamento:</label>
        <input
          type="date"
          value={livro.lancamento? new Date (livro.lancamento).toISOString().slice(0, 10): ""}
          onChange={(e) => handleOnChange(e.target.value, "lancamento")}
        />
      </div>
      <div>
        <label>Descricao:</label>
        <textarea value={livro.descricao} onChange={(e) => handleOnChange(e.target.value, "descricao")} />
      </div>
      <div>
        <label>Categoria:</label>
        <input value={livro.categoria} onChange={(e) => handleOnChange(e.target.value, "categoria")} />
      </div>
      <button type="submit">Editar Livro</button>
    </form>
   </main>
  );
}

export default Card;