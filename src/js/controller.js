import * as model from './model.js'
import recipeView from './views/recipe-view.js'
import searchView from './views/search.view.js'
import resultsWiev from './views/resultsWiev.js'
import paginationvView from './views/paginationvView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'

import 'core-js/stable'
import "regenerator-runtime"
import { async } from 'regenerator-runtime'
import { MODEL_CLOSE_SEC } from './config.js'

// if(module.hot){
//   module.hot.accept()
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


//loading recipe
const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()
    // update results view to martk selected search results
    resultsWiev.update(model.GetSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    //loading recipe
    await model.loadRecipe(id)

    //rendering recipe 
    recipeView.render(model.state.recipe)
  
  }catch(err){
    recipeView.renderError()
    console.log(err)
  }
}
// ['hashchange' , 'load'].forEach(el => window.addEventListener(el , controlRecipe ))

const controlSearchResults = async function(){
  try {
    resultsWiev.renderSpinner()
    
    const query = searchView.getQuery()
    if (!query) return
    await model.loadSearchResults(query)
    // resultsWiev.render(model.state.search.results)
    resultsWiev.render(model.GetSearchResultsPage())
    //render pagination buttons
    paginationvView.render(model.state.search)
  } catch (error) {
    console.log(error)
  }
}

const controlPagination = function(gotoPage){
    //render new results
      resultsWiev.render(model.GetSearchResultsPage(gotoPage))
      //render new pagination buttons
      paginationvView.render(model.state.search)
}

const controlServing = function(newServings){
  //update recipe servings in state 
  model.updateServings(newServings)
  //update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}



const controlAddBookmark = function(){
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
 
  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const console = function(){
  console.log('hello world')
}

const controlAddRecipe = async function(newRecipe){
  try {
    // show loading spinner
    addRecipeView.renderSpinner()
    //upload new recipe
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    //render the recipe
    recipeView.render(model.state.recipe)
    //success message
    addRecipeView.renderMassege()

    //render bookmark View
    bookmarksView.render(model.state.bookmarks)

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODEL_CLOSE_SEC * 1000)
  } catch (error) {
    console.error(error)
    addRecipeView.renderError(error.message)
  }
  // console.log(newRecipe)
}

const init = function(){
  bookmarksView.addhandlerRender(controlBookmarks)
  recipeView.addhandlerRender(controlRecipe) 
  recipeView.addHandlerUpdateServings(controlServing)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addhandlersearchmethod(controlSearchResults)
  paginationvView.addhanlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  console()
}
init()