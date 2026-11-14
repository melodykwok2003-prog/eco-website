// ===== Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// ===== Navbar Shadow + Style on Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Animated Counter for Hero Stats =====
function animateCounter(element, target) {
    const duration = 2200;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = start + (target - start) * eased;

        if (target % 1 !== 0) {
            element.textContent = value.toFixed(1);
        } else {
            element.textContent = Math.floor(value);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
        }
    }

    requestAnimationFrame(update);
}

// Trigger counter when hero stats come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseFloat(entry.target.dataset.target);
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ===== Scroll Reveal Animation (Enhanced) =====
const revealElements = document.querySelectorAll(
    '.topic-card, .impact-card, .layer-card, .pollution-card, .sdg-card, .action-card, .timeline-item, .info-card, .callout, .content-block'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for siblings
            const siblings = entry.target.parentElement.querySelectorAll(':scope > *');
            const siblingIndex = Array.from(siblings).indexOf(entry.target);
            const delay = Math.min(siblingIndex * 80, 400);

            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
});

// ===== Carbon Calculator =====
function calculateCarbon() {
    const commute = parseFloat(document.getElementById('commute').value);
    const meat = parseFloat(document.getElementById('meat').value);
    const electric = parseFloat(document.getElementById('electric').value);
    const plastic = parseFloat(document.getElementById('plastic').value);

    const total = (commute + meat + electric + plastic).toFixed(1);
    const result = document.getElementById('calcResult');

    let level, color, message;

    if (total < 5) {
        level = '🟢 環保先鋒';
        color = '#52b788';
        message = `你的日均碳足跡約 ${total} kg CO₂，表現優異！繼續保持綠色生活方式。`;
    } else if (total < 10) {
        level = '🟡 還不錯';
        color = '#f4a261';
        message = `你的日均碳足跡約 ${total} kg CO₂，還有改善空間，試試更多環保行動吧！`;
    } else if (total < 15) {
        level = '🟠 需要改善';
        color = '#e76f51';
        message = `你的日均碳足跡約 ${total} kg CO₂，建議從綠色出行和節約用電開始改變。`;
    } else {
        level = '🔴 高碳排放';
        color = '#c0392b';
        message = `你的日均碳足跡約 ${total} kg CO₂，碳排放偏高，地球需要你的改變！`;
    }

    result.innerHTML = `
        <div style="font-size:1.4rem; font-weight:900; color:${color}; margin-bottom:8px;">${level}</div>
        <div style="font-size:1rem; color:rgba(255,255,255,0.85);">${message}</div>
        <div style="margin-top:12px; font-size:0.82rem; color:rgba(255,255,255,0.5);">全球人均日均碳足跡約 5-6 kg CO₂，目標是降至 3 kg 以下</div>
    `;
    result.style.background = `linear-gradient(135deg, ${color}33, ${color}11)`;
    result.style.border = `1px solid ${color}44`;
    result.classList.add('show');
}

