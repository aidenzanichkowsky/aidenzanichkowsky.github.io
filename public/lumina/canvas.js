/* Lumina Generative Weather Canvas Engine
   Designed for silky smooth 60fps requestAnimationFrame animations,
   high-performance physics, and automatic high-DPI scaling. */

class WeatherCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.particles = [];
        this.weatherType = 'clear'; // clear, rain, snow, storm, clouds
        this.animationFrameId = null;
        this.lightningTimer = 0;
        this.lightningFlash = 0; // opacity of lightning flash overlay
        
        this.init();
        this.setupEvents();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    resizeCanvas() {
        // High-DPI screen sharpener
        const dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        
        this.ctx.scale(dpr, dpr);
    }

    // Set dynamic root color accents and themes based on weather state
    updateColorTheme(type) {
        const root = document.documentElement;
        switch(type) {
            case 'clear':
                root.style.setProperty('--active-accent', 'var(--accent-amber)');
                root.style.setProperty('--active-accent-rgb', 'var(--accent-amber-rgb)');
                root.style.setProperty('--panel-bg', 'rgba(13, 14, 20, 0.45)');
                break;
            case 'clouds':
                root.style.setProperty('--active-accent', 'var(--text-secondary)');
                root.style.setProperty('--active-accent-rgb', '200, 200, 200');
                root.style.setProperty('--panel-bg', 'rgba(15, 18, 26, 0.5)');
                break;
            case 'rain':
                root.style.setProperty('--active-accent', 'var(--accent-blue)');
                root.style.setProperty('--active-accent-rgb', 'var(--accent-blue-rgb)');
                root.style.setProperty('--panel-bg', 'rgba(10, 14, 24, 0.48)');
                break;
            case 'storm':
                root.style.setProperty('--active-accent', 'var(--accent-purple)');
                root.style.setProperty('--active-accent-rgb', 'var(--accent-purple-rgb)');
                root.style.setProperty('--panel-bg', 'rgba(10, 10, 20, 0.55)');
                break;
            case 'snow':
                root.style.setProperty('--active-accent', 'hsl(200, 100%, 80%)');
                root.style.setProperty('--active-accent-rgb', '200, 230, 255');
                root.style.setProperty('--panel-bg', 'rgba(15, 20, 30, 0.45)');
                break;
        }
    }

    transitionTo(type) {
        if (this.weatherType === type) return;
        this.weatherType = type;
        this.updateColorTheme(type);
        
        // Dynamic fade transition for existing particles
        let fadeOut = setInterval(() => {
            this.particles.forEach(p => p.alpha = Math.max(0, p.alpha - 0.05));
            
            // Once faded, reset to new particles
            if (this.particles.every(p => p.alpha === 0)) {
                clearInterval(fadeOut);
                this.createParticles();
            }
        }, 30);
    }

    createParticles() {
        this.particles = [];
        const count = this.getParticleCount();

        for (let i = 0; i < count; i++) {
            this.particles.push(this.spawnParticle(true));
        }
    }

    getParticleCount() {
        // Density based on screensize
        const area = (this.width * this.height) / 10000;
        switch(this.weatherType) {
            case 'clear': return Math.min(6, Math.floor(area * 0.05));
            case 'clouds': return Math.min(8, Math.floor(area * 0.06));
            case 'rain': return Math.min(180, Math.floor(area * 1.5));
            case 'storm': return Math.min(220, Math.floor(area * 1.8));
            case 'snow': return Math.min(120, Math.floor(area * 1.2));
            default: return 50;
        }
    }

    spawnParticle(initRandomY = false) {
        const startY = initRandomY ? Math.random() * this.height : -20;
        
        switch(this.weatherType) {
            case 'clear':
                // Solar flares/auras drifting slowly
                return {
                    type: 'solar',
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    radius: Math.random() * 80 + 120,
                    alpha: Math.random() * 0.15 + 0.05,
                    maxAlpha: Math.random() * 0.2 + 0.05,
                    scaleStep: Math.random() * 0.005 + 0.002,
                    scaleTime: Math.random() * 100
                };
            case 'clouds':
                // Amorphous drifting dark glass blobs
                return {
                    type: 'cloud',
                    x: Math.random() * (this.width + 200) - 100,
                    y: Math.random() * this.height * 0.6,
                    vx: Math.random() * 0.2 + 0.08,
                    vy: (Math.random() - 0.5) * 0.05,
                    radius: Math.random() * 100 + 150,
                    alpha: Math.random() * 0.12 + 0.03,
                    maxAlpha: Math.random() * 0.15 + 0.05
                };
            case 'rain':
                // Speedy streaks that drop down
                return {
                    type: 'rain',
                    x: Math.random() * this.width,
                    y: startY,
                    length: Math.random() * 15 + 20,
                    vy: Math.random() * 8 + 12,
                    vx: -1.5, // slightly angled rain
                    alpha: Math.random() * 0.4 + 0.1,
                    weight: Math.random() * 1.5 + 0.5
                };
            case 'storm':
                // Aggressive diagonal streaks
                return {
                    type: 'storm-rain',
                    x: Math.random() * (this.width + 100),
                    y: startY,
                    length: Math.random() * 20 + 25,
                    vy: Math.random() * 14 + 18,
                    vx: -3.5, // heavily wind-swept
                    alpha: Math.random() * 0.5 + 0.2,
                    weight: Math.random() * 2 + 0.8
                };
            case 'snow':
                // Drifting crystals oscillating via sine wave
                return {
                    type: 'snow',
                    x: Math.random() * this.width,
                    y: startY,
                    radius: Math.random() * 2.5 + 1.2,
                    vy: Math.random() * 0.6 + 0.5,
                    alpha: Math.random() * 0.6 + 0.2,
                    oscillationSpeed: Math.random() * 0.015 + 0.005,
                    oscillationRange: Math.random() * 25 + 15,
                    angle: Math.random() * Math.PI * 2
                };
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update lighting parameters for storms
        if (this.weatherType === 'storm') {
            this.lightningTimer--;
            if (this.lightningTimer <= 0) {
                // Trigger flash roughly every 5-10 seconds
                this.lightningTimer = Math.floor(Math.random() * 300) + 200;
                this.lightningFlash = 0.95; // full brightness spike
            }
            if (this.lightningFlash > 0) {
                this.lightningFlash -= 0.08; // fade out fast
            }
        }

        // Draw lightning sky overlay
        if (this.lightningFlash > 0 && this.weatherType === 'storm') {
            this.ctx.fillStyle = `rgba(168, 85, 247, ${this.lightningFlash * 0.12})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        // Particle calculations & draws
        this.particles.forEach((p, idx) => {
            switch (p.type) {
                case 'solar':
                    p.x += p.vx;
                    p.y += p.vy;
                    p.scaleTime += p.scaleStep;
                    
                    // Pulsating pulse radius
                    const pulseRadius = p.radius + Math.sin(p.scaleTime) * 30;
                    
                    // Reset bounce boundary checks
                    if (p.x < -p.radius) p.x = this.width + p.radius;
                    if (p.x > this.width + p.radius) p.x = -p.radius;
                    if (p.y < -p.radius) p.y = this.height + p.radius;
                    if (p.y > this.height + p.radius) p.y = -p.radius;

                    // Draw solar blobs with soft gradients
                    const solarGrad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRadius);
                    solarGrad.addColorStop(0, `rgba(255, 162, 0, ${p.alpha * 0.35})`);
                    solarGrad.addColorStop(0.5, `rgba(255, 200, 80, ${p.alpha * 0.15})`);
                    solarGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    
                    this.ctx.fillStyle = solarGrad;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;

                case 'cloud':
                    p.x += p.vx;
                    p.y += p.vy;

                    // Bounce back boundaries
                    if (p.x > this.width + p.radius) {
                        p.x = -p.radius - 50;
                        p.y = Math.random() * this.height * 0.6;
                    }

                    const cloudGrad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                    cloudGrad.addColorStop(0, `rgba(40, 50, 75, ${p.alpha * 0.4})`);
                    cloudGrad.addColorStop(0.6, `rgba(30, 36, 54, ${p.alpha * 0.15})`);
                    cloudGrad.addColorStop(1, 'rgba(30, 36, 54, 0)');

                    this.ctx.fillStyle = cloudGrad;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;

                case 'rain':
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.y > this.height + 20 || p.x < -20) {
                        this.particles[idx] = this.spawnParticle();
                    }

                    this.ctx.strokeStyle = `rgba(0, 242, 254, ${p.alpha})`;
                    this.ctx.lineWidth = p.weight;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p.x + p.vx, p.y + p.length);
                    this.ctx.stroke();
                    break;

                case 'storm-rain':
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.y > this.height + 20 || p.x < -20) {
                        this.particles[idx] = this.spawnParticle();
                    }

                    // Add dynamic lightning sparks
                    const sparkGlow = this.lightningFlash > 0.4 ? 0.35 : 0;
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${p.alpha + sparkGlow})`;
                    this.ctx.lineWidth = p.weight;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p.x + p.vx, p.y + p.length);
                    this.ctx.stroke();
                    break;

                case 'snow':
                    p.x += Math.sin(p.angle) * 0.25;
                    p.y += p.vy;
                    p.angle += p.oscillationSpeed;

                    if (p.y > this.height + 10) {
                        this.particles[idx] = this.spawnParticle();
                    }

                    this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
            }
        });
    }

    start() {
        const loop = () => {
            this.update();
            this.animationFrameId = requestAnimationFrame(loop);
        };
        this.animationFrameId = requestAnimationFrame(loop);
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// Initial global instance bind
document.addEventListener('DOMContentLoaded', () => {
    window.weatherCanvas = new WeatherCanvas('weather-canvas');
    window.weatherCanvas.start();
});
