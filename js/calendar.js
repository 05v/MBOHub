document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthDisplay = document.querySelector('.calendar-header h2');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 
                   'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

    let currentDate = new Date(2025, 0, 1);

    function renderCalendar() {
        calendarGrid.innerHTML = '';

        weekdays.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day-header';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        }

        monthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    const filterOptions = document.querySelectorAll('.filter-option input');
    const eventCards = document.querySelectorAll('.event-card');

    function filterEvents() {
        const activeFilters = Array.from(filterOptions)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.parentElement.textContent.trim().toLowerCase());

        eventCards.forEach(card => {
            const eventType = card.querySelector('.event-tag').textContent.toLowerCase();
            if (activeFilters.includes(eventType)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterOptions.forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    renderCalendar();
}); 