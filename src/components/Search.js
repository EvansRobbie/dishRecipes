import React, {useState} from 'react'
import { useGlobalContext } from '../Context'
import loading from '../assets/load.gif'

const Search = () => {
  const {setSearchTerm, fetchRandomUrl, isLoading} = useGlobalContext()
  const [text, setText] = useState('')


  if (isLoading){
    return( <section className='section'>
        <img src={loading} alt='' className='img'/>
       
        <h4>Loading..</h4>
    </section>)
}
  const handleSearch = (e) =>{

      setText(e.target.value)

  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(text){
      setSearchTerm(text)
      setText('')
    }
  }
  const handleRandomMeal = ()=>{
    setSearchTerm(text)
    setText('')
      fetchRandomUrl()
  }


  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' onChange={handleSearch} value ={text} placeholder='Type favourite meal'/>
        <button className='btn' type="submit" >Search</button>
        <button className='btn btn-hipster' type='button' onClick={handleRandomMeal}>surprise me!</button>
      </form>

    </header>
  )
}

export default Search