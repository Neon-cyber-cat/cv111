
/* */ 
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');


const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('personal nombre');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<p>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            //tableHtml += `<td>${data[key]}</td>`;
        }
    }

    //tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
        
    }
}

function loadHTMLTable(data) {
    const nombre = document.querySelector('personal nombre');

    if (data.length === 0) {
        nombre.innerHTML = "<h1>No Data</h1>";
        return;
    }

    let nombreeHtml = "";
/**
 * Aqui van los nombres de la base de datos, en el orden de la tabla 
 */
    data.forEach(function ({id, name, last_name, email, titulo_princ ,birth,adress,telefono,date_added}) {
        nombreeHtml += "<p>";
        nombreeHtml += `<h1>${name}</h1>`
        nombreeHtml += "</p>";
    });

    nombre.innerHTML = tableHtml;
}