import View from "./View";

class ShoppinglistView extends View {
    _parentElement = document.querySelector('.shopping__list__labels');
    _shopButton = document.querySelector('.shopping__btn');
    _clearButton = document.querySelector('.deleteItems');

    constructor(){
        super();
       this._clearButton.addEventListener('click',function(){
        this.parentElement.querySelector('.shopping__list__labels').innerHTML = '';
       })
    }
  

    _generateMarkup(){
     return   this._data.map(this._generateItemMarkup).join();
    }


    _generateItemMarkup(ing){
        return `
        <div class="shopping__list__label"> 
            <input type="number" class="shopping__quantity" value="${ing.quantity}">
            <div class="shopping__unit">${ing.unit}</div>
            <div class="shopping__description">${ing.description}</div>
        </div>`;
    }

}


export default new ShoppinglistView();



