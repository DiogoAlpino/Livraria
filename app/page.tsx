import Link from 'next/link'
import './styles.css';

export default function Home() {
  return (
    <main className='main'>
      <h1>Home Page</h1>
      <Link className='link' href={`/livros`}>Livros</Link>
      <Link className='link' href={`/autores`}>Autores</Link>
    </main>
  )
}
