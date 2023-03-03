import icons from 'url:../../img/icons.svg'

export default class View {
    _data

    /**
     * render the recived object to the dom
     * @param {Object  | Object[]} data 
     * @param {boolean} [render = true]  if false create a markup string of rendering to the DOM
     * @returns {undefined | string} a markup string is returned if render = false
     * @this {object}} View instance
     * @author jonas but also boy
     * @todo finish implementation
     */

    render(data, render = true){
      if (!data || (Array.isArray (data) && data.length=== 0))
      return this.renderError();

        this._data = data
        const markup = this._generateMarkup()

        if (!render) return markup

        this._clear()
        this._perentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data){

        this._data = data
        const newMarkup = this._generateMarkup()

        const newDom = document.createRange().createContextualFragment(newMarkup)
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const curElements = Array.from(this._perentElement.querySelectorAll('*'))

        newElements.forEach((newEl, i)=>{
          const curEl = curElements[i]
          // console.log(curEl, newEl.isEqualNode(curEl))

          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            curEl.textContent = newEl.textContent
          }
          if(!newEl.isEqualNode(curEl)){
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
          }
        })
    }

    _clear(){
        this._perentElement.innerHTML = ''
    }

    renderSpinner(){
        const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div> 
        `
        this._clear()
        this._perentElement.insertAdjacentHTML('afterbegin' , markup)
      }

      renderError(message = this._errorMassage){
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear()
        this._perentElement.insertAdjacentHTML('afterbegin' , markup)
      }

      
      renderMassege(message = this._message){
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear()
        this._perentElement.insertAdjacentHTML('afterbegin' , markup)
      }

}