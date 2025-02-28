document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => card.style.transform = 'scale(1.05)');
        card.addEventListener('mouseout', () => card.style.transform = 'scale(1)');
    });

    const moneyRain = document.getElementById('money-rain');
    function createMoney() {
        const money = document.createElement('div');
        money.classList.add('money');
        money.textContent = '$';
        money.style.left = Math.random() * 100 + 'vw';
        money.style.animationDuration = Math.random() * 3 + 5 + 's';
        money.style.opacity = Math.random();
        money.style.fontSize = Math.random() * 20 + 12 + 'px';
        moneyRain.appendChild(money);
        setTimeout(() => money.remove(), 5000);
    }
    setInterval(createMoney, 100);

    window.addEventListener('load', () => document.body.classList.add('loaded'));

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });
    portfolioItems.forEach(item => observer.observe(item));

    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close');
    document.querySelectorAll('.portfolio-image').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
        });
    });
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});