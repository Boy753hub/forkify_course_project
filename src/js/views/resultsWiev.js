import View from "./view";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView";

class resultsView extends View {
    _perentElement = document.querySelector('.results')
    _errorMassage = 'no recipes found for your query! please try again :")'
    _message = ''

    _generateMarkup(){     
      return this._data.map(result => previewView.render(result, false)).join('')
  }
    
}

export default new resultsView()