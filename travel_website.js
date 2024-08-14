const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear')

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_website_api.json') 
        .then(response => response.json())
        .then(data => {
            let found = false;

            // Search in countries -> cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(input)) {
                        resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                        resultDiv.innerHTML += `<h2>${city.name}</h2>`;
                        resultDiv.innerHTML += `<p>${city.description}</p>`;
                        found = true;
                    }
                });
            });

            // Search in temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(input)) {
                    resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}">`;
                    resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
                    resultDiv.innerHTML += `<p>${temple.description}</p>`;
                    found = true;
                }
            });

            // Search in beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(input)) {
                    resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}">`;
                    resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
                    resultDiv.innerHTML += `<p>${beach.description}</p>`;
                    found = true;
                }
            });

            // If no results found
            if (!found) {
                resultDiv.innerHTML = 'Destination not found.';
            }
        })

        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
    
}

function clearSearch() {
    const inputField = document.getElementById('destinationInput');
    inputField.value = '';

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

    btnSearch.addEventListener('click', searchDestination);
    btnClear.addEventListener('click', clearSearch);