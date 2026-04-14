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
    const SKI = {
        admissions: {
            keywords: ['admission', 'apply', 'join', 'seat', 'quota', 'process', 'flow', 'management', 'icd', 'international', '2026', '2027'],
            answer: `Admissions for the <b>2026-27 session</b> are currently open! We follow a strict merit-based process via <b>KEA, COMED-K</b>, and Management Quota. Detailed document checklists and procedure flows are available on our <a href="admissions.html" style="color:#00f2fe;font-weight:600;">Admissions Portal</a>.`
        },
        fees: {
            keywords: ['fee', 'cost', 'payment', 'price', 'lakh', 'structure', 'how much'],
            answer: `The 2026-27 Management Fee structure (per annum) is:<br>
                &bull; <b>CSE:</b> 15.0 Lakhs<br>
                &bull; <b>AI & ML:</b> 12.5 Lakhs<br>
                &bull; <b>ECE:</b> 9.0 Lakhs<br>
                &bull; <b>Mech/Civil:</b> 6.0 Lakhs<br>
                &bull; <b>Chemical:</b> 4.0 Lakhs<br>
                Payments should be made via <b>Demand Draft</b> favoring <b>"BMS Educational Trust"</b>. See full list: <a href="admissions.html" style="color:#00f2fe;font-weight:600;">Fees Page</a>.`
        },
        fees_cse: {
            keywords: ['cse', 'computer', 'science', 'fee', 'cost', '15', 'management'],
            answer: `The Management quota fee for <b>Computer Science (CSE)</b> for the academic year 2026-27 is <b>15.0 Lakhs per annum</b>. It is payable via DD to "BMS Educational Trust".`
        },
        fees_aiml: {
            keywords: ['aiml', 'artificial', 'intelligence', 'machine', 'learning', 'fee', 'cost', '12.5'],
            answer: `The Management quota fee for <b>AI & ML</b> for the academic year 2026-27 is <b>12.5 Lakhs per annum</b>.`
        },
        fees_ece: {
            keywords: ['ece', 'electronics', 'communication', 'fee', 'cost', '9'],
            answer: `The Management quota fee for <b>Electronics & Communication (ECE)</b> for the academic year 2026-27 is <b>9.0 Lakhs per annum</b>.`
        },
        fees_core: {
            keywords: ['mechanical', 'civil', 'mech', 'core', 'fee', 'cost', '6'],
            answer: `The Management quota fee for <b>Mechanical or Civil Engineering</b> for the academic year 2026-27 is <b>6.0 Lakhs per annum</b>.`
        },
        eligibility: {
            keywords: ['eligible', 'marks', 'percentage', 'criteria', 'requirement', 'qualify', '12th', 'puc'],
            answer: `To qualify for B.E. programs, you need:<br>
                &bull; <b>General Merit:</b> Min. 45% in Physics, Maths & Optional subjects.<br>
                &bull; <b>SC/ST/OBC:</b> Min. 40% aggregate marks.<br>
                Entrance exams like <b>KEA (CET), COMED-K, or JEE</b> are mandatory.`
        },
        placements: {
            keywords: ['placement', 'job', 'package', 'company', 'recruit', 'salary', 'career', 'offer', 'dean', 'basavaraja'],
            answer: `BMSCE is a top-tier placement destination. We have <b>350+ reputed companies</b> visiting annually and <b>18,500+ cumulative offers</b> since 1995. The cell is led by <b>Dr. J. Sharana Basavaraja (Dean)</b>. Visit: <a href="placement-about.html" style="color:#00f2fe;font-weight:600;">Placements Portal</a>.`
        },
        founders: {
            keywords: ['founded', 'history', 'legacy', 'start', 'founder', 'sreenivasaiah', 'narayan', 'old', 'visionary', 'raja karya prasaktha'],
            answer: `BMSCE was founded in <b>1946</b> by <b>Late Sri. B. M. Sreenivasaiah</b> (awarded 'Raja Karya Prasaktha' by the Maharaja of Mysore). His son, <b>Late Sri. B. S. Narayan</b>, later expanded it into a global hub. It is the <b>first private engineering college in India</b>.`
        },
        research_nano: {
            keywords: ['research', 'patent', 'lab', 'innovat', 'nano', 'phd', 'cnd', 'display', 'liquid crystal', '2019', 'cleanroom'],
            answer: `The <b>B S Narayan Centre for Nano-Materials & Displays (CND)</b>, launched in 2019, is our premier research hub. It features a <b>Class-1000 Cleanroom</b>, LCD Labs, and focuses on display tech, liquid crystals, and battery fabrication. Explore: <a href="research-nano.html" style="color:#00f2fe;font-weight:600;">Nano Research</a>.`
        },
        group: {
            keywords: ['group', 'institution', 'bmsit', 'bmscl', 'bmssa', 'bmsca', 'women', 'law', 'architecture', 'degree', 'puc'],
            answer: `The BMS Group includes premier institutions:<br>
                &bull; <b>BMSIT:</b> Technology focus.<br>
                &bull; <b>BMSSA & BMSCA:</b> Schools of Architecture.<br>
                &bull; <b>BMSCL:</b> College of Law.<br>
                &bull; <b>BMSCW:</b> Degree college for Women.<br>
                Details: <a href="partner-institutions.html" style="color:#00f2fe;font-weight:600;">Group of Institutions</a>.`
        },
        facilities: {
            keywords: ['facility', 'hospital', 'hostel', 'library', 'data centre', 'gym', 'sports', 'counselling', 'medical', 'wifi', 'nvidia', 'dgx', '10 gbps'],
            answer: `BMSCE provides world-class infrastructure:<br>
                &bull; <b>Data Centre:</b> 10 Gbps backbone & NVIDIA DGX AI servers.<br>
                &bull; <b>Hospital:</b> B S Narayan Memorial (24/7 care).<br>
                &bull; <b>Library:</b> 1,00,000+ print volumes.<br>
                &bull; <b>Sports:</b> International stadium & Gym.<br>
                Explore: <a href="facilities.html" style="color:#00f2fe;font-weight:600;">Campus Facilities</a>.`
        },
        life: {
            keywords: ['life', 'club', 'student', 'extracurricular', 'activity', 'fest', 'utsav', 'phaseshift', 'culture', 'sports', 'augment ai', 'bullz racing'],
            answer: `Life here is electrifying with <b>30+ clubs</b> like Augment AI, Bullz Racing, and ACM. Our marquee fests are <b>Utsav</b> (Culture) and <b>Phase Shift</b> (Tech). Visit: <a href="life-at-bmsce.html" style="color:#00f2fe;font-weight:600;">Life at BMSCE</a>.`
        },
        contact: {
            keywords: ['contact', 'phone', 'email', 'call', 'reach', 'number', 'address', 'location', 'where', 'map', 'principal'],
            answer: `<b>Address:</b> Bull Temple Road, Basavanagudi, Bengaluru - 560019.<br>
                &bull; <b>Principal Office:</b> 080-26622130-35<br>
                &bull; <b>Admission Office:</b> 080-26611636<br>
                &bull; <b>Email:</b> info@bmsce.ac.in<br>
                Map: <a href="contact.html" style="color:#00f2fe;font-weight:600;">Contact Us</a>.`
        },
        governance: {
            keywords: ['governance', 'e-governance', 'online', 'portal', 'erp', 'it support', 'digital'],
            answer: `BMSCE uses advanced E-Governance systems for all administrative and academic operations. Our IT backbone supports seamless digital workflows for students and faculty. Read about: <a href="e-governance.html" style="color:#00f2fe;font-weight:600;">E-Governance Portal</a>.`
        }
    };

    /**
     * 🚀 TOKENIZED SEARCH ENGINE logic
     */
    const handleBotResponse = (userText) => {
        const lowerText = userText.toLowerCase();
        
        // Filter noise words
        const tokens = lowerText.split(/\s+/)
            .filter(t => t.length > 2)
            .filter(t => !['the', 'and', 'for', 'with', 'about', 'some', 'any', 'tell', 'show', 'give'].includes(t));

        let bestKey = null;
        let highestScore = 0;

        for (const key in SKI) {
            const data = SKI[key];
            let currentScore = 0;

            // Bigram/Keyword Cloud matching
            tokens.forEach(token => {
                data.keywords.forEach(kw => {
                    // Exact match or partial inclusion
                    if (kw === token) currentScore += 2;
                    else if (kw.includes(token)) currentScore += 0.5;
                });
            });

            if (currentScore > highestScore) {
                highestScore = currentScore;
                bestKey = key;
            }
        }

        let response = "";
        if (highestScore >= 1) {
            response = SKI[bestKey].answer;
        } else {
            // Intelligent Fallback
            response = "I couldn't find a direct answer to that, but here are the most requested topics I know about:<br><br>" +
                       "<button class='quick-btn' data-q='admissions'>Admissions</button> " +
                       "<button class='quick-btn' data-q='fees'>Fees Structure</button> " +
                       "<button class='quick-btn' data-q='placements'>Placements</button> " +
                       "<button class='quick-btn' data-q='research'>Research Labs</button>";
        }

        setTimeout(() => {
            addMessage(response, 'bot');
            // Attach event listeners to fallback buttons
            document.querySelectorAll('.quick-btn').forEach(btn => {
                btn.onclick = () => {
                    const q = btn.getAttribute('data-q');
                    addMessage(`Tell me about ${q}`, 'user');
                    handleBotResponse(q);
                };
            });
        }, 600);
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



