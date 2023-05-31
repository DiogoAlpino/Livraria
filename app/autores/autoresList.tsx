import React, { useState } from 'react';
import { format } from 'date-fns';
import '../styles.css';

function AutoresList() {
  const [autores, setAutores] = useState([]);

  const handleList = async () => {
    // Stop the form from submitting and refreshing the page.  
      try {
        const response = await fetch('http://localhost:3000/api/autores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        // console.log("data", data);
        setAutores(data.autores);

        // console.log(response);    
        if (response.ok) {
          // Autor criado com sucesso
          console.log('Lista criado com sucesso!');
        } else {
          // Lidar com erros de criação de autor
          console.error('Erro ao criar lista:', response.status);
        }
      } catch (error) {
        console.error('Erro ao criar lista:', error);
      }
    };

  return (
    <div>
      <h2>Lista de Autores</h2>
      <button onClick={handleList} type="button">Listar Autores</button>
      <ul>
      {autores.map((autor: any) => (
        <div className='card'  key={autor.id}>
            <li >
              <strong>Nome: </strong>
              {autor.nome}
              <br />
              <strong>Data de Nascimento: </strong>
              {format(new Date(autor.dataNascimento), 'dd/MM/yyyy')}
              <br />
              <strong>Biografia: </strong>
              {autor.biografia}
            </li>
          </div>
          )
        )}
      </ul>
    </div>
  );
}

export default AutoresList;