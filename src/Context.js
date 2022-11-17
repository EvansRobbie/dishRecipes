import React, {useContext, createContext, useEffect, useState} from 'react'

const AppContext = createContext()

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) =>{
    // Meals
  const [meals, setMeals] =  useState([])
//   Loading
  const [isLoading, setIsLoading] = useState(true)
//   search State
  const [searchTerm, setSearchTerm] = useState('')
//   Modal State
  const [showModal, setShowModal] = useState(false)

  const [selectedMeal, setSelectedMeal] = useState(null)
//   favourite state
  const [favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('favourites'))||[])

  const fetchRandomUrl = ()=>{
    setIsLoading(true)
    try{
        fetch(randomMealUrl)
        .then(res => res.json())
        .then(data => setMeals(data.meals))
    }catch(e){
        console.log(e)
    }
    setIsLoading(false)
  } 

  const fetchMeals = ()=>{
    setIsLoading(true)
    try{
        fetch(`${allMealUrl}${searchTerm}`)
        .then(res => res.json())
        .then(data => setMeals(data.meals))
    }catch(e){
        console.log(e)
    }
    setIsLoading(false)
  } 
    useEffect(() =>{
        fetchMeals()
        
    //   console.log(meals)
    },[searchTerm])

    const selectMeal = (idMeal, favouriteMeal ) =>{
        let meal;
        if(favouriteMeal){
            meal = favourite.find((meal) =>meal.idMeal === idMeal)
        }else{
        meal = meals.find((meal) =>meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)

    }
    // close Modal
    const closeModal = () =>{
        setShowModal(false)
    }
    const addToFavourite = (idMeal) =>{
        const alreadyFav = favourite.find((meal)=>meal.idMeal === idMeal)
        if (alreadyFav)return
        const meal = meals.find((meal) =>meal.idMeal === idMeal)
         const updatedFav = [...favourite, meal]
         setFavourite(updatedFav)
         localStorage.setItem('favourites', JSON.stringify(updatedFav))
        // console.log(idMeal)
        // setFavourite(prevFav =>{

        //     return prevFav.find((meal) =>{
        //         return meal.id === idMeal?{...prevFav, meal}:meal
        //     })
        // })
    }
    const removeFromFavourite = (idMeal) =>{
        const updatedFav = favourite.filter((meal) =>meal.idMeal !== idMeal)
        setFavourite(updatedFav)
        localStorage.setItem('favourites', JSON.stringify(updatedFav))
    }

    
    return <AppContext.Provider value={{meals, isLoading, setSearchTerm, fetchRandomUrl, showModal,selectedMeal, selectMeal, closeModal,favourite, addToFavourite, removeFromFavourite}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}