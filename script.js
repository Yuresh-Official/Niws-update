const apiKey = "hiru_58d3adee3c4f2f452d175f42e18b30f7";
const baseUrl = "https://hiru-api-news.vercel.app/api/news/";
// CORS Error එක විසඳීමට මෙම Proxy එක අනිවාර්යයි
const proxyUrl = "https://corsproxy.io/?"; 

async function fetchNews(type) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    container.innerHTML = '<div class="loader" style="text-align:center; padding:20px;">පුවත් ලැබෙමින් පවතී...</div>';

    // Proxy එක හරහා API URL එක සකස් කිරීම
    const targetUrl = `${baseUrl}${type}?apikey=${apiKey}`;
    const finalUrl = `${proxyUrl}${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(finalUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // ඔයා එවපු screenshot එකේ විදිහට data තියෙන්නේ 'result' ඇතුළේ
        const articles = data.result || [];

        if (articles.length === 0) {
            container.innerHTML = '<p style="text-align:center;">පුවත් කිසිවක් හමු නොවීය.</p>';
            return;
        }

        container.innerHTML = '';
        let tickerText = "";

        articles.forEach(article => {
            tickerText += ` • ${article.title} `;
            
            const card = `
                <div class="news-card">
                    <img src="${article.image || 'https://via.placeholder.com/400x250?text=No+Image'}" 
                         alt="news" 
                         onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                    <div class="news-content">
                        <span class="source-tag">${article.source || 'News'}</span>
                        <h3>${article.title}</h3>
                        <p>${article.desc || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;

    } catch (error) {
        container.innerHTML = '<p style="text-align:center; color:red;">දත්ත ලබා ගැනීමට නොහැකි විය. පසුව නැවත උත්සාහ කරන්න.</p>';
        console.error("Fetch error:", error);
    }
}

window.onload = () => fetchNews('all');
