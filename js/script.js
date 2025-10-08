document.addEventListener('DOMContentLoaded', () => {
    /* buttons on the page selected */
    const attendButtons = document.querySelectorAll('.attend-btn');

    /* event for buttons clicked */
    attendButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert ('Good Choice!');
        });
    });

    /* Live Campus Updates */
    const liveUpdatesDiv = document.getElementById('live-updates');
    const API_KEY = "My api key"; /* gotta replace this */
    const PAGE_ID = "My page id when i get one"; /*gotta replace this too */

    if (liveUpdatesDiv) {
        console.log('API integration spot.');
    
        const fetchButton = document.getElementById('fetch-updates');
        if(fetchButton) {
            fetchButton.addEventListener('click', () => {
                liveUpdatesDiv.textContent = 'Fetching Updates ... (placeholder spot for API)';

                fetch(`https://api.instatus.com/pages/${PAGE_ID}/status`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type' : 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    liveUpdatesDiv.textContent = JSON.stringify(data, null, 2);
                })
                .catch(error => {
                    liveUpdatesDiv.textContent = 'Error getting update';
                    console.error(error);
                });
            });
        }
    }
});
