import Link from 'next/link';
import React, { useState } from 'react';
import { format } from 'date-fns';
import '../styles.css';

function LivrosList() {
  const [livros, setLivros] = useState([]);

  const handleList = async () => {
    // Stop the form from submitting and refreshing the page.  
    try {
      const response = await fetch('http://localhost:3000/api/livros', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      // console.log("data", data);
      setLivros(data.livros);

      // console.log(response);    
      if (response.ok) {
        // Lista criada com sucesso
        console.log('Lista criada com sucesso!');
      } else {
        // Lidar com erros de criação de lista
        console.error('Erro ao criar lista:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar lista:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response);

      if (response.ok) {
        // Livro excluído com sucesso
        console.log('Livro excluído com sucesso!');
        // Atualizar a lista de livros
        handleList();
      } else {
        // Lidar com erros de exclusão de autor
        console.error('Erro ao excluir livro:', response.status);
      }
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <button onClick={handleList} type="button">Listar Livros</button>
      <ul>
        {livros.map((livro: any) => (
          <main className='card' key={livro.id}>
            <Link href={`/livros/${livro.id}`} >
              <li >
                <strong>Nome: </strong>
                {livro.nome}
                <br />
                <strong>Lancamento: </strong>
                {format(new Date(livro.lancamento), 'dd/MM/yyyy')}
                <br />
                <strong>Descricao: </strong>
                {livro.descricao}
                <br />
                <strong>Categoria: </strong>
                {livro.categoria}
                <br />
              </li>
            </Link>
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          </main>
        )
        )}
      </ul>
    </div>
  );
}

export default LivrosList;