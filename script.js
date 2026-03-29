// Firebase Configuration
// ඔයාගේ අලුත් Firebase Project එකේ URL එක මෙතන තියෙනවා
const databaseURL = "https://news-9eb3f-default-rtdb.firebaseio.com/";

// පුවත් දත්ත ලබා ගැනීමේ Function එක
async function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    
    try {
        // Firebase එකෙන් news ලබා ගැනීම
        const response = await fetch(`${databaseURL}news.json`);
        const data = await response.json();

        // පද්ධතියේ පුවත් නොමැති නම් හෝ දත්ත නැතිනම්
        if (!data) {
            newsContainer.innerHTML = `
                <div class="no-news">
                    <h3>පද්ධතියේ පුවත් කිසිවක් නොමැත.</h3>
                    <p>කරුණාකර Firebase Realtime Database එකට පුවත් ඇතුළත් කරන්න.</p>
                </div>`;
            return;
        }

        // පවතින පුවත් මකා අලුත් ඒවා පෙන්වීම
        newsContainer.innerHTML = '';

        // දත්ත Object එකක් නිසා එය Array එකකට හරවා පෙන්වීම
        Object.keys(data).reverse().forEach(key => {
            const news = data[key];
            const newsHtml = `
                <div class="news-card">
                    <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                    <div class="news-content">
                        <h2>${news.title}</h2>
                        <p>${news.desc}</p>
                        <a href="${news.url}" target="_blank" class="read-more">වැඩිදුර කියවන්න</a>
                    </div>
                </div>
            `;
            newsContainer.innerHTML += newsHtml;
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = `
            <div class="error-msg">
                <h3>පුවත් පූරණය කිරීමේ දෝෂයකි!</h3>
                <p>ඔබේ අන්තර්ජාල සබඳතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.</p>
            </div>`;
    }
}

// පිටුව Load වන විට පුවත් ලබා ගැනීම ආරම්භ කරන්න
window.onload = fetchNews;
