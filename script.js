const page = document.getElementsByClassName("page")[0];
const input = document.getElementById("input");
const search = document.getElementsByClassName("search")[0];
const clearHtml = document.getElementsByClassName("search")[1];
const item = document.getElementsByClassName("item-container")[0];
const searchResultsCount = document.getElementsByClassName("results-number")[0];
const loading = document.getElementsByClassName("loading")[0];
let pageNumber = document.getElementsByClassName("pageNumber")[0];

const paginationDecrimentButton = document.getElementsByClassName(
  "pagination-btn"
)[0];
const paginationIncrimentButton = document.getElementsByClassName(
  "pagination-btn"
)[1];
let foundedItemsCount = [];

// Fetches the data and collects in one document
const searchByInput = (value, pageNumber) => {
  item.innerHTML = '';
  loading.innerHTML = `<img src='gif1.gif' alt='Loading...' class='loading-gif' />`;
  fetch(`https://openlibrary.org/search.json?q=${value}&page=${pageNumber}`)
    .then(response => {
      console.log(response);
      console.log(typeof response);
      return response.json();
    })
    .then(json => {
      console.log(json);
      foundedItemsCount = json.numFound;
      searchResultsCount.innerHTML = `<span class="colored-span">Search results</span> ${json.numFound}`;
      return json.docs;
    })
    .then(docs => {
      console.log(docs);
      return docs;
    })
    .then(docs => {
      docs.forEach(element => {
        loading.innerHTML = "";
        item.innerHTML += `<div class="item" key=${element.key}>    
                                 <h2><span>Title :</span> ${element.title}</h2>
                                 <p><span>Author :</span> ${
                                   element.author_name
                                 }</p>
                                 <p><span>Published in :</span> ${
                                   element.first_publish_year
                                 }</p>
                                 <p><span>Edition count : </span>${
                                   element.edition_count
                                 }</p>
                                 <p> ${
                                   element.contributor
                                     ? "<span>Contributors :</span>" +
                                       element.contributor[0]
                                     : "<span>Contributors :</span> No"
                                 }</p>
                               </div>`;
      });
    });
};

// Search buttons event listener it calls search by input value and page number
search.addEventListener("click", () => {
  pageNumber.innerHTML='1';
  let inputStrind = input.value;
  let replaced = inputStrind.replace(/' '/g, "+");
  let searchingPageNumber = pageNumber.innerHTML;
  console.log(pageNumber.innerHTML);
  console.log(replaced);
  searchByInput(input.value, searchingPageNumber);
});


// ClearHtml clears all html COUNT , ITEMS , Value 
clearHtml.addEventListener("click", () => {
  searchResultsCount.innerHTML = "";
  item.innerHTML = "";
  input.value = "";
  pageNumber.innerHTML='1';
});

// Decreases pages number by 1 and calls search by input value and page number
paginationDecrimentButton.addEventListener("click", () => {
  if (pageNumber.innerHTML > 1) {
    let newNumber = Number(pageNumber.innerHTML) - 1;
    pageNumber.innerHTML = newNumber;
    let inputStrind = input.value;
    let replaced = inputStrind.replace(/' '/g, "+");
    let searchingPageNumber = pageNumber.innerHTML;
    console.log(replaced);
    searchByInput(input.value, searchingPageNumber);
  }
});
// Increases pages number by 1 and calls search by input value and page number
paginationIncrimentButton.addEventListener("click", () => {
  if (pageNumber.innerHTML < Math.ceil(foundedItemsCount / 100)) {
    let newNumber = Number(pageNumber.innerHTML) + 1;
    pageNumber.innerHTML = newNumber;
    let inputStrind = input.value;
    let replaced = inputStrind.replace(/' '/g, "+");
    let searchingPageNumber = pageNumber.innerHTML;
    console.log(replaced);
    searchByInput(input.value, searchingPageNumber);
  }
});
