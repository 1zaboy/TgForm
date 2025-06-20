document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.expand(); // Expand to full height
    
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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button to prevent double submission
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        try {
            // Get all checked items
            const checkedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.name);
            
            // Create the result string
            const result = checkedItems.join(',');

            alert('Start');
            
            // Send data back to Telegram
            await tg.sendData(result);
alert(result);
            
            // Close the WebApp after successful data sending
            await tg.close();
        } catch (error) {
            console.error('Error sending data to Telegram:', error);
            alert('Ошибка отправки данных. Пожалуйста, попробуйте еще раз.');
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Подтвердить';
        }
    });
}); 
