const itemsPerPage = 10;
let currentPos = 0;
let totalSize = 0;
const header = document.getElementById('header');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const currentPageDetails = document.getElementById('currentPageDetails');

////let innerHTML = ' <tr> <th scope="row">One</th> <td >One</td> <td >One</td> </tr>';
let innerHTML = '';

////console.log(innerHTML);

fetch("websites.json")
  .then(response => response.json())
  .then(json => {
    
    totalSize = json.length;
    currentPos = localStorage.getItem('currentPos');

    previous.hidden = currentPos <= 0;
    next.hidden = currentPos+itemsPerPage >= totalSize;
    let range = (totalSize / itemsPerPage);
    console.log(range);
    link2.hidden = totalSize < itemsPerPage+1;
    link3.hidden = totalSize < (itemsPerPage*2)+1;
    console.log("next.hidden " + next.hidden);
    let endPos = Math.min(json.length, currentPos + itemsPerPage);
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
    localStorage.setItem('currentPos', currentPos);
    let value = (currentPos / itemsPerPage)+1;
    let totalPages = Math.round((totalSize / itemsPerPage));
    console.log(value);
    currentPageDetails.innerHTML = "Page " + Math.floor(value) + " of " + totalPages;

  }).catch(err => {
    console.error(err);
});

// function handleClickPrevious(event) {
//     currentPos = Math.max(0, currentPos-=itemsPerPage);
//     event.preventDefault();
//     ////window.location.reload();
//     ////return false;
// }

// function handleClickNext() {
//     currentPos = Math.max(0, currentPos+=itemsPerPage);
//     localStorage.setItem('currentPos', currentPos);
//     window.location.reload();
//     return false;
// }

function handleClickPage(event, item) {
    if (item < 0)
        currentPos = Math.max(0, currentPos -= itemsPerPage);
    else if (item == 0)
        currentPos = Math.max(0, currentPos += itemsPerPage);
    else
        currentPos = Math.min(totalSize, (itemsPerPage * (item-1)));
    console.log(currentPos);
    localStorage.setItem('currentPos', currentPos);
    window.location.reload();
    return false;
}
  

//var newRow = header.insertRow();

// var newTR = header.createElement("tr");
// newTR.createElement('th scope="col"',"URL");
// newTR.createElement('th scope="col"',"Category");
// newTR.createElement('th scope="col"',"Comment");