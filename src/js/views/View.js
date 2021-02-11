export default class View {
    _data;

    _render(data){
        if(!data || (Array.isArray(data) && data.length === 0)) return this._renderErrorMessage();
        this._data = data;
        let markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    _clear(){
        this._parentElement.innerHTML = "";
    }

    _renderLoader(){
        let html = `<div class="loader">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                    </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',html);
    }


    _renderErrorMessage(message = this._errorMsg){
        let markup = `
         <div class="errorMessage">
            <p>${message}<i class="fa fa-frown-o" aria-hidden="true"></i></p>
         </div>`;

        this._clear();
         this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
}

