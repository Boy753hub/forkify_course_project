import View from "./view";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView";

class bookmarksView extends View {
    _perentElement = document.querySelector('.bookmarks__list')
    _errorMassage = 'no bookmarks yet find right recipe and bookmark it :")'
    _message = ''

    addhandlerRender(handlerr){
        window.addEventListener('load', handlerr)
    }

    _generateMarkup(){     
        return this._data.map(result => previewView.render(result, false)).join('')
    }
      

    
}

export default new bookmarksView()