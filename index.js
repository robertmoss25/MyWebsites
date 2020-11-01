const itemsPerPage = 6;
var currentPos = 0;
var totalSize = 0;
const header = document.getElementById('header');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const currentPageDetails = document.getElementById('currentPageDetails');

let innerHTML = '';

loadQuestions();

// fetch("websites.json")
//   .then(response => response.json())
//   .then(json => {
    
//     totalSize = json.length;
//     currentPos = localStorage.getItem('currentPos');

//     previous.hidden = currentPos <= 0;
//     next.hidden = currentPos+itemsPerPage >= totalSize;
//     let range = (totalSize / itemsPerPage);
//     console.log(range);
//     link2.hidden = totalSize < itemsPerPage+1;
//     link3.hidden = totalSize < (itemsPerPage*2)+1;
//     console.log("next.hidden " + next.hidden);
//     let endPos = Math.min(json.length, currentPos + itemsPerPage);
//     for (let i = currentPos; i < endPos; i++) {
//         innerHTML += ' <tr>';
//         innerHTML += '<th scope="row">';
//         innerHTML += json[i].url;
//         innerHTML += '</th>';
//         innerHTML += '<td>';
//         innerHTML += json[i].Category;
//         innerHTML += '</td>';
//         innerHTML += '<td>';
//         innerHTML += json[i].Comment;
//         innerHTML += '</td>';
//         innerHTML += '</tr>';
//         header.innerHTML = innerHTML;
//     }
//     localStorage.setItem('currentPos', currentPos);
//     let value = (currentPos / itemsPerPage)+1;
//     let totalPages = Math.ceil((totalSize / itemsPerPage));
//     console.log(value);
//     currentPageDetails.innerHTML = "Page " + Math.floor(value) + " of " + totalPages;

//   }).catch(err => {
//     console.error(err);
// });

function loadQuestions() {
    innerHTML = '';

    fetch("websites.json")
  .then(response => response.json())
  .then(json => {
    
    totalSize = json.length;
    currentPos = localStorage.getItem('currentPos');

    previous.hidden = currentPos <= 0;
    next.hidden = Number(currentPos)+Number(itemsPerPage) >= totalSize;
    let range = (totalSize / itemsPerPage);
    console.log("totalSize = " + totalSize);
    console.log("itemsPerPage " + itemsPerPage);
    console.log("range " + range);
    console.log("currentPos " + currentPos);
    link2.hidden = totalSize < itemsPerPage+1;
    link3.hidden = totalSize < (itemsPerPage*2)+1;
    console.log("next.hidden " + next.hidden);
    var calcValue = Number(currentPos) + Number(itemsPerPage);
    let endPos = Math.min(totalSize, calcValue);
    console.log("endPos " + endPos + " calcValue " + calcValue);
    for (let i = currentPos; i < endPos; i++) {
        innerHTML += ' <tr>';
        innerHTML += '<th scope="row">';
        innerHTML += json[i].url;
        innerHTML += '</th>';
        innerHTML += '<td>';
        innerHTML += json[i].Category;
        innerHTML += '</td>';
        innerHTML += '<td>';
        innerHTML += json[i].Comment;
        innerHTML += '</td>';
        innerHTML += '</tr>';
        header.innerHTML = innerHTML;
    }
    ////localStorage.setItem('currentPos', currentPos);
    let value = (currentPos / itemsPerPage)+1;
    let totalPages = Math.ceil((totalSize / itemsPerPage));
    console.log(value);
    currentPageDetails.innerHTML = "Page " + Math.floor(value) + " of " + totalPages;

  }).catch(err => {
    console.error(err);
});
}

function handleClickPage(event, item) {
    currentPos = localStorage.getItem('currentPos');
    console.log("Pulled CurrentPos = " + currentPos);
    if (item < 0)
        currentPos = Math.max(0, Number(currentPos) - Number(itemsPerPage));
    else if (item == 0)
        currentPos = Math.min(totalSize, Number(currentPos) + Number(itemsPerPage));
    else
        currentPos = Math.min(totalSize, (Number(itemsPerPage) * (Number(item)-1)));
    console.log("Calculated CurrentPos = " + currentPos);
    localStorage.setItem('currentPos', currentPos);
    ////window.location.reload();
    ////return false;
    loadQuestions();
}

function handleClickBegin(event) {
    currentPos = localStorage.getItem('currentPos');
    currentPos = 0;
    localStorage.setItem('currentPos', currentPos);
    loadQuestions();
}

function handleClickEnd(event) {
    currentPos = localStorage.getItem('currentPos');
    let totalPages = Math.ceil((totalSize / itemsPerPage));
    currentPos = (Number(totalPages)-1) * itemsPerPage;
    localStorage.setItem('currentPos', currentPos);
    loadQuestions();
}
