document.addEventListener('DOMContentLoaded', () => {
    const liveUpdatesDiv = document.getElementById('live-updates');
    const fetchButton = document.getElementById('fetch-updates');

    if (liveUpdatesDiv && fetchButton) {
        fetchButton.addEventListener('click', () => {
            /*shows laoding message*/
            liveUpdatesDiv.textContent = 'Fetching component status...';

            /*gets information from puhblic Instatus API*/
            fetch('https://api.instatus.com/v1/pages/campus-life-super-app/components')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const components = data.components;

                    /*message for no components*/
                    if (components.length === 0) {
                        liveUpdatesDiv.textContent = 'no components';
                        return;
                    }

                    /*clears content*/
                    liveUpdatesDiv.innerHTML = '';

                    /*loop for components info*/
                    components.forEach(component => {
                        const componentDiv = document.createElement('div');
                        componentDiv.style.border = '1px solid #ccc';
                        componentDiv.style.padding = '10px';
                        componentDiv.style.marginBottom = '10px';

                        const name = document.createElement('h4');
                        name.textContent = component.name;
                        componentDiv.appendChild(name);

                        const status = document.createElement('p');
                        status.innerHTML = `<strong>Status:</strong> ${component.status}`;
                        componentDiv.appendChild(status);

                        liveUpdatesDiv.appendChild(componentDiv);
                    });
                })
                .catch(error => {
                    /*error message*/
                    liveUpdatesDiv.textContent = 'Error getting status';
                    console.error('Fetch error:', error.message);
                });
        });
    }
});
