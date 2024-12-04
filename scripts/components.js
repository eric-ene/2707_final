function baseComponent(id, className) {
    const element = document.createElement('div');
    element.id = id;
    element.className = className;
    
    return element;
}

// reinventing a crappy version of react components
export function imageEntry(id, book) {
    const element = baseComponent(`book-${id}`, `book-entry`);
    let basePrice = 0;
    let price = 0;
    
    element.innerHTML = `
        <img src="../${book.img}" alt="Image of ${book.title}">
        <p>${book.title}</p>
        
        <div class="book-options">
            <select name="Cover" class="book-selection">
                <option value="paper">Paperback</option>
                <option value="hard">Hardcover</option>
            </select>
            
            <input name="toggle-${id}" type="checkbox" class="book-protector-toggle">
            <label for="toggle-${id}">Cover Protector</label>
            
        </div>
        
        <p class="price">$${price.toFixed(2)}</p>
    `;
    
    const selectElem = element.querySelector(`.book-selection`);
    const toggleElem = element.querySelector(`.book-protector-toggle`);
    const priceElem = element.querySelector(`.price`);
    
    function update() {
        priceElem.innerText = `$${price.toFixed(2)}`
    }
    
    // really descriptive function names, i know
    function select() {
        if (selectElem.value === "hard") { // hardcover selected
            price = book.hardPrice;
        } else { // paperback selected
            price = book.softPrice;
        }
        
        basePrice = price;
        toggle();
        update()
    }
    
    function toggle() {
        if (toggleElem.checked) {
            price = basePrice + 5; 
        } else {
            price = basePrice;
        }

        update()
    }
    
    selectElem.addEventListener('change', select);
    toggleElem.addEventListener('change', toggle);
    select();
    toggle();
    
    return element;
}

export function weatherInfo(temp, feelsLike, weather, imgUrl) {
    const element = baseComponent('weather-info', 'weather-info');
    
    element.innerHTML = `
        <img src="${imgUrl}" alt="Weather icon for Eric's Book Store">
        <p id="temp">${temp.toFixed(0)}°</p>
        <p id="weather">${weather}</p>
        <p id="feels-like">Feels like ${feelsLike.toFixed(0)}°</p>
    `
    
    return element;
}

export function dateInfo(text) {
    const element = baseComponent('date-info', 'date-info');
    
    element.innerHTML = `
        <p>${text}</p>
    `
    
    return element;
}