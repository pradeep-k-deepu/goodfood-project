import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    
    _generateMarkup(){
        let numPages = Math.trunc(this._data.results.length / this._data.resPerPage) >= 1 ? Math.trunc(this._data.results.length / this._data.resPerPage) : 1;
        let curPage = this._data.page;

        //page 1 and there are other pages
        if(curPage === 1 && numPages > 1){
            return `
                <div class="remaining__pages">${curPage} of ${numPages}</div>
                <div class="button__next page__buttons" data-page="${curPage + 1}">
                    <button>page ${curPage + 1}<i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                </div>`;
        }

        //last page
        if(curPage === numPages && numPages > 1){
            return `
            <div class="button__prev page__buttons" data-page="${curPage - 1}"> 
                <button><i class="fa fa-arrow-left" aria-hidden="true"></i> page ${curPage - 1}</button>
            </div>
            <div class="remaining__pages">${curPage} of ${numPages}</div>
            `;
        }
        
        //page 1 and there are no other pages
        if(curPage === numPages){
            return `<div class="remaining__pages">${curPage} of ${numPages}</div>`;
        }

        //other pages
        return `
        <div class="button__prev page__buttons" data-page="${curPage - 1}"> 
            <button><i class="fa fa-arrow-left" aria-hidden="true"></i> page ${curPage - 1}</button>
        </div>
        <div class="remaining__pages">${curPage} of ${numPages}</div>
        <div class="button__next page__buttons" data-page="${curPage + 1}">
            <button>page ${curPage + 1}<i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>`;
    }

    addHandlerPagination(handler){
     this._parentElement.addEventListener('click',function(e){
       let btn = e.target.closest('.page__buttons');
       if(!btn) return;
      handler(+btn.dataset.page);
     })   
    }
}

export default new PaginationView();