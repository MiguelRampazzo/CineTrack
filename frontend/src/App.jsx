import Titulo from './components/Titulo.jsx'

function App() {
  return (
    <main>
      <Titulo />
      <p>© {new Date().getFullYear()} CineTrack</p>
    </main>
  )
}

export default App
