import './App.css';
// import {useState} from 'react'
import Search from './components/Search'
import Favourites from './components/Favourites'
import Meals from './components/Meals'
import { useGlobalContext } from './Context'
import Modal from './components/Modal'


function App() {
  const {showModal, favourite} = useGlobalContext()
  return (
    <main className="App">
      <Search/>
    {favourite.length > 0  && <Favourites /> }
     <Meals/>
     {showModal && <Modal/>}
     
    </main>
  );
}

export default App;
