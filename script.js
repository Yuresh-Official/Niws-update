const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">පුවත් ලැබෙමින් පවතී...</div>';

    try {
        const response = await fetch(`${baseUrl}${type}?apikey=${apiKey}`);
        const data = await response.json();
        
        // API එකෙන් දත්ත ලැබෙන විවිධ ආකාර චෙක් කිරීම
        let articles = [];
        if (Array.isArray(data)) {
            articles = data;
        } else if (data.result && Array.isArray(data.result)) {
            articles = data.result;
        } else if (data.news && Array.isArray(data.news)) {
            articles = data.news;
        }

        if (articles.length === 0) {
            container.innerHTML = '<p>දැනට පුවත් කිසිවක් නොමැත.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            // නිව්ස් ටිකර් එක සඳහා
            tickerText += ` • ${article.title || 'Breaking News'} `;
            
            // නිව්ස් පින්තූරය
            const newsImg = article.image || article.img || article.thumb || 'https://via.placeholder.com/400x250?text=No+Image';

            const card = `
                <div class="news-card">
                    <img src="${newsImg}" alt="news">
                    <div class="news-content">
                        <h3>${article.title || 'No Title'}</h3>
                        <p>${article.description || article.desc || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p>දත්ත ලැබීමේ දෝෂයක්. කරුණාකර API එක පරීක්ෂා කරන්න.</p>';
        console.error("Fetch Error:", error);
    }
}

window.onload = () => fetchNews('all');
