import $ from 'jquery';
import './index.css';

'use strict';

const searchURL = `https://api.github.com/users/`


function formatQueryParams(params) {
  return `${params.q}/repos`
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson,'here');
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results

  let userinfo = `
  <h4>User: <span class="user">${responseJson[0].owner.login}</span></h4>
  <h4><span class="user">Total repos: ${responseJson.length}</span></h4>
  <ul class="results-list"></ul>
`
$('#results-list').append(userinfo)
  for (let i = 0; i < responseJson.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<div class="result-item"><li><h4>${responseJson[i].name}</h4>
      <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      <p>${responseJson[i].description}</p>
      </li></div>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log('res ok')
        return response.json();
      }
      console.log('throwing error')
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);