import React from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import loading from '../assets/load.gif'
// , AiFillHeart
// import { useContext } from 'react'
import { useGlobalContext } from '../Context'
const Meals = () => {
    // create a custom Hook in the context.js
    // const context =useContext(AppContext)
    const {meals, isLoading, selectMeal, addToFavourite} = useGlobalContext()
    if (isLoading){
        return( <section className='section'>
            <img src={loading} alt='' className='img'/>
           
            <h4>Loading..</h4>
        </section>)
    }
    // console.log(meals)
    const mealEffect = meals?.map((meal) =>{
        const {idMeal, strMeal: title, strMealThumb: image} = meal
        return(
            <article key ={idMeal} className="single-meal">
                <img src ={image} alt='' className='img' onClick={()=>selectMeal(idMeal)} />
                <footer>
                    <h5>{title}</h5>
                    <button className='like-btn' onClick={()=>addToFavourite(idMeal)}><AiOutlineHeart/></button>
                </footer>
            </article>
        )
    })
    
  return (
    <section className='section-center'>
       {mealEffect}
    </section>
  )
}

export default Meals