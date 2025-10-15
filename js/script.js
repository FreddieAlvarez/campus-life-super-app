document.addEventListener('DOMContentLoaded', () => {
    const liveUpdatesDiv = document.getElementById('live-updates');
    const fetchButton = document.getElementById('fetch-updates');

    if (liveUpdatesDiv && fetchButton) {
        fetchButton.addEventListener('click', () => {
            liveUpdatesDiv.textContent = 'Fetching component status...';

            fetch('https://api.instatus.com/v1/pages/campus-life-super-app/components')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const components = data.components;
                    if (components.length === 0) {
                        liveUpdatesDiv.textContent = 'No components available.';
                        return;
                    }

                    liveUpdatesDiv.innerHTML = '';
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
                    liveUpdatesDiv.textContent = 'Error getting component status.';
                    console.error('Fetch error:', error.message);
                });
        });
    }
});
