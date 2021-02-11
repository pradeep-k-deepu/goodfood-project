
import View from './View.js';

class MealsView extends View {
    _parentElement = document.querySelector('.meal__planner__container');
    _mealOpenButton = document.querySelector('.generate__meal');
    _formCloseButton = document.querySelector('#close__button');
    _form = document.querySelector('.meal__plan__container');
    _overlay = document.querySelector('.overlay');

    _timeFrame = document.querySelector('.select');
    _calories = document.querySelector('.input__calories');
    _diet = document.querySelector('.diet__select');
  

    constructor(){
        super();
        this._mealOpenButton.addEventListener('click',this._meal.bind(this,'visible'));
        this._formCloseButton.addEventListener('click',this._meal.bind(this,'hidden'));
        this._overlay.addEventListener('click',this._meal.bind(this,'hidden'));
        window.addEventListener('keydown',this._key.bind(this));

    }

    addHandlerMeal(handler){
        this._form.addEventListener('submit',function(e){
            e.preventDefault();
            let dataArr = [...new FormData(document.querySelector('.form'))];
            let data = Object.fromEntries(dataArr);
            document.querySelector('.select').value= 'select timeFrame';
            document.querySelector('.input__calories').value= '';
            document.querySelector('.diet__select').value= 'select diet';
            handler({
                timeFrame: data.timeFrame ? data.timeFrame : undefined,
                diet: data.diet,
                calories: data.calories ? +data.calories : undefined,
            });
        });
    }


    hide(){
       document.querySelector('.recipe__container').style.zIndex = -1;
       this._parentElement.style.zIndex = 1;
    }

    _generateMarkup(){
        if(this._data.timeFrame === 'day'){
            return  `
            <div class="day">
                <div class="slogan animate__animated animate__pulse animate__infinite	infinite">have it</div>
                <div class="day__container">
                        ${this._data.meals.map(this._generateCardMarkup).join('')}
                </div>
            </div>
    
            <div class="day__nutrients">
                    <div class="day__calories">
                        <img src="https://image.flaticon.com/icons/png/512/1912/1912723.png" alt=""><span>calories</span>
                        <p>${this._data.nutrients.calories} kcal</p>
                    </div>
                    <div class="day__carbs">
                        <img src="https://icon-library.com/images/carbs-icon/carbs-icon-13.jpg" alt=""><span>carbs</span>
                        <p>${this._data.nutrients.carbohydrates} g</p>
                    </div>
                    <div class="day__fat">
                        <img src="https://image.flaticon.com/icons/png/512/1951/1951542.png" alt=""><span>fat</span>
                        <p>${this._data.nutrients.fat} g</p>
                    </div>
                    <div class="day__protein">
                        <img src="https://cdn0.iconfinder.com/data/icons/sport-set-healthy-lifestyle-linear-outline/300/23944777Untitled-3-512.png" alt=""><span>protein</span>
                        <p>${this._data.nutrients.protein} g</p>
                    </div>
            </div>`;
     }

     else{
         return `<div>
         <div class="slogan animate__animated animate__pulse animate__infinite	infinite">have it</div>
         ${this._data.map(this._generateWeekdayMeal.bind(this)).join('')}
         </div>`;

     }
      
    }

    _generateCardMarkup(data){
     
        return `<div class="card">
            <div class="card__type">${data.type}</div>
            <img src="${data.image}" class="card__image" alt=""/>
            <div class="card__title">${data.title}</div>
            <div class="card__recipe__details">
                <div class="card__time">
                    <i class="fa fa-clock-o" aria-hidden="true"></i><span>cooking time</span>
                    <p>${data.cookingTime} min</p>
                </div>

                <div class="card__servings">
                    <i class="fa fa-users" aria-hidden="true"></i><span>servings</span>
                    <p>${data.servings} servings</p>
                </div>
            </div>
            <a href="${data.sourceUrl}" target="_blank">directions <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
    </div>`;
    }

    _generateWeekdayMeal(data){
       
       return `<div class="weekday">

        <div class="weekday__name">${data.day}</div>

        <div class="day__container">
        ${data.meals.map(this._generateCardMarkup).join('')}
        </div>   

        <div class="day__nutrients">
            <div class="day__calories">
                <img src="https://image.flaticon.com/icons/png/512/1912/1912723.png" alt=""><span>calories</span>
                <p>${data.nutrients.calories} kcal</p>
            </div>
            <div class="day__carbs">
                <img src="https://icon-library.com/images/carbs-icon/carbs-icon-13.jpg" alt=""><span>carbs</span>
                  <p>${data.nutrients.carbohydrates} g</p>
            </div>
            <div class="day__fat">
                <img src="https://image.flaticon.com/icons/png/512/1951/1951542.png" alt=""><span>fat</span>
                  <p>${data.nutrients.fat} g</p>
            </div>
            <div class="day__protein">
                <img src="https://cdn0.iconfinder.com/data/icons/sport-set-healthy-lifestyle-linear-outline/300/23944777Untitled-3-512.png" alt=""><span>protein</span>
                  <p>${data.nutrients.protein} g</p>
            </div>
        </div>
    </div>`;
    }

    _key(e){
        if(e.key === 'Escape'){
           this._meal('hidden');
        }
    }

    _meal(value){
    this._overlay.style.visibility = value;
    this._form.style.visibility = value;
    }
}

export default new MealsView();