import React from 'react'
import { useGlobalContext } from '../Context'

const Favourites = () => {
    const {removeFromFavourite, selectMeal, favourite} = useGlobalContext()

    const favoriteElement = favourite.map((item)=>{
        const {idMeal, strMealThumb:image} = item
        return(
                <div key={idMeal} className='favorite-item'>
                    <img src={image} alt='' className='favorites-img img' onClick={()=>selectMeal(idMeal, true )}/>
                    <button className='remove-btn' onClick={() => removeFromFavourite(idMeal)}>remove</button>
                </div>
        )
    })

  return (
    <section className='favorites'>
        <div className='favorites-content'>
            <h5>Favourite</h5>
            <div className='favorites-container'>
               {favoriteElement}
            </div>
        </div>

    </section>
  )
}

export default Favourites