document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('schedule-form');
  const scheduleList = document.getElementById('schedule-list');
  const noSchedulesMessage = document.getElementById('no-schedules-message');
  const scheduleCount = document.getElementById('schedule-count');
  const addServiceBtn = document.getElementById('add-service-btn');
  const servicesContainer = document.getElementById('services-container');
  const clearBtn = document.getElementById('clear-form-btn');

  // Criar calendário na parte de baixo
  const calendarContainer = document.createElement('div');
  calendarContainer.id = 'calendar';
  calendarContainer.style.marginTop = '40px';
  document.querySelector('.schedule-list-section').appendChild(calendarContainer);

  let serviceId = 0;
  let schedules = [];

  const calendar = new FullCalendar.Calendar(calendarContainer, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: []
  });
  calendar.render();

  const updateScheduleList = () => {
    scheduleList.innerHTML = '';
    if (schedules.length === 0) {
      noSchedulesMessage.style.display = 'block';
      scheduleCount.textContent = '';
      return;
    }
    noSchedulesMessage.style.display = 'none';
    scheduleCount.textContent = `${schedules.length} agendamento(s)`;

    schedules.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="schedule-header">
          <div class="schedule-client">
            <h4>${item.clientName}</h4>
            <p>${item.clientPhone}</p>
            <p>${item.clientAddress}</p>
          </div>
          <div class="schedule-datetime">
            <p><strong>${item.date}</strong></p>
            <p>${item.time}</p>
          </div>
        </div>
      `;
      scheduleList.appendChild(li);
    });
  };

  const clearForm = () => {
    form.reset();
    servicesContainer.innerHTML = '';
    serviceId = 0;
  };

  const addService = () => {
    serviceId++;
    const div = document.createElement('div');
    div.classList.add('service-item');
    div.innerHTML = `
      <p class="service-number">Serviço ${serviceId}</p>
      <div class="form-group">
        <label>Tipo de Móvel:</label>
        <select required>
          <option value="">Selecione</option>
          <option>Guarda-roupa</option>
          <option>Cama</option>
          <option>Armário</option>
          <option>Estante</option>
          <option>Outro</option>
        </select>
      </div>
    `;
    servicesContainer.appendChild(div);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientName = document.getElementById('client-name').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientAddress = document.getElementById('client-address').value;
    const date = document.getElementById('schedule-date').value;
    const time = document.getElementById('schedule-time').value;

    schedules.push({ clientName, clientPhone, clientAddress, date, time });

    calendar.addEvent({
      title: `${clientName} (${clientPhone})`,
      start: `${date}T${time}`,
      allDay: false
    });

    updateScheduleList();
    clearForm();
  });

  clearBtn.addEventListener('click', clearForm);
  addServiceBtn.addEventListener('click', addService);
});
