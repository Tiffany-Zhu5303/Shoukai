import './App.css'
import { Link } from 'react-router-dom'

const App = () => {

  return (
    <div className='home-page'>
      <h1 id="home-title">Find something new!</h1>
      <p>Discover a new anime to binge or find a new favorite character</p>
      <div id="home-buttons">
        <Link to="/anime" className="options-button"><p id="start-text">Anime</p></Link>
        <Link to="/character" className="options-button" id="char-button"><p>Character</p></Link>
      </div>
    </div>
  )
}

export default App
