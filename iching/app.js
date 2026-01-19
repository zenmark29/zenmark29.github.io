import ichingData from './data/iching_wilhelm_translation.js';

let data;
const yarrowValues = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9];

async function initialize() {
    try {
        data = ichingData; // Data is already imported as a module
        document.getElementById('consultBtn').addEventListener('click', () => {
            const question = document.getElementById('question').value;
            const lines = castHexagram();
            renderReading(lines, question);
        });
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

function castHexagram() {
    let lines = [];
    for (let i = 0; i < 6; i++) {
        let val = yarrowValues[Math.floor(Math.random() * yarrowValues.length)];
        lines.push({
            val: val,
            isMoving: (val === 6 || val === 9),
            type: (val === 7 || val === 9) ? "1" : "0"
        });
    }
    return lines;
}

function renderReading(lines, question) {
    const output = document.getElementById('output');
    const primaryBinary = lines.map(l => l.type).join('');
    const hexData = Object.values(data).find(h => String(h.binary) === primaryBinary);

    if (!hexData) return;

    let html = ``;
    if (question) html += `<p class="section-title">Inquiry</p><div class="content">"${question}"</div>`;

    // Visual Hexagram
    html += `<div class="hex-container">`;
    [...lines].reverse().forEach(l => {
        const lineClass = l.type === "1" ? "yang" : "yin";
        const movingClass = l.isMoving ? "moving" : "";
        html += `<div class="line ${lineClass} ${movingClass}">${l.type === "0" ? '<div></div><div></div>' : ''}</div>`;
    });
    html += `</div>`;

    // Text Content
    html += `<h2>${hexData.hex}. ${hexData.english}</h2>`;
    html += `<div class="chinese-char">${hexData.hex_font} ${hexData.trad_chinese}</div>`;
    html += `<p class="section-title">The Judgment</p><div class="content">${hexData.wilhelm_judgment.text}</div>`;
    html += `<p class="section-title">The Comments</p><div class="content">${hexData.wilhelm_judgment.comments}</div>`;
    html += `<p class="section-title">The Image</p><div class="content">${hexData.wilhelm_image.text}</div>`;

    // Changes
    if (lines.some(l => l.isMoving)) {
        html += `<p class="section-title">The Changes</p>`;
        lines.forEach((l, i) => {
            if (l.isMoving) {
                const lineData = hexData.wilhelm_lines[String(i + 1)];
                if (lineData) html += `<div class="moving-line-text"><strong>Line ${i+1}:</strong> ${lineData.text}</div>`;
                if (lineData) html += `<div class="moving-line-text"><strong>comments:</strong> ${lineData.comments}</div>`;
            }
        });

        // Relating Hexagram
        const relBinary = lines.map(l => l.isMoving ? (l.type === "1" ? "0" : "1") : l.type).join('');
        const relData = Object.values(data).find(h => String(h.binary) === relBinary);
        if (relData) {
            html += `<hr style="border:0; border-top:1px solid #eee; margin:50px 0;">`;
            html += `<p class="section-title">Relating State</p><h2>${relData.hex}. ${relData.english}</h2>`;
            html += `<div class="hex-container">`;
            relBinary.split('').reverse().forEach(bit => {
                const lineClass = bit === "1" ? "yang" : "yin";
                html += `<div class="line ${lineClass}">${bit === "0" ? '<div></div><div></div>' : ''}</div>`;
            });
            html += `</div><p class="section-title">The Context</p><div class="content">${relData.wilhelm_judgment.text} ${relData.wilhelm_judgment.comments}</div>`;
        }
    }
    output.innerHTML = html;
    window.scrollTo({ top: output.offsetTop, behavior: 'smooth' });
}

initialize();
