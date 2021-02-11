import 'core-js/stable';
import { async } from 'q';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import shoppinglistView from './views/shoppinglistView.js';
import mealsView from './views/mealsView.js';


const recipeController = async function(){
    try{
        //1. get the id
        let  id = window.location.hash.slice(1);
       
        if(!id) return;

        //[ hiding the meal plan container ]
        recipeView.hide();   
        //2. render the loader
        recipeView._renderLoader();

        //3.get the recipe
        await model.getRecipe(id);


           //1.render the search results
           if(model.state.search.results.length > 0){
               searchResultsView._render(model.getResultsPerPage());
           }
           //2.render the bookmarks results
            bookmarksView._render(model.state.bookmarks);

     

        //4.render the recipe
        recipeView._render(model.state.recipe);

        
        
    }catch(err){
        recipeView._renderErrorMessage();
    }  
}

const searchResultsController = async function(data){
   try{
    if(!data) return;

    //1.render the loader
    searchResultsView._renderLoader();

    //2.get search results
    await  model.getSearchResults(data);

    //3.render the search results
    searchResultsView._render(model.getResultsPerPage());

    //4.render initial pagination buttons
    paginationView._render(model.state.search);


   }catch(err){
     searchResultsView._renderErrorMessage(err.message);
   }
}


const paginationController = function(page){
    //1.render the search results 
    searchResultsView._render(model.getResultsPerPage(page));

    //2. render the pagination buttons
    paginationView._render(model.state.search);
}

const servingsController = function(newServings){
    console.log(newServings);
    //update the servings and nutritions of the current recipe in the state
    model.updateByServings(newServings);

    //render the updated servings and nutritions recipe
    recipeView._render(model.state.recipe);
}

const bookmarkController = function(){
    //add or delete bookmark
    if(!model.state.recipe.bookmarked){
        model.addBookmark(model.state.recipe);
    }else{
        model.deleteBookmark(model.state.recipe.id);
    }

    //render the recipe 
    recipeView._render(model.state.recipe);

    //rendering the bookmarks
    bookmarksView._render(model.state.bookmarks);
}

const loadBookmarksController = function(){
    bookmarksView._render(model.state.bookmarks);
}

const shoppingListController = function(){
    //render the items to the shopping list
    shoppinglistView._render(model.state.recipe.ingredients);
}


const mealController = async function(info){
    try{

    //[ hiding the recipe container]    
    mealsView.hide();
    
    //[hiding the form and overlay]
    mealsView._meal('hidden');

    //render the loader
    mealsView._renderLoader();
    
    //get the meal
    await model.getMeal(info);

    //render the meal
    if(info.timeFrame === 'day'){
        mealsView._render(model.state.dayMeal);
    }
    if(info.timeFrame === 'week'){
        mealsView._render(model.state.weekMeal);
    }
    }catch(err){
        console.log(err);
    }
}


function init(){
    recipeView.addHandlerRenderRecipe(recipeController);
    recipeView.addHandlerUpdateServings(servingsController);
    recipeView.addHandlerBookmark(bookmarkController);
    recipeView.addHandlerShoppinglist(shoppingListController);
    searchView.addHandlerSearch(searchResultsController);
    paginationView.addHandlerPagination(paginationController);
    bookmarksView.addHandlerLoadBookmarks(loadBookmarksController);
    mealsView.addHandlerMeal(mealController);
    console.log('welcome to git and github');
}
init();




