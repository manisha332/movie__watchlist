// LocalStorage Setup & Initial State
let movies = JSON.parse(localStorage.getItem('movies')) || [];

const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');
const movieIdInput = document.getElementById('movieId');
const submitBtn = document.getElementById('submitBtn');

// READ: Render list items on screen
function renderMovies() {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${movie.title}</strong></td>
            <td>${movie.platform}</td>
            <td>${'⭐'.repeat(movie.rating)}</td>
            <td>${movie.isWatched ? '✅ Watched' : '⏳ Plan to Watch'}</td>
            <td>
                <button class="edit-btn" onclick="editMovie('${movie.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteMovie('${movie.id}')">Delete</button>
            </td>
        `;
        movieList.appendChild(row);
    });
    localStorage.setItem('movies', JSON.stringify(movies));
}

// CREATE & UPDATE form handler
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = movieIdInput.value;
    const title = document.getElementById('title').value;
    const platform = document.getElementById('platform').value;
    const rating = document.getElementById('rating').value;
    const isWatched = document.getElementById('isWatched').checked;

    if (id) {
        // UPDATE: Find matching ID and swap old object details
        movies = movies.map(m => m.id === id ? { id, title, platform, rating, isWatched } : m);
        submitBtn.innerText = 'Add Movie';
        submitBtn.style.background = '#e50914';
    } else {
        // CREATE: Inject unique record timestamp
        movies.push({ id: Date.now().toString(), title, platform, rating, isWatched });
    }

    movieForm.reset();
    movieIdInput.value = '';
    renderMovies();
});

// UPDATE: Move item details back up into input fields
window.editMovie = function(id) {
    const movie = movies.find(m => m.id === id);
    if (movie) {
        movieIdInput.value = movie.id;
        document.getElementById('title').value = movie.title;
        document.getElementById('platform').value = movie.platform;
        document.getElementById('rating').value = movie.rating;
        document.getElementById('isWatched').checked = movie.isWatched;
        submitBtn.innerText = 'Update Movie';
        submitBtn.style.background = '#ffc107';
    }
};

// DELETE: Pull item from array matching index key
window.deleteMovie = function(id) {
    movies = movies.filter(m => m.id !== id);
    renderMovies();
};

// Start display engine on initialization
renderMovies();
