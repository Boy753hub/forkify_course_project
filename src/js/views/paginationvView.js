import View from "./view";
import icons from 'url:../../img/icons.svg'

class paginationView extends View {
    _perentElement = document.querySelector('.pagination')

    addhanlerClick(handler){
        this._perentElement.addEventListener('click' , function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return
            const gotoPage = +btn.dataset.goto
            handler(gotoPage)

        })
    }
    
    _generateMarkup(){
        const curpage = this._data.page
        const _prevButton = ` <button  data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev"><svg class="search__icon"><use href="${icons}#icon-arrow-left"></use></svg><span>${curpage - 1}</span></button>      `
        const _nextButton = `<button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next"><span>${curpage + 1}</span><svg class="search__icon"><use href="${icons}#icon-arrow-right"></use></svg></button>`
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        //page 1 and there ar more
        if(this._data.page === 1 && numPages > 1){
            return _nextButton
        }
        //last page
        if(this._data.page === numPages && numPages > 1){
            return _prevButton
        }
        // other page
        if(this._data.page < numPages){
            return _nextButton + _prevButton
        }
        //page 1 and there are no other pages
        return ''
    }
}

export default new paginationView()