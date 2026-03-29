const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";
const proxy = "https://corsproxy.io/?"; // CORS ප්‍රශ්නය විසඳන්න මේක අනිවාර්යයි

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">දත්ත පරීක්ෂා කරමින්...</div>';

    // සම්පූර්ණ URL එක Proxy එක හරහා යවනවා
    const finalUrl = `${proxy}${encodeURIComponent(baseUrl + type + '?apikey=' + apiKey)}`;

    try {
        const response = await fetch(finalUrl);
        const data = await response.json();
        
        // Bot API එකෙන් එන දත්ත structure එක 'result' ඇතුළේ තියෙන්නේ
        const articles = data.result || [];

        if (articles.length === 0) {
            container.innerHTML = '<p>පුවත් කිසිවක් හමු නොවීය.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            tickerText += ` • ${article.title} `;
            
            const card = `
                <div class="news-card">
                    <img src="${article.image || 'https://via.placeholder.com/400x250?text=News'}" alt="news">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.description || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p>සර්වර් එකට සම්බන්ධ වීමට නොහැක. පසුව උත්සාහ කරන්න.</p>';
        console.error("Error:", error);
    }
}

window.onload = () => fetchNews('all');
