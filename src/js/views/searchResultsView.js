import View from './View.js';

class SearchResultsView extends View{
    _parentElement = document.querySelector('.search__results');
    _errorMsg = 'no recipe found for your search...';

    _generateMarkup(){
      return this._data.map(this._generateMarkupResult).join('');
    }


    _generateMarkupResult(recipe){
        let id = +window.location.hash.slice(1);
        
        return ` <li class="${id === recipe.id ? 'active' : ''}"> 
            <a href="#${recipe.id}"> 
                <img class="recipe__image" src="${recipe.image}" alt="">
                <h2 class="recipe__title">${recipe.title}</h2>
            </a> 
         </li> `;
    }
   
}

export default new SearchResultsView();