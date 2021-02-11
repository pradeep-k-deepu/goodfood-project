import {Fraction} from 'fractional';
import View from './View.js';


class RecipeView extends View{
    _parentElement = document.querySelector('.recipe__container');
    _errorMsg = 'unable to load recipe, please try again later';
    

    hide(){
       document.querySelector('.meal__planner__container').style.zIndex = -1;
       document.querySelector('.recipe__container').style.zIndex = 1
    }

    addHandlerRenderRecipe(handler){
        let events = ['hashchange','load'];
        events.forEach(ev => window.addEventListener(ev,handler)) 
       
    }

    addHandlerUpdateServings(handler){
        this._parentElement.addEventListener('click',function(e){
            let btn = e.target.closest('.tiny__btns');
            if(!btn) return;

            let servings = +btn.dataset.servings;
            if(servings > 0){
                handler(servings);
            }
        })
    }


    addHandlerBookmark(handler){
        this._parentElement.addEventListener('click',function(e){
            let btn = e.target.closest('.bookmark__icon');
            if(!btn) return;
            handler();
        })
    }


    addHandlerShoppinglist(handler){
      this._parentElement.addEventListener('click',function(e){
            let btn = e.target.closest('.shopping__btn');
            if(!btn) return;
            handler();
        });
    }

    

    _generateMarkup(){
    return `
        <div class="recipe__image__title">
        <div class="recipe__container__image">
            <img src="${this._data.image}" alt="">
        </div>
        <div class="recipe__container__title">
            ${this._data.title}
        </div>
        </div>

        <div class="recipe__info">
            <div class="cooking__time">
                <h2>cooking time</h2><p>${this._data.cookingTime} min</p>
            </div>

            <div class="weight">
                <h2>weight per serving</h2> <p>${this._data.wps.amount} ${this._data.wps.unit}</p>
            </div>

            <div class="cost">
                <h2>cost per serving</h2><p>${this._data.cps}</p>
            </div>

            <div class="servings">
                <h2>${this._data.servings} servings</h2>
                <div class="servings__buttons">
                    <button class='tiny__btns' data-servings="${this._data.servings - 1}"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                    <button class='tiny__btns' data-servings="${this._data.servings + 1}"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                </div>
            </div>

            <div class="bookmark__icon">
                <div>
                    <i class="fa fa-bookmark${this._data.bookmarked ? '' : '-o'}" aria-hidden="true"></i>
                </div>
            </div>
        </div>


        <div class="recipe__nutrients">
            <div class="recipe__nutrients__calories">
                <img src="https://image.flaticon.com/icons/png/512/1912/1912723.png" alt="">
                <span>calories</span>
                <h2>${this._data.nutrients[0].amount.toFixed(1)} ${this._data.nutrients[0].unit}</h2>
            </div>

            <div class="recipe__nutrients__fat">
                <img src="https://image.flaticon.com/icons/png/512/1951/1951542.png" alt="">
                <span>fat</span>
                <h2>${this._data.nutrients[1].amount.toFixed(1)} ${this._data.nutrients[1].unit}</h2>
            </div>

            <div class="recipe__nutrients__carbs">
                <img src="https://icon-library.com/images/carbs-icon/carbs-icon-13.jpg" alt="">
                <span>carbs</span>
                <h2>${this._data.nutrients[2].amount.toFixed(1)} ${this._data.nutrients[2].unit}</h2>
            </div>

            <div class="recipe__nutrients__protein">
                <img src="https://cdn0.iconfinder.com/data/icons/sport-set-healthy-lifestyle-linear-outline/300/23944777Untitled-3-512.png" alt="">
                <span>protein</span>
                <h2>${this._data.nutrients[3].amount.toFixed(1)} ${this._data.nutrients[3].unit}</h2>
            </div>


            <div class="recipe__nutrients__fiber">
                <img src="https://cdn0.iconfinder.com/data/icons/seafood-product-packaging/64/Source_of_Fibers-512.png" alt="">
                <span>fiber</span>
                <h2>${this._data.nutrients[4].amount.toFixed(1)} ${this._data.nutrients[4].unit}</h2>
            </div>
        </div>


        <div class="recipe__ingredients">
            <h2 class="heading">ingredients</h2>
            <ul class="ingredients">
            ${this._data.ingredients.map(this._generateIngredientMarkup).join('')}
            </ul>
        </div>


        <div class="bottom__buttons">
        <button class="shopping__btn">add to shopping list</button>
        <a href="${this._data.sourceUrl}" target="_blank">directions</a>
        </div>`;
    }

    _generateIngredientMarkup(ing){
        return `
                <li>
                    <div class="check__icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                    <div class="quantity">${new Fraction(ing.quantity).toString()}</div>
                    <div class="unit">${ing.unit}</div>
                    <div class="description">${ing.description}</div>
                </li>
        `;
    }

}

export default new RecipeView();


//<i class="fa fa-bookmark" aria-hidden="true"></i>