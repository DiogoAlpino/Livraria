import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h2>Lista de Livros</h2>
      <button onClick={handleList} type="button">Listar Livros</button>
      <ul>
      {livros.map((livro: any) => (
        <Link key={livro.id} href={`/livro/${livro.id}`} >
            <li >
              <strong>Nome: </strong>
              {livro.nome}
              <br />
              <strong>Lancamento: </strong>
              {livro.lancamento}
              <br />
              <strong>descricao: </strong>
              {livro.descricao}
              <br />
              <strong>categoria: </strong>
              {livro.categoria}
              <br />
            </li>
          </Link>
          )
        )}
      </ul>
    </div>
  );
}

export default LivrosList;