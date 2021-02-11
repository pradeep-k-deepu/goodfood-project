

import { async } from 'regenerator-runtime';
import {API__KEY,API__URL,RES_PER_PAGE,MEAL__API__URL} from './config.js';

//DATASTRUCTURE FOR STORING INFO
export let state = {
    recipe: {},
    search: {
        query: '',
        selects: {
            cuisine: '',
            diet: '',
        },
        results: [],
        resPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
}

const getRecipeImage = async function(id){
    let response = await fetch(`${API__URL}${id}/information?includeNutrition=false&apiKey=${API__KEY}`);

    let data = await response.json();
    return data.image;

}

export const getRecipe = async function(id){

    try{
       
        let response = await fetch(`${API__URL}${id}/information?includeNutrition=true&apiKey=${API__KEY}`);
        
        let image = await getRecipeImage(id);
    

        
        if(!response.ok) return;
        
        let data1 = await response.json();
       
        
       
        state.recipe = {
    
            id: data1.id,
            title: data1.title,
            image,
            cookingTime: data1.readyInMinutes,
            servings: 1,
            ingredients: data1.nutrition.ingredients.map(ing => {
                return {
                    quantity: ing.amount,
                    unit: ing.unit,
                    description: ing.name,
                }
            }),
            wps: {
                amount: Math.trunc(data1.nutrition.weightPerServing.amount),
                unit: data1.nutrition.weightPerServing.unit,
            },
            cps: Math.trunc(data1.pricePerServing),
           

            nutrients: data1.nutrition.nutrients.filter(n => {
                if(n.name === 'Calories') {
                    return n;
                }
                if(n.name === 'Carbohydrates') {
                    return n;
                }
                if(n.name === 'Fat'){
                    return n;
                }
                if(n.name === 'Fiber'){
                    return n;
                }
                if(n.name === 'Protein'){
                    return n;
                }
            }).map(n => {
                return {
                    amount: n.amount,
                    name: n.name,
                    unit: n.unit,
                }
            }),
            sourceUrl: data1.sourceUrl,
    
        }

        if(state.bookmarks.length > 0){
            if(state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)){
                state.recipe.bookmarked = true;
            }else{
                state.recipe.bookmarked = false;
            }
        }
            console.log(state);
    }catch(err){
      throw err;
    }
    
}



export const getSearchResults = async function(info){
   
    try{
        state.search.query = '';
        state.search.selects.cuisine = '';
        state.search.selects.diet = '';
        if(typeof info === 'string'){
            state.search.query = info;
        }
     
        if(typeof info === 'object'){
            if(info.cuisine === undefined && info.diet === undefined) throw new Error('please select cuisine or diet');
            state.search.selects.cuisine = info.cuisine;
            state.search.selects.diet = info.diet;
        }
     
         let response = await fetch(`${API__URL}complexSearch?query=${state.search.query}&cuisine=${state.search.selects.cuisine}&diet=${state.search.selects.diet}&number=100&apiKey=${API__KEY}`);
     
         
         
         if(!response.ok) return;
         let data = await response.json();
        
         
       state.search.results = data.results.map(recipe => {
             return {
                 id: recipe.id,
                 title: recipe.title.length >= 20 ? recipe.title.slice(0,17) + '...' : recipe.title,
                 image: recipe.image,
             }
         })
         state.search.page = 1;
    }catch(err){
       throw err;
    }
}



export const getResultsPerPage = function(page = state.search.page){
    state.search.page = page;
    let start = (page - 1) * 10;
    let end = page * 10;
  return  state.search.results.slice(start,end);
}


export const updateByServings = function(newServings){
    //update ingredients in state by new servings
    state.recipe.ingredients.forEach(ing => ing.quantity = ing.quantity * newServings /state.recipe.servings);

    //update nutritions in state by new servings
    state.recipe.nutrients.forEach(nutrient => nutrient.amount = nutrient.amount * newServings /state.recipe.servings);

    state.recipe.servings = newServings;

    console.log(state.recipe);
}

const persistStorage = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}


export const addBookmark = function(recipe){
    if(recipe.id === state.recipe.id){
        state.bookmarks.push(recipe);
        recipe.bookmarked = true;
        persistStorage();
       
    }
}

export const deleteBookmark = function(id){
    if(id === state.recipe.id){
        let index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
        state.bookmarks.splice(index,1);
        state.recipe.bookmarked = false;
        persistStorage();
    }
}


export const getMeal = async function(info){
    try{
        let response;
        let types = ['breakfast','lunch','dinner'];
        let days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
        if(info.timeFrame === 'day'){
             response = await fetch(`${MEAL__API__URL}?timeFrame=day&targetCalories=${info.calories}&diet=${info.diet}&apiKey=${API__KEY}`);
        }else{
             response = await fetch(`${MEAL__API__URL}?timeFrame=week&targetCalories=${info.calories}&diet=${info.diet}&apiKey=${API__KEY}`);
        }

        if(!response.ok) return;
    
        let data = await response.json();
       
        if(!data.week){
            state.dayMeal = {
                meals: await Promise.all(data.meals.map(async (meal,i) => {
                    return {
                        id: meal.id,
                        title: meal.title,
                        cookingTime: meal.readyInMinutes,
                        servings: meal.servings,
                        sourceUrl: meal.sourceUrl,
                        image: await getRecipeImage(meal.id),
                        type: types[i],
                    }
                })),
    
                nutrients: data.nutrients,
                timeFrame: 'day',
            }
           console.log(state);
        }
        else{
            let obj1 = Object.entries(data)[0][1]
            let obj2 =  Object.entries(obj1);
            let arr =  obj2.map(el => el[1]);

         state.weekMeal = await Promise.all(arr.map(async (obj,i) => {
               return {
                   day: days[i],
                   meals: await Promise.all(obj.meals.map(async (meal,i) => {
                       return {
                           id: meal.id,
                           title: meal.title,
                           cookingTime:  meal.readyInMinutes,
                           servings: meal.servings,
                           sourceUrl: meal.sourceUrl,
                           image: await getRecipeImage(meal.id),
                           type: types[i],
                       }
                   })),
                   nutrients: obj.nutrients,
               }
           }));
              
            
           
            console.log(state);
        }
       
       
    }catch(err){
        throw err;
    }
    
}

const init = function(){
   let storage =  JSON.parse(localStorage.getItem('bookmarks'));
   if(!storage) return;
   state.bookmarks = storage;
}
init();