document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // PART 1: API Data Fetching (Objective: Fetch Data from an API)
    // =========================================================
    
    const quoteContainer = document.getElementById('quote-container');
    const fetchBtn = document.getElementById('fetch-quote-btn');
    const QUOTE_API = 'https://api.quotable.io/quotes/random'; // Public Quote API

    async function fetchNewQuote() {
        quoteContainer.innerHTML = '<p>Fetching...</p>';
        fetchBtn.disabled = true;

        try {
            // Use fetch() for asynchronous request
            const response = await fetch(QUOTE_API);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const quote = data[0]; // The API returns an array
            
            // Display the fetched data dynamically
            if (quote) {
                quoteContainer.innerHTML = `
                    <p>"${quote.content}"</p>
                    <footer style="text-align: right;">— ${quote.author}</footer>
                `;
            } else {
                quoteContainer.innerHTML = '<p>No quote available right now.</p>';
            }

        } catch (error) {
            console.error("API Fetch Error:", error);
            quoteContainer.innerHTML = `<p style="color:red;">Error loading data: ${error.message}</p>`;
        } finally {
            fetchBtn.disabled = false;
        }
    }

    fetchBtn.addEventListener('click', fetchNewQuote);
    fetchNewQuote(); // Load an initial quote

    // =========================================================
    // PART 2: Interactive Image Carousel (Objective: Build Complex JS)
    // =========================================================

    const carousel = document.getElementById('carousel-images');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Array of image URLs for the carousel
    const images = [
        "https://picsum.photos/id/20/600/400",
        "https://picsum.photos/id/30/600/400",
        "https://picsum.photos/id/40/600/400",
        "https://picsum.photos/id/50/600/400"
    ];

    let currentIndex = 0;

    // Dynamically insert images into the carousel container
    function loadCarouselImages() {
        carousel.innerHTML = ''; // Clear initial placeholder
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            carousel.appendChild(img);
        });
    }
    
    // Function to update the carousel display
    function updateCarousel() {
        // Calculate the required horizontal shift (in percentage)
        // E.g., for index 1, transform will be -100%
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    // Event listeners for user interaction
    nextBtn.addEventListener('click', () => {
        // Move to the next index, looping back to 0 if at the end
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        // Move to the previous index, looping to the last item if at the start
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    // Initial setup
    loadCarouselImages();
    updateCarousel(); 
});