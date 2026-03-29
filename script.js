const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";
// CORS ප්‍රශ්නය විසඳන්න proxy එකක් එකතු කළා
const proxyUrl = "https://corsproxy.io/?"; 

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">පුවත් ලැබෙමින් පවතී...</div>';

    // සම්පූර්ණ URL එක හදනවා
    const finalUrl = `${proxyUrl}${encodeURIComponent(baseUrl + type + '?apikey=' + apiKey)}`;

    try {
        const response = await fetch(finalUrl);
        const data = await response.json();
        
        // API response එක අනුව දත්ත ලබා ගැනීම
        const articles = data.result || data; 

        if (!Array.isArray(articles)) {
            container.innerHTML = '<p>දත්ත ලැබීමේ දෝෂයක්! කරුණාකර පසුව උත්සාහ කරන්න.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            tickerText += ` • ${article.title} `;
            
            const card = `
                <div class="news-card">
                    <img src="${article.image || 'https://via.placeholder.com/400x250?text=News+Image'}" alt="news">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.desc || article.description || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p>දත්ත ලබා ගැනීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.</p>';
        console.error("Fetch error:", error);
    }
}

window.onload = () => fetchNews('all');
