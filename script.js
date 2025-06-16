document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const items = urlParams.get('items')?.split(',') || [];
    
    // Get the container for checkboxes
    const container = document.getElementById('checkboxes-container');
    
    // Create checkboxes for each item
    items.forEach((item, index) => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item-${index}`;
        checkbox.name = item;
        
        const label = document.createElement('label');
        label.htmlFor = `item-${index}`;
        label.textContent = item;
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        container.appendChild(checkboxItem);
    });
    
    // Handle form submission
    const form = document.getElementById('telegramForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get all checked items
        const checkedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.name);
        
        // Create the result string
        const result = checkedItems.join(',');
        
        // Send data back to Telegram
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.sendData(result);
        } else {
            // For testing purposes, show the result in console
            console.log('Selected items:', result);
            alert('Selected items: ' + result);
        }
    });
}); 