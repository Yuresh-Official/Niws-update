import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsJ3-0AXE5e2XYSFbYnXz9KnlY1AvOv7g",
  authDomain: "smart-notes-sl.firebaseapp.com",
  databaseURL: "https://smart-notes-sl-default-rtdb.firebaseio.com",
  projectId: "smart-notes-sl",
  storageBucket: "smart-notes-sl.firebasestorage.app",
  messagingSenderId: "887470710465",
  appId: "1:887470710465:web:dced581802fce10ef93e40",
  measurementId: "G-YFSVQYCYW0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function loadNews() {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('breaking-news');
    const newsRef = ref(db, 'news');

    onValue(newsRef, (snapshot) => {
        const data = snapshot.val();
        
        if (!data) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                    <h3>පද්ධතියේ පුවත් කිසිවක් නොමැත.</h3>
                    <p>කරුණාකර Firebase Realtime Database එකට පුවත් ඇතුළත් කරන්න.</p>
                </div>`;
            ticker.innerText = "පුවත් කිසිවක් වාර්තා වී නොමැත.";
            return;
        }

        container.innerHTML = '';
        let tickerText = "";
        
        // Data Objects Array එකක් බවට හරවා අලුත්ම ඒවා උඩට ගැනීම
        const newsList = Object.values(data).reverse();

        newsList.forEach(item => {
            tickerText += ` • ${item.title} `;
            
            const card = `
                <div class="news-card">
                    <img src="${item.image || 'https://via.placeholder.com/400x250?text=News'}" alt="news">
                    <div class="news-content">
                        <h3>${item.title}</h3>
                        <p>${item.desc || item.description || ''}</p>
                        <a href="${item.url || '#'}" target="_blank" class="read-more">වැඩිදුර කියවන්න →</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        ticker.innerText = tickerText;
    });
}

window.onload = loadNews;
