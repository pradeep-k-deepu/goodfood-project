import View from "./View";

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__label__container');
    _bookmarkIcon = document.querySelector('.bookmarks');
    _bookmarkContainer = document.querySelector('.bookmarks__labels');
    _errorMsg = 'no bookmarks yet, find a nice recipe and bookmark it...';

    constructor(){
        super();
    this._bookmarkIcon.addEventListener('mouseover',this._bookmarksShow.bind(this,1,'visible'));
    this._bookmarkIcon.addEventListener('mouseout',this._bookmarksShow.bind(this,-1,'hidden'));

    this._bookmarkContainer.addEventListener('mouseover',this._bookmarksShow.bind(this,1,'visible'));
    this._bookmarkContainer.addEventListener('mouseout',this._bookmarksShow.bind(this,-1,'hidden'));
    }

    addHandlerLoadBookmarks(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }

    _bookmarksShow(value1,value2){
        this._bookmarkContainer.style.zIndex = value1;
        this._bookmarkContainer.style.visibility = value2;
    }


    _generateMarkup(){
      return this._data.map(this._generateMarkupBookmark).join('');
    }
    

    _generateMarkupBookmark(recipe){
        let id = +window.location.hash.slice(1);
        return `
        <li class="${id === recipe.id ? 'active' : ''}"> 
            <a href="#${recipe.id}"> 
                <img class="recipe__image" src="${recipe.image}" alt="">
                <h2 class="recipe__title">${recipe.title.length >= 17 ? recipe.title.slice(0,17) + '...' : recipe.title}</h2>
            </a> 
         </li> 
        `;
    }
}

export default new BookmarksView();