document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthDisplay = document.querySelector('.calendar-header h2');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 
                   'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

    // Initialize with current month
    let currentDate = new Date();
    currentDate.setDate(1); // Set to first of the month

    // Event dates (for now, just February 28, 2025)
    const eventDates = ['2025-02-28'];

    function isEventDay(year, month, day) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return eventDates.includes(date);
    }

    function renderCalendar() {
        calendarGrid.innerHTML = '';

        // Add weekday headers
        weekdays.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day-header';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        // Add empty days from previous month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            emptyDay.setAttribute('aria-hidden', 'true');
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            
            // Check if this day has an event
            if (isEventDay(currentDate.getFullYear(), currentDate.getMonth(), day)) {
                dayEl.classList.add('has-event');
            }
            
            calendarGrid.appendChild(dayEl);
        }

        // Add empty days for next month if needed
        const totalDays = firstDay.getDay() + lastDay.getDate();
        const remainingDays = 42 - totalDays; // 6 rows × 7 days = 42
        for (let i = 0; i < remainingDays; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            emptyDay.setAttribute('aria-hidden', 'true');
            calendarGrid.appendChild(emptyDay);
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