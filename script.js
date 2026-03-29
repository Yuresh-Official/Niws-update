const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">පුවත් පරීක්ෂා කරමින් පවතී...</div>';

    try {
        const response = await fetch(`${baseUrl}${type}?apikey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("API Data:", data); // මෙය පරීක්ෂා කිරීමට (Inspect -> Console)

        // දත්ත ඇති තැන සොයා ගැනීම (Dynamic handling)
        let articles = [];
        if (data.result) {
            articles = data.result;
        } else if (data.news) {
            articles = data.news;
        } else if (Array.isArray(data)) {
            articles = data;
        } else if (data.data) {
            articles = data.data;
        }

        if (!articles || articles.length === 0) {
            container.innerHTML = '<p>දැනට පුවත් කිසිවක් වාර්තා වී නොමැත.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            tickerText += ` • ${article.title || 'Breaking News'} `;
            
            const newsImg = article.image || article.img || article.thumb || 'https://via.placeholder.com/400x250?text=News+Hub';
            const newsTitle = article.title || "මාතෘකාවක් නොමැත";
            const newsDesc = article.description || article.desc || "";
            const newsUrl = article.url || "#";

            const card = `
                <div class="news-card">
                    <img src="${newsImg}" alt="news" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                    <div class="news-content">
                        <h3>${newsTitle}</h3>
                        <p>${newsDesc}</p>
                        <a href="${newsUrl}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p>සම්බන්ධතාවයේ දෝෂයකි. කරුණාකර නැවත උත්සාහ කරන්න.</p>';
        console.error("Fetch error details:", error);
    }
}

// මුලින්ම 'all' news පෙන්වන්න
window.onload = () => fetchNews('all');
