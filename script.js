// 1. Define the chart globally so we can update it later
let myChart;

// 2. Initialize the Chart on Page Load
window.onload = function() {
    const ctx = document.getElementById('marketChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Market Price Trend (INR/sqft)',
                data: [8000, 8500, 9200, 10500, 11000], // Default data
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: false } }
        }
    });
};

// 3. Updated Calculation Function
function calculatePrice() {
    const loc = document.getElementById('location').value;
    const area = parseFloat(document.getElementById('area').value);
    const rooms = parseInt(document.getElementById('rooms').value);
    const age = parseInt(document.getElementById('age').value);

    if (!area || isNaN(area)) {
        alert("Please enter a valid area.");
        return;
    }

    // AI Pricing Logic
    let basePrice = loc === 'mumbai' ? 18000 : (loc === 'delhi' ? 14000 : 9000);
    let estimatedTotal = (area * basePrice) + (rooms * 300000) - (age * 20000);

    // Display the Result
    document.getElementById('result').innerHTML = `
        <small>Estimated Market Value</small><br>
        <strong>₹${estimatedTotal.toLocaleString('en-IN')}</strong>
    `;

    // --- THE FIX: UPDATE THE CHART ---
    updateChart(basePrice);
}

// 4. Function to modify the chart data dynamically
function updateChart(newBasePrice) {
    // We create a "fake" trend based on the current location price
    const newData = [
        newBasePrice * 0.85, 
        newBasePrice * 0.90, 
        newBasePrice * 0.95, 
        newBasePrice, 
        newBasePrice * 1.05
    ];

    // Push new data to the chart
    myChart.data.datasets[0].data = newData;
    
    // Smoothly animate the update
    myChart.update();
}

// In your JS file or <script> block
function suggestMarket() { 
    console.log("Searching...");
    // your code here
}

// Section Switching Logic
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');
}


// --- AUTHENTICATION LOGIC ---

function toggleAuth(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    if (type === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabRegister.classList.add('active');
        tabLogin.classList.add('active'); // Keep both showing or switch styles
    }
}

// --- SECTION SWITCHING ---
function switchAuth(type) {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const tabLog = document.getElementById('tab-login');
    const tabReg = document.getElementById('tab-register');

    if (type === 'login') {
        loginForm.classList.add('active');
        regForm.classList.remove('active');
        tabLog.classList.add('active');
        tabReg.classList.remove('active');
    } else {
        regForm.classList.add('active');
        loginForm.classList.remove('active');
        tabReg.classList.add('active');
        tabLog.classList.remove('active');
    }
}

// --- CORE AUTH LOGIC ---

function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const name = document.getElementById('reg-name').value;

    if (!email || !pass || !name) {
        alert("System Notice: All fields are mandatory for firm registration.");
        return;
    }

    // Secure Data Locally
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPass', pass);
    localStorage.setItem('userName', name);

    alert("Account successfully created. Proceeding to Secure Sign-In.");
    switchAuth('login');
}

function handleLogin() {
    const emailInput = document.getElementById('log-email').value;
    const passInput = document.getElementById('log-pass').value;
    const errorDiv = document.getElementById('login-error');

    // Fetch credentials
    const storedEmail = localStorage.getItem('userEmail');
    const storedPass = localStorage.getItem('userPass');

    // Error Validation Logic
    if (!storedEmail) {
        errorDiv.innerText = "System Access Error: Account not found. Please register first.";
        errorDiv.style.display = "block";
        return;
    }

    if (emailInput === storedEmail && passInput === storedPass) {
        errorDiv.style.display = "none";
        launchDashboard();
    } else {
        errorDiv.innerText = "Security Alert: Invalid credentials. Access denied.";
        errorDiv.style.display = "block";
    }
}

function launchDashboard() {
    const overlay = document.getElementById('auth-overlay');
    const dashboard = document.getElementById('main-dashboard');
    
    // Smooth transition
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        dashboard.style.display = 'flex';
        // Your Chart initialization call
        if (typeof initChart === "function") initChart();
    }, 400);
}


// Function to format the property data into a readable string
function getPropertyDetails() {
    const location = document.getElementById('location').value || "Not specified";
    const area = document.getElementById('area').value || "0";
    const resultText = document.getElementById('result').innerText || "No valuation yet";

    return `*AI Real Estate Valuation Report*\n\n` +
           `📍 *Location:* ${location}\n` +
           `📏 *Area:* ${area} sq ft\n` +
           `💰 *Estimated Value:* ${resultText}\n\n` +
           `_Generated by EstateAI Enterprise System 2026_`;
}

// WhatsApp Function
function contactWhatsApp() {
    const phoneNumber = "919607789402"; // Replace with your actual number
    const message = encodeURIComponent("Hello Shalini, I'm using the AI Real Estate System and need professional assistance.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Instagram Function
function contactInstagram() {
    const username = "shalini_pandey_96"; // Replace with your actual ID
    window.open(`https://www.instagram.com/${username}/`, '_blank');
}




document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('propertyImage');
    const sellBtn = document.getElementById('sellBtn');
    const buyBtn = document.getElementById('buyBtn');
    let currentMode = '';

    // Function to format numbers to Indian Rupees (₹)
    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    sellBtn.addEventListener('click', () => { currentMode = 'sell'; fileInput.click(); });
    buyBtn.addEventListener('click', () => { currentMode = 'buy'; fileInput.click(); });

    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            const targetResult = currentMode === 'sell' ? 'sellResult' : 'buyResult';
            const targetPreview = currentMode === 'sell' ? 'sellPreview' : 'buyPreview';

            // Show Preview of the Photo
            reader.onload = function(e) {
                document.getElementById(targetPreview).innerHTML = 
                    `<img src="${e.target.result}" style="width:100%; border-radius:8px; margin: 10px 0;">`;
            };
            reader.readAsDataURL(this.files[0]);

            // Show Loading State
            document.getElementById(targetResult).innerHTML = "<p><em>AI Analyzing Market Trends...</em></p>";

            // Simulate AI Prediction
            setTimeout(() => {
                // Random Logic: Current price between 50 Lakhs and 2 Crores
                const currentPrice = Math.floor(Math.random() * (20000000 - 5000000) + 5000000);
                const futurePrice = Math.floor(currentPrice * 1.25); // 25% predicted growth

                const resultHTML = `
                    <div class="price-container" style="background: #f9f9f9; padding: 10px; border-radius: 5px; border-left: 4px solid #27ae60;">
                        <p style="margin:5px 0;"><strong>Current Market Value:</strong> <br> <span style="font-size: 1.2rem; color: #333;">${formatRupee(currentPrice)}</span></p>
                        <p style="margin:5px 0;"><strong>Future Value (3 Yrs):</strong> <br> <span style="font-size: 1.2rem; color: #27ae60;">${formatRupee(futurePrice)}</span></p>
                    </div>
                `;
                document.getElementById(targetResult).innerHTML = resultHTML;
            }, 1500);
        }
    });
});