// Mobile menu
    const hambtn = document.getElementById('hambtn');
    const mobileMenuContainer = document.getElementById('mobileMenuContainer');
    hambtn?.addEventListener('click', ()=> {
      mobileMenuContainer.classList.toggle('open');
    });

    // Smooth scroll for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href === '#') return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile menu
          if(mobileMenuContainer.classList.contains('open')) {
            mobileMenuContainer.classList.remove('open');
          }
        }
      });
    });

    // Countdown
    const countdownEl = document.getElementById('countdown');
    // event date: 24 Oct 2025 10:00 local time
    const eventDate = new Date('2025-10-24T10:00:00');
    function updateCountdown(){
      const now = new Date();
      const diff = eventDate - now;
      if(diff <= 0){ countdownEl.innerText = 'O evento começou!'; return; }
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdownEl.innerText = `${d}d ${h}h ${m}m ${s}s`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
    }, {threshold: 0.12});
    reveals.forEach(r => io.observe(r));

    // Gallery lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    document.querySelectorAll('#galeria img').forEach(imgElement=>{
      imgElement.addEventListener('click', () => {
      lbImg.src = imgElement.src; // usa sempre a imagem clicada
      lb.classList.remove('hidden');
      lb.classList.add('lb-open');
      document.body.style.overflow = 'hidden';
});
    });
    document.getElementById('lbClose').addEventListener('click', closeLB);
    lb.addEventListener('click', (e) => { if(e.target === lb) closeLB(); });
    function closeLB(){ lb.classList.add('hidden'); lb.classList.remove('lb-open'); lbImg.src=''; document.body.style.overflow = ''; }

    // Contact form (demo) - replace with EmailJS or backend later
    function handleContact(e){
      e.preventDefault();
      const f = new FormData(e.target);
      const name = f.get('name');
      const email = f.get('email');
      const message = f.get('message');
      alert('Mensagem recebida — obrigado, ' + name + '. (Demo)\nEmail: ' + email);
      e.target.reset();
    }

    // Back to top
    const toTop = document.getElementById('toTop');
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400) toTop.style.display = 'block';
      else toTop.style.display = 'none';
    });
    toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

    // Accessibility: keyboard close lightbox
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && !lb.classList.contains('hidden')) closeLB();
    });

    // Button hover effect
    document.querySelectorAll('.btn-hover').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        if(this.getAttribute('href') === '#programacao') {
          this.style.backgroundColor = 'var(--orange)';
          this.style.color = '#080808';
        }
      });
      btn.addEventListener('mouseleave', function() {
        if(this.getAttribute('href') === '#programacao') {
          this.style.backgroundColor = '';
          this.style.color = '';
        }
      });
    });

    // === MINI DRAGON BALL PARTICLES ===
  const canvas = document.getElementById("particles-bg");
  const ctx = canvas.getContext("2d");
  let particlesArray;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, "#ffb347");
      gradient.addColorStop(1, "#ff7a00");

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#ff7a00";
      ctx.fill();

      // add star (one per few particles)
      if (Math.random() < 0.02) {
        ctx.fillStyle = "#ffeb00";
        ctx.font = `${this.size * 1.3}px Orbitron`;
        ctx.fillText("★", this.x - this.size / 2, this.y + this.size / 2);
      }
    }
  }

  function initParticles() {
    particlesArray = [];
    const numParticles = window.innerWidth < 600 ? 20 : 50;
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 0.3;
      const speedY = (Math.random() - 0.5) * 0.3;
      particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particlesArray) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });
