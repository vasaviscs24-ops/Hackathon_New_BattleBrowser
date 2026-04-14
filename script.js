/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */
window.addEventListener('scroll', () => {
    const header = document.getElementById('navbar');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Trigger Curtain and Sequential Entrance on Page Load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Cleanup curtain after animation to prevent horizontal scroll issues
    setTimeout(() => {
        const curtain = document.querySelector('.curtain-wrapper');
        if (curtain) curtain.style.display = 'none';
        
        // Remove individual curtain panels just to be sure
        document.querySelectorAll('.curtain-panel').forEach(p => p.style.display = 'none');
    }, 2500); 
});

/* =========================================
   HERO SLIDER (AUTO CHANGE EVERY 10S)
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        setInterval(nextSlide, 10000);
    }
});

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.classList.contains('about-block')){
                entry.target.classList.add('visible');
            }
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        el.style.opacity = 0;
        if (el.classList.contains('right')) {
            el.style.transform = 'translateX(40px) scale(0.95)';
        } else if (el.classList.contains('left')) {
            el.style.transform = 'translateX(-40px) scale(0.95)';
        } else {
            el.style.transform = 'translateY(40px) scale(0.95)';
        }
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});

/* =========================================
   🌟 UNIQUE INTERACTIVE ANIMATIONS 🌟
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Parallax for Backgrounds
    document.addEventListener('mousemove', (e) => {
        // Parallax background watermark logo
        const bg = document.querySelector('.about-brand-bg');
        if (bg) {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            bg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        const researchBg = document.querySelector('.research-brand-bg');
        if (researchBg) {
            const x = (window.innerWidth - e.pageX * 2) / 60;
            const y = (window.innerHeight - e.pageY * 2) / 60;
            researchBg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        const placementBg = document.querySelector('.placement-brand-bg');
        if (placementBg) {
            const x = (window.innerWidth - e.pageX * 2) / 60;
            const y = (window.innerHeight - e.pageY * 2) / 60;
            placementBg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        // Parallax background orbs
        const orbX = (window.innerWidth - e.pageX * 2) / 100;
        const orbY = (window.innerHeight - e.pageY * 2) / 100;
        document.body.style.setProperty('--mouseX', `${orbX}px`);
        document.body.style.setProperty('--mouseY', `${orbY}px`);
    });

    // 2. Interactive 3D Glare & Tilt Effect for Glass Cards
    const tiltElements = document.querySelectorAll('.about-block, .preview-content, .visionary-card, .partner-card, .club-item');
    
    tiltElements.forEach(el => {
        el.style.transformStyle = 'preserve-3d';
        
        el.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 820) return; // Disable tilt on mobile for performance and better touch interaction
            
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'transform 0.1s ease-out';
            el.style.background = `rgba(255, 255, 255, 0.03) radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.5s ease-out, background 0.5s ease-out';
            el.style.background = 'rgba(255, 255, 255, 0.03)';
        });
    });

    /* =========================================
       MOBILE HAMBURGER MENU
    ========================================= */
    const header = document.getElementById('navbar');
    if (header) {
        // Inject hamburger button
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger');
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(hamburger); // Move to body for global stacking

        // Inject overlay
        const overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);

        const navLinks = header.querySelector('.nav-links');
        if (navLinks) {
            // Move navLinks to body to avoid parent-container filter/clipping issues
            document.body.appendChild(navLinks);
        }

        // Add dropdown arrows to mobile dropdowns
        const dropdowns = navLinks ? navLinks.querySelectorAll('.dropdown > a') : [];
        dropdowns.forEach(a => {
            const arrow = document.createElement('span');
            arrow.classList.add('dropdown-arrow');
            arrow.textContent = '▾';
            a.appendChild(arrow);
        });

        const openNav = () => {
            hamburger.classList.add('open');
            if (navLinks) navLinks.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            overlay.style.display = 'block';
            setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        };

        const closeNav = () => {
            hamburger.classList.remove('open');
            if (navLinks) navLinks.classList.remove('open');
            overlay.style.opacity = '0';
            setTimeout(() => { 
                overlay.classList.remove('open');
                overlay.style.display = 'none'; 
            }, 400);
            document.body.style.overflow = '';
            if (navLinks) {
                navLinks.querySelectorAll('.dropdown').forEach(d => d.classList.remove('mobile-open'));
            }
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hamburger.classList.contains('open')) closeNav();
            else openNav();
        });

        overlay.addEventListener('click', closeNav);

        // Mobile accordion dropdowns
        dropdowns.forEach(a => {
            a.addEventListener('click', (e) => {
                if (window.innerWidth <= 820) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = a.closest('.dropdown');
                    
                    // Close other dropdowns
                    navLinks.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== parent) d.classList.remove('mobile-open');
                    });
                    
                    parent.classList.toggle('mobile-open');
                }
            });
        });

        // Close nav on resize back to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 820) closeNav();
        });
    }
});

/* =========================================
   NUMBER COUNTING ANIMATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count-up');
    const speed = 100;

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0; // Ensures it starts at 0 properly
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        // Explicitly set to 0 initially
        counter.innerText = '0';
        countObserver.observe(counter);
    });
});

/* =========================================
   INTERACTIVE CHATBOT LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Chatbot UI
    const chatbotHTML = `
        <div class="chatbot-trigger" id="chatbotTrigger" title="Chat with BMSCE Assistant">
            <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="chatbot-container" id="chatbotContainer">
            <div class="chat-header">
                <div class="chat-header-img">
                    <img src="logo-transparent.png" alt="Bot">
                </div>
                <div class="chat-header-info">
                    <h3>BMSCE Assistant</h3>
                    <span>Online</span>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    Hello! Welcome to B.M.S. College of Engineering. How can I assist you today?
                </div>
            </div>
            <div class="chat-input-area">
                <form class="chat-input-container" id="chatForm">
                    <input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off">
                    <button type="submit" class="chat-send-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const trigger = document.getElementById('chatbotTrigger');
    const container = document.getElementById('chatbotContainer');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const messagesSection = document.getElementById('chatMessages');

    // 2. Toggle Chatbot
    trigger.addEventListener('click', () => {
        trigger.classList.toggle('active');
        container.classList.toggle('active');
        if (container.classList.contains('active')) {
            input.focus();
        }
    });

    // 3. Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && container.classList.contains('active')) {
            trigger.classList.remove('active');
            container.classList.remove('active');
        }
    });

    // 4. Handle Messaging
    const addMessage = (content, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = content;
        messagesSection.appendChild(msgDiv);
        messagesSection.scrollTop = messagesSection.scrollHeight;
    };

    /**
     * 🧠 SUPER_KNOWLEDGE_BASE
     * Curated site-wide facts mined from 20+ HTML files.
     */
    /**
     * TIER-4 HYPER-INTELLIGENT KNOWLEDGE MATRIX
     * --------------------------------------------------
     * Injected with high-fidelity institutional data mined from site metadata.
     */
    const SKI = {
        admissions: {
            title: "Admissions 2026-27",
            keywords: ['admission', 'apply', 'join', 'seat', 'quota', 'process', 'flow', 'management', 'icd', 'international', '2026', '2027', 'cutoff'],
            answer: `Admissions for the **2026-27 session** are open! We offer multiple entry paths:<br>
                &bull; **KEA (CET):** For Karnataka residents.<br>
                &bull; **COMED-K:** For all-India candidates.<br>
                &bull; **Management Quota:** Direct admissions based on merit.<br>
                Visit the <a href="admissions.html" style="color:#00f2fe;font-weight:600;">Admissions Portal</a> for the procedure flow.`,
            score: 1.0
        },
        fees: {
            title: "Fee Structure (Annual)",
            keywords: ['fee', 'cost', 'payment', 'price', 'lakh', 'structure', 'how much', 'money'],
            answer: `Current Management Fees for major branches:<br>
                &bull; **CSE:** 15.0 Lakhs<br>
                &bull; **AI & ML:** 12.5 Lakhs<br>
                &bull; **ECE:** 9.0 Lakhs<br>
                &bull; **Core (Mech/Civil):** 6.0 Lakhs<br>
                Payment via DD to **"BMS Educational Trust"**. Details on <a href="admissions.html" style="color:#00f2fe;font-weight:600;">Fees Page</a>.`,
            score: 0.9
        },
        founders: {
            title: "Heritage & Visionaries",
            keywords: ['founded', 'history', 'legacy', 'start', 'founder', 'sreenivasaiah', 'narayan', 'old', 'visionary', 'raja karya prasaktha'],
            answer: `BMSCE is India's **first private technical institution**, founded in **1946** by **Late Sri. B. M. Sreenivasaiah**. His legacy was carried forward by **Late Sri. B. S. Narayan**, who established international collaborations with the Melton Foundation.`,
            score: 1.1
        },
        cse: {
            title: "Computer Science (CSE)",
            keywords: ['cse', 'computer', 'science', 'coding', 'software', 'programming', 'sooda'],
            answer: `The CSE department is led by **Dr. Kavitha Sooda (HOD)**. It features the premier **NVIDIA DGX Deep Learning Lab** and focus areas like Cloud Computing and AI. Visit: <a href="academics-cse.html" style="color:#00f2fe;font-weight:600;">CSE Dept</a>.`,
            score: 1.2
        },
        ece: {
            title: "Electronics (ECE)",
            keywords: ['ece', 'electronics', 'communication', 'vlsi', 'signal', 'lakshmi'],
            answer: `The ECE department is led by **Dr. K. P. Lakshmi (HOD)**. Key research areas include **Embedded Systems and VLSI Design**. Visit: <a href="academics-ece.html" style="color:#00f2fe;font-weight:600;">ECE Dept</a>.`,
            score: 1.2
        },
        research_nano: {
            title: "Nanomaterials Centre (CND)",
            keywords: ['research', 'patent', 'lab', 'innovat', 'nano', 'phd', 'cnd', 'display', 'cleanroom', 'liquid crystal'],
            answer: `The **B S Narayan Centre for Nano-Materials & Displays (CND)** is our flagship research hive. It houses a **Class-1000 Cleanroom** for advanced display and battery research. Visit: <a href="research-nano.html" style="color:#00f2fe;font-weight:600;">Nano Centre</a>.`,
            score: 1.1
        },
        placements: {
            title: "Placement Statistics",
            keywords: ['placement', 'job', 'package', 'company', 'recruit', 'salary', 'career', 'offer', 'basavaraja'],
            answer: `Led by **Dr. J. Sharana Basavaraja (Dean)**, our placement cell has generated **18,500+ offers** with 350+ recruiters like Microsoft, Amazon, and NVIDIA visiting annually. Visit: <a href="placement-about.html" style="color:#00f2fe;font-weight:600;">Placements</a>.`,
            score: 1.0
        },
        facilities: {
            title: "Campus Facilities",
            keywords: ['facility', 'hospital', 'hostel', 'library', 'data centre', 'gym', 'sports', 'wifi', 'nvidia', 'dgx'],
            answer: `BMSCE offers a 10Gbps campus backbone, a **24/7 B S Narayan Memorial Hospital**, and a high-density **AI Data Centre** featuring NVIDIA DGX servers. Explore: <a href="facilities.html" style="color:#00f2fe;font-weight:600;">Campus Map</a>.`,
            score: 1.0
        },
        contact: {
            title: "Contact & Support",
            keywords: ['contact', 'phone', 'email', 'call', 'reach', 'number', 'address', 'location'],
            answer: `**Main Campus:** Bull Temple Road, Bangalore - 560019.<br>
                &bull; **Admin:** 080-26622130<br>
                &bull; **Admissions:** 080-26611636<br>
                &bull; **Email:** info@bmsce.ac.in`,
            score: 1.3
        }
    };

    /**
     * 🚀 TIER-4 WEIGHTED RETRIEVAL ENGINE
     * Uses fuzzy mapping and weighted scoring for maximum intelligence.
     */
    const handleBotResponse = (userText) => {
        const query = userText.toLowerCase().trim();
        const tokens = query.split(/\s+/).filter(t => t.length > 2);
        
        // Semantic Synonyms
        const synonyms = {
           "ai": "artificial intelligence",
           "ml": "machine learning",
           "coding": "cse computer science",
           "marks": "eligibility cutoff",
           "money": "fees structure",
           "where": "location address contact",
           "who": "principal dean leader"
        };

        let enrichedQuery = query;
        for (const [key, value] of Object.entries(synonyms)) {
            if (query.includes(key)) enrichedQuery += " " + value;
        }

        let bestKey = null;
        let maxScore = 0;

        for (const key in SKI) {
            const data = SKI[key];
            let currentScore = 0;

            // 1. Direct Title/Category Match (Highest Weight)
            if (enrichedQuery.includes(key) || enrichedQuery.includes(data.title.toLowerCase())) {
                currentScore += 15;
            }

            // 2. Keyword Vector Matching
            data.keywords.forEach(kw => {
                if (enrichedQuery.includes(kw)) {
                    currentScore += 5;
                    // Token-level exact match bonus
                    if (tokens.includes(kw)) currentScore += 2;
                }
            });

            // Apply base semantic multiplier
            currentScore *= (data.score || 1.0);

            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestKey = key;
            }
        }

        let botReply = "";
        if (maxScore > 4) {
            const match = SKI[bestKey];
            botReply = `**${match.title}**<br><br>${match.answer}`;
        } else {
            botReply = "I couldn't find a direct match, but I can help you with:<br><br>" +
                       "<button class='quick-btn' data-q='admissions'>Admissions</button> " +
                       "<button class='quick-btn' data-q='fees'>Fees</button> " +
                       "<button class='quick-btn' data-q='placements'>Placements</button> " +
                       "<button class='quick-btn' data-q='cse'>CSE Dept</button>";
        }

        // Simulate "Thinking" for high-intel feel
        setTimeout(() => {
            addMessage(botReply, 'bot');
            attachQuickBtnListeners();
        }, 550);
    };

    const attachQuickBtnListeners = () => {
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.onclick = () => {
                const q = btn.getAttribute('data-q');
                addMessage(q.charAt(0).toUpperCase() + q.slice(1), 'user');
                handleBotResponse(q);
            };
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addMessage(text, 'user');
            input.value = '';
            handleBotResponse(text);
        }
    });
});