// ===== Environmental Quiz =====
const quizQuestions = [
    {
        question: '全球平均氣溫較工業化前已上升了多少？',
        options: ['約 0.5°C', '約 1.1°C', '約 2.0°C', '約 3.0°C'],
        correct: 1,
        explanation: '根據 IPCC 報告，全球平均氣溫已較工業化前上升約 1.1°C，若超過 1.5°C 將觸發不可逆轉的氣候臨界點。'
    },
    {
        question: '每年有多少塑料垃圾流入海洋？',
        options: ['約 80萬噸', '約 800萬噸', '約 8,000萬噸', '約 8億噸'],
        correct: 1,
        explanation: '每年約有 800萬噸塑料垃圾流入海洋，相當於每分鐘倒入一卡車的塑料。這些塑料需要數百年才能降解。'
    },
    {
        question: '以下哪個不是生物多樣性的三個層次之一？',
        options: ['基因多樣性', '物種多樣性', '氣候多樣性', '生態系統多樣性'],
        correct: 2,
        explanation: '生物多樣性包括基因多樣性、物種多樣性和生態系統多樣性三個層次。氣候多樣性不屬於生物多樣性的範疇。'
    },
    {
        question: '畜牧業佔全球溫室氣體排放的百分比大約是多少？',
        options: ['約 5%', '約 14.5%', '約 25%', '約 40%'],
        correct: 1,
        explanation: '聯合國糧農組織數據顯示，畜牧業約佔全球溫室氣體排放的 14.5%，減少肉類消費是有效的個人減碳方式。'
    },
    {
        question: '一個塑料瓶完全降解需要多少年？',
        options: ['約 50年', '約 150年', '約 450年', '約 1,000年'],
        correct: 2,
        explanation: '一個塑料瓶需要約 450年才能完全降解。在此期間，它會持續釋放微塑料，最終進入食物鏈被人類攝入。'
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    answered = false;

    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `第 ${currentQuestion + 1} 題 / 共 ${quizQuestions.length} 題`;

    // Load question
    document.getElementById('quizQuestion').textContent = q.question;

    // Load options
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });

    // Reset feedback
    const feedback = document.getElementById('quizFeedback');
    feedback.classList.remove('show', 'correct', 'wrong');
    feedback.textContent = '';

    // Disable next button
    document.getElementById('nextBtn').disabled = true;

    // Update next button text
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('nextBtn').textContent = '查看結果 →';
    } else {
        document.getElementById('nextBtn').textContent = '下一題 →';
    }
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');

    // Disable all options
    options.forEach(opt => opt.disabled = true);

    if (index === q.correct) {
        options[index].classList.add('correct');
        score++;
        feedback.classList.add('correct');
        feedback.innerHTML = `<strong>✓ 回答正確！</strong><br>${q.explanation}`;
    } else {
        options[index].classList.add('wrong');
        options[q.correct].classList.add('correct');
        feedback.classList.add('wrong');
        feedback.innerHTML = `<strong>✗ 答案不正確。</strong> 正確答案是：<strong>${q.options[q.correct]}</strong><br>${q.explanation}`;
    }

    feedback.classList.add('show');
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    // Hide question area
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizOptions').style.display = 'none';
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';

    // Show result
    const resultPage = document.getElementById('quizResultPage');
    resultPage.style.display = 'block';

    const percentage = (score / quizQuestions.length) * 100;
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreTitle = document.getElementById('scoreTitle');
    const scoreMessage = document.getElementById('scoreMessage');

    scoreCircle.textContent = `${score}/${quizQuestions.length}`;

    if (percentage === 100) {
        scoreCircle.style.background = 'linear-gradient(135deg, #2d6a4f, #52b788)';
        scoreTitle.textContent = '完美！你是環保專家！';
        scoreMessage.textContent = '你對環保知識掌握得非常全面，繼續傳播環保理念吧！';
    } else if (percentage >= 60) {
        scoreCircle.style.background = 'linear-gradient(135deg, #f4a261, #e76f51)';
        scoreTitle.textContent = '不錯！你有一定環保基礎';
        scoreMessage.textContent = '還有進步空間，多瞭解環保知識，成為環保達人吧！';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #e76f51, #c0392b)';
        scoreTitle.textContent = '繼續學習！';
        scoreMessage.textContent = '環保知識需要不斷積累，回到上方重新閱讀，再來挑戰吧！';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById('quizQuestion').style.display = '';
    document.getElementById('quizOptions').style.display = '';
    document.getElementById('quizFeedback').style.display = '';
    document.getElementById('nextBtn').style.display = '';
    document.querySelector('.quiz-progress').style.display = '';
    document.getElementById('quizResultPage').style.display = 'none';

    loadQuestion();
}

// Initialize quiz
loadQuestion();

// ===== Smooth scroll enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 70;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});