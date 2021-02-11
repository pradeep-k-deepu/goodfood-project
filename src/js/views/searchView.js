class SearchView {
    _parentElement = document.querySelector('.input__form');
    _selectForm = document.querySelector('.select__form');
    _cuisine = document.querySelector('.select__cuisine');
    _diet = document.querySelector('.select__diet');
   
    

    
    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            handler(this.querySelector('.query__input').value);
            this.querySelector('.query__input').value = '';
        });

        this._selectForm.addEventListener('submit',function(e){
            e.preventDefault();
            handler({
                cuisine: this.querySelector('.select__cuisine').value === 'search by cuisine' ? undefined : this.querySelector('.select__cuisine').value,
                diet: this.querySelector('.select__diet').value === 'search by diet' ? undefined : this.querySelector('.select__diet').value,
            });
            this.querySelector('.select__cuisine').value = 'search by cuisine';
            this.querySelector('.select__diet').value = 'search by diet';
        })

    }

    

    // getQuery(){
    //    let query = this._parentElement.querySelector('input').value;
    //    this._parentElement.querySelector('input').value = '';
    //    return query;
    // }

}

export default new SearchView();