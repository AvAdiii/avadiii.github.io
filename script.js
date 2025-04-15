// Analytics tracking
const eventLog = [];

function logEvent(event) {
    const timestamp = new Date().toISOString();
    const eventType = event.type;
    const targetElement = event.target.tagName.toLowerCase();
    const targetClass = event.target.className;
    const eventDetails = `${timestamp}, ${eventType}, ${targetElement}${targetClass ? ' (' + targetClass + ')' : ''}`;
    
    console.log(eventDetails);
    eventLog.push(eventDetails);
}

document.addEventListener('click', logEvent);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            logEvent({
                type: 'view',
                target: entry.target
            });
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function analyzeText() {
    const text = document.getElementById('textInput').value;
    
    const letters = text.match(/[a-zA-Z]/g)?.length || 0;
    const words = text.trim().split(/\s+/).length;
    const spaces = text.match(/\s/g)?.length || 0;
    const newlines = text.match(/\n/g)?.length || 0;
    const specialSymbols = text.match(/[^a-zA-Z0-9\s]/g)?.length || 0;

    const pronouns = {
        personal: ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'],
        possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
        reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves']
    };

    const prepositions = ['in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'of', 'about'];

    const articles = ['a', 'an', 'the'];

    const words_array = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    const pronounCount = {};
    const prepositionCount = {};
    const articleCount = {};

    words_array.forEach(word => {

        Object.entries(pronouns).forEach(([type, list]) => {
            if (list.includes(word)) {
                pronounCount[word] = (pronounCount[word] || 0) + 1;
            }
        });

        if (prepositions.includes(word)) {
            prepositionCount[word] = (prepositionCount[word] || 0) + 1;
        }
        if (articles.includes(word)) {
            articleCount[word] = (articleCount[word] || 0) + 1;
        }
    });
    const results = `
        <div class="analysis-section">
            <h3>Basic Statistics</h3>
            <div class="stat-grid">
                <div class="stat-item">
                    <span class="stat-label">Letters:</span>
                    <span class="stat-value">${letters}</span>
                </div>


                <div class="stat-item">
                    <span class="stat-label">Words:</span>
                    <span class="stat-value">${words}</span>
                </div>


                <div class="stat-item">
                    <span class="stat-label">Spaces:</span>
                    <span class="stat-value">${spaces}</span>
                </div>


                <div class="stat-item">
                    <span class="stat-label">Newlines:</span>
                    <span class="stat-value">${newlines}</span>
                </div>


                <div class="stat-item">
                    <span class="stat-label">Special Symbols:</span>
                    <span class="stat-value">${specialSymbols}</span>
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <h3>Pronouns Count</h3>
            <pre class="result-box">${JSON.stringify(pronounCount, null, 2)}</pre>
        </div>

        <div class="analysis-section">
            <h3>Prepositions Count</h3>
            <pre class="result-box">${JSON.stringify(prepositionCount, null, 2)}</pre>
        </div>

        <div class="analysis-section">
            <h3>Articles Count</h3>
            <pre class="result-box">${JSON.stringify(articleCount, null, 2)}</pre>
        </div>
    `;

    document.getElementById('analysisResults').innerHTML = results;
}

function revealOnScroll() {
    const elements = document.querySelectorAll('.card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();