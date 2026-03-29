const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader">පුවත් ලැබෙමින් පවතී...</div>';

    try {
        const response = await fetch(`${baseUrl}${type}?apikey=${apiKey}`);
        const data = await response.json();
        
        // API එකෙන් එන දත්ත වල 'result' කියන කොටස ගන්නවා, නැත්නම් සම්පූර්ණ දත්ත ගන්නවා
        const articles = data.result || data; 

        // ලැබෙන දත්ත ලිස්ට් එකක් (Array) ද කියලා චෙක් කරනවා
        if (!Array.isArray(articles)) {
            container.innerHTML = '<p>දත්ත ලැබීමේ දෝෂයක්! කරුණාකර පසුව උත්සාහ කරන්න.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            // ටිකර් එකට නිව්ස් එකතු කරනවා
            tickerText += ` • ${article.title} `;
            
            // නිව්ස් කාඩ් එක හදනවා
            const card = `
                <div class="news-card">
                    <img src="${article.image || 'https://via.placeholder.com/400x250?text=No+Image'}" alt="news">
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
        container.innerHTML = '<p>සර්වර් එකට සම්බන්ධ වීමට නොහැක. ඉන්ටර්නෙට් සම්බන්ධතාවය පරීක්ෂා කරන්න.</p>';
        console.error("Error fetching news:", error);
    }
}

// මුලින්ම පුවත් පෙන්වීමට
window.onload = () => fetchNews('all');
