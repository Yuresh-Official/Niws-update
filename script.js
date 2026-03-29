const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">News Load wenawa...</div>';

    try {
        const response = await fetch(`${baseUrl}${type}?apikey=${apiKey}`);
        const data = await response.json();
        
        // News array eka ganna (API response eka anuwa meka wenas wenna puluwan)
        const articles = data.result || data; 

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            tickerText += ` | ${article.title} `;
            
            const card = `
                <div class="news-card">
                    <img src="${article.image || 'https://via.placeholder.com/300'}" alt="news">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.description || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p>News load kirime doshayak!</p>';
        console.error(error);
    }
}

// Site eka load weddi 'All News' pennanna
window.onload = () => fetchNews('all');
