/* ApexDev GitHub Analytics Controller
   Integrates live GitHub API lookups with deterministic local mockups
   and draws an interactive custom SVG Donut Chart from scratch. */

class GithubController {
    constructor() {
        this.profile = null;
        this.repos = [];
        this.activeLanguageFilter = null;
        
        this.initElements();
        this.setupEventListeners();
        this.loadDemoProfile(); // Start with our gorgeous demo on load
    }

    initElements() {
        // Forms & Inputs
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('search-input');
        this.demoBtn = document.getElementById('demo-btn');
        
        // Profile Info UI
        this.userAvatar = document.getElementById('user-avatar');
        this.userName = document.getElementById('user-name');
        this.userLogin = document.getElementById('user-login');
        this.userBio = document.getElementById('user-bio');
        this.userFollowers = document.getElementById('user-followers');
        this.userFollowing = document.getElementById('user-following');
        this.userLocation = document.getElementById('user-location');
        this.userBlog = document.getElementById('user-blog');
        this.userJoined = document.getElementById('user-joined');
        
        // API Stats & Connectivity
        this.apiStatusText = document.getElementById('api-status-text');
        this.statusDot = document.querySelector('.status-dot');
        
        // KPI Indicators
        this.kpiStars = document.getElementById('kpi-stars');
        this.kpiForks = document.getElementById('kpi-forks');
        this.kpiRepos = document.getElementById('kpi-repos');
        this.kpiRatio = document.getElementById('kpi-ratio');
        
        // Chart Elements
        this.chartSlices = document.getElementById('chart-slices');
        this.chartInnerVal = document.getElementById('chart-inner-val');
        this.chartLegend = document.getElementById('chart-legend');
        
        // Repo Filters
        this.repoSearch = document.getElementById('repo-search');
        this.repoLangFilter = document.getElementById('repo-lang-filter');
        this.repoSort = document.getElementById('repo-sort');
        this.repoGrid = document.getElementById('repo-grid');
        this.activeFilterIndicator = document.getElementById('active-filter-indicator');
        this.activeLangTag = document.getElementById('active-lang-tag');
        this.clearLangFilterBtn = document.getElementById('clear-lang-filter-btn');
        
        // Toast Container
        this.toastContainer = document.getElementById('toast-container');
    }

    setupEventListeners() {
        // Search Form Submit
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = this.searchInput.value.trim();
            if (username) {
                this.performSearch(username);
                this.searchInput.value = '';
            }
        });

        // Load Demo click
        this.demoBtn.addEventListener('click', () => {
            this.loadDemoProfile();
        });

        // Repo real-time filtering inputs
        this.repoSearch.addEventListener('input', () => this.filterAndRenderRepos());
        this.repoLangFilter.addEventListener('change', () => {
            this.activeLanguageFilter = this.repoLangFilter.value === 'all' ? null : this.repoLangFilter.value;
            this.syncLanguageFilterUI();
            this.filterAndRenderRepos();
        });
        
        this.repoSort.addEventListener('change', () => this.filterAndRenderRepos());

        // Clear active chart language filter tag click
        this.clearLangFilterBtn.addEventListener('click', () => {
            this.activeLanguageFilter = null;
            this.syncLanguageFilterUI();
            this.filterAndRenderRepos();
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const emoji = type === 'success' ? '⚡' : '⚠️';
        toast.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Connects to live public GitHub API
    async performSearch(username) {
        this.showToast(`Contacting GitHub API for @${username}...`);
        
        try {
            // Fetch User Profile info
            const profileRes = await fetch(`https://api.github.com/users/${username}`);
            if (profileRes.status === 403) {
                throw new Error('GitHub API rate limit exceeded. Please try again later or view Demo.');
            }
            if (profileRes.status === 404) {
                throw new Error(`Username @${username} not found on GitHub.`);
            }
            if (!profileRes.ok) {
                throw new Error('Failed to query profile details.');
            }
            const profileData = await profileRes.json();
            
            // Fetch User public Repositories list
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
            if (!reposRes.ok) {
                throw new Error('Failed to query repositories.');
            }
            const reposData = await reposRes.json();
            
            // Format & Store
            this.profile = this.formatProfile(profileData);
            this.repos = this.formatRepos(reposData);
            
            // Update UI status to Live
            this.apiStatusText.textContent = 'Live GitHub API Active';
            this.statusDot.className = 'status-dot live';
            document.documentElement.style.setProperty('--active-accent', 'var(--color-cyan)');
            document.documentElement.style.setProperty('--active-accent-rgb', 'var(--color-cyan-rgb)');
            
            this.activeLanguageFilter = null;
            this.buildLanguageFilterDropdown();
            this.syncLanguageFilterUI();
            this.renderDashboard();
            this.showToast(`Analyzed live details for @${username}!`, 'success');
            
        } catch (err) {
            console.error(err);
            this.showToast(err.message, 'error');
            
            // If search fails, reload the gorgeous demo profile so the screen isn't empty
            if (username.toLowerCase() !== 'aiden') {
                this.showToast('Reverting to simulated dashboard...', 'error');
                this.loadDemoProfile();
            }
        }
    }

    formatProfile(data) {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const joinedDate = new Date(data.created_at).toLocaleDateString('en-US', dateOptions);
        
        return {
            avatar: data.avatar_url,
            name: data.name || data.login,
            login: data.login,
            bio: data.bio || 'This developer has not filled out a GitHub biography yet.',
            followers: data.followers,
            following: data.following,
            location: data.location || 'Distributed / Remote',
            blog: data.blog || 'Not specified',
            joined: joinedDate
        };
    }

    formatRepos(data) {
        return data.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description || 'No description provided.',
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            size: repo.size, // in KB
            updated: new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        }));
    }

    // Pre-populates a highly professional, visually impressive developer portfolio mockup
    loadDemoProfile() {
        this.profile = {
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
            name: 'Aiden PostGrad',
            login: 'aiden-dev-portfolio',
            bio: 'Post-Grad Full Stack & Ambient Web UI Engineer. Passionate about particle physics web animations, micro-frontends, and highly responsive user dashboards.',
            followers: 148,
            following: 92,
            location: 'Boston, Massachusetts',
            blog: 'https://aiden-dev.github.io',
            joined: 'September 14, 2022'
        };

        // 12 beautiful, highly detailed simulated repositories
        this.repos = [
            {
                name: 'lumina-weather-explorer',
                url: '#',
                description: 'A breathtaking, ultra-premium ambient weather dashboard. Integrates HTML5 Canvas custom particle systems (rain, snow, storm lightnings) with fluid HSL gradient shifts.',
                language: 'JavaScript',
                stars: 184,
                forks: 42,
                size: 2450,
                updated: 'May 28, 2026'
            },
            {
                name: 'apexdev-github-analytics',
                url: '#',
                description: 'A premium space-black profile metrics dashboard with custom-drawn, animated, and responsive SVG donut charts built entirely in pure ES6 JavaScript.',
                language: 'JavaScript',
                stars: 125,
                forks: 18,
                size: 1890,
                updated: 'May 29, 2026'
            },
            {
                name: 'aether-agent-orchestrator',
                url: '#',
                description: 'Autonomous AI multi-agent collaborative workspace. Visualizes active agent message networks and cost telemetry using dynamic CSS grid structures.',
                language: 'TypeScript',
                stars: 96,
                forks: 24,
                size: 4200,
                updated: 'Apr 18, 2026'
            },
            {
                name: 'modern-web-animation-system',
                url: '#',
                description: 'A lightweight CSS keyframe injector and canvas manager tailored for fluid hover glows, glassmorphism filters, and smooth 60fps transitions.',
                language: 'CSS',
                stars: 88,
                forks: 12,
                size: 850,
                updated: 'May 12, 2026'
            },
            {
                name: 'biopath-cellular-simulation',
                url: '#',
                description: 'WebGL biological modeler simulating protein folding behaviors under arbitrary environment temperatures. Fully responsive viewport scale handlers.',
                language: 'Python',
                stars: 64,
                forks: 14,
                size: 8400,
                updated: 'Mar 02, 2026'
            },
            {
                name: 'postgres-dataconnect-sync',
                url: '#',
                description: 'A secure, localized GraphQL resolver mapping custom SQL triggers onto real-time WebSocket state broadcasters.',
                language: 'TypeScript',
                stars: 52,
                forks: 8,
                size: 3100,
                updated: 'Feb 15, 2026'
            },
            {
                name: 'react-frosted-toast-banners',
                url: '#',
                description: 'Reusable notifications queue with frosted glass effects and spring-physics entry slide animations.',
                language: 'HTML',
                stars: 38,
                forks: 5,
                size: 420,
                updated: 'Jan 28, 2026'
            },
            {
                name: 'chembl-molecular-crossref',
                url: '#',
                description: 'A scientific search portal mapping chemical compound IDs against clinical trials safety ratings dynamically.',
                language: 'Python',
                stars: 32,
                forks: 6,
                size: 2150,
                updated: 'Dec 14, 2025'
            },
            {
                name: 'portfolio-v2-main',
                url: '#',
                description: 'My main personal development hub showing experience timelines and beautiful retro-modern design system variables.',
                language: 'HTML',
                stars: 28,
                forks: 3,
                size: 1100,
                updated: 'Dec 02, 2025'
            },
            {
                name: 'dbsnp-variant-parser',
                url: '#',
                description: 'Quick local script parsing dense NCBI genomic coordinates and returning HGVS variant mappings in clean tables.',
                language: 'Python',
                stars: 14,
                forks: 2,
                size: 820,
                updated: 'Nov 12, 2025'
            }
        ];

        // Reset status back to Simulated
        this.apiStatusText.textContent = 'Simulated Sandbox Active';
        this.statusDot.className = 'status-dot simulated';
        document.documentElement.style.setProperty('--active-accent', 'var(--color-violet)');
        document.documentElement.style.setProperty('--active-accent-rgb', 'var(--color-violet-rgb)');
        
        this.activeLanguageFilter = null;
        this.buildLanguageFilterDropdown();
        this.syncLanguageFilterUI();
        this.renderDashboard();
        
        this.showToast('Loaded active demo profile! Feel free to search any real user.', 'success');
    }

    buildLanguageFilterDropdown() {
        const languages = new Set();
        this.repos.forEach(r => {
            if (r.language && r.language !== 'Unknown') {
                languages.add(r.language);
            }
        });

        // Preserve "All Languages" and populate others
        this.repoLangFilter.innerHTML = '<option value="all">All Languages</option>';
        Array.from(languages).sort().forEach(lang => {
            const opt = document.createElement('option');
            opt.value = lang;
            opt.textContent = lang;
            this.repoLangFilter.appendChild(opt);
        });
    }

    syncLanguageFilterUI() {
        if (this.activeLanguageFilter) {
            this.repoLangFilter.value = this.activeLanguageFilter;
            this.activeLangTag.textContent = this.activeLanguageFilter;
            this.activeFilterIndicator.classList.remove('hidden');
        } else {
            this.repoLangFilter.value = 'all';
            this.activeFilterIndicator.classList.add('hidden');
        }
        
        // Highlight active items in our chart legend
        const legendItems = this.chartLegend.querySelectorAll('.legend-item');
        legendItems.forEach(item => {
            if (item.dataset.lang === this.activeLanguageFilter) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    renderDashboard() {
        this.renderProfile();
        this.renderKPIs();
        this.renderLanguageChart();
        this.filterAndRenderRepos();
    }

    renderProfile() {
        this.userAvatar.src = this.profile.avatar;
        this.userName.textContent = this.profile.name;
        this.userLogin.textContent = `@${this.profile.login}`;
        this.userLogin.href = `https://github.com/${this.profile.login}`;
        this.userBio.textContent = this.profile.bio;
        this.userFollowers.textContent = this.profile.followers;
        this.userFollowing.textContent = this.profile.following;
        
        this.userLocation.textContent = this.profile.location;
        this.userBlog.textContent = this.profile.blog === 'Not specified' ? 'None' : this.profile.blog;
        if (this.profile.blog !== 'Not specified') {
            this.userBlog.href = this.profile.blog.startsWith('http') ? this.profile.blog : `https://${this.profile.blog}`;
            this.userBlog.classList.remove('disabled');
        } else {
            this.userBlog.removeAttribute('href');
            this.userBlog.classList.add('disabled');
        }
        this.userJoined.textContent = `Joined ${this.profile.joined}`;
    }

    renderKPIs() {
        const totalStars = this.repos.reduce((acc, r) => acc + r.stars, 0);
        const totalForks = this.repos.reduce((acc, r) => acc + r.forks, 0);
        const totalRepos = this.repos.length;
        const ratio = totalRepos > 0 ? (totalStars / totalRepos).toFixed(1) : '0.0';

        this.kpiStars.textContent = totalStars;
        this.kpiForks.textContent = totalForks;
        this.kpiRepos.textContent = totalRepos;
        this.kpiRatio.textContent = ratio;
    }

    // High performance responsive SVG Donut chart engine
    renderLanguageChart() {
        this.chartSlices.innerHTML = '';
        
        // Aggregate language repo totals
        const counts = {};
        let totalValids = 0;
        
        this.repos.forEach(r => {
            if (r.language && r.language !== 'Unknown') {
                counts[r.language] = (counts[r.language] || 0) + 1;
                totalValids++;
            }
        });

        if (totalValids === 0) {
            // Draw empty state
            this.chartInnerVal.textContent = 'None';
            this.chartLegend.innerHTML = '<div class="empty-state">No repository language data available.</div>';
            return;
        }

        // Language aesthetic color mappings
        const langColors = {
            'JavaScript': 'hsl(38, 100%, 55%)',
            'TypeScript': 'hsl(190, 100%, 45%)',
            'Python': 'hsl(262, 100%, 65%)',
            'HTML': 'hsl(12, 100%, 55%)',
            'CSS': 'hsl(276, 100%, 60%)',
            'Java': 'hsl(16, 70%, 50%)',
            'C++': 'hsl(350, 70%, 50%)',
            'C#': 'hsl(120, 40%, 45%)',
            'Go': 'hsl(180, 70%, 45%)',
            'Rust': 'hsl(28, 60%, 45%)',
            'Ruby': 'hsl(355, 60%, 40%)'
        };

        const fallbackColors = [
            'hsl(150, 100%, 45%)',
            'hsl(210, 100%, 50%)',
            'hsl(330, 100%, 55%)',
            'hsl(290, 100%, 45%)',
            'hsl(60, 100%, 45%)'
        ];

        // Format data & sort by percentage weight
        let idx = 0;
        const data = Object.keys(counts).map(name => {
            const count = counts[name];
            const pct = ((count / totalValids) * 100);
            const color = langColors[name] || fallbackColors[idx++ % fallbackColors.length];
            return { name, count, pct, color };
        }).sort((a, b) => b.pct - a.pct);

        // Core SVG Math: Radius = 70, Circumference C = 439.82
        const r = 70;
        const C = 2 * Math.PI * r;
        let accumulatedPercent = 0;

        data.forEach(item => {
            const slice = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            slice.setAttribute('cx', '100');
            slice.setAttribute('cy', '100');
            slice.setAttribute('r', r.toString());
            slice.classList.add('chart-slice');
            slice.style.stroke = item.color;
            
            // Set dash circumference and offset
            slice.style.strokeDasharray = C.toFixed(2);
            
            const offset = C - (C * item.pct) / 100;
            slice.style.strokeDashoffset = offset.toFixed(2);
            
            // Rotate each circle segment starting from 12 o'clock (-90 degrees)
            const rotation = -90 + (accumulatedPercent * 3.6);
            slice.setAttribute('transform', `rotate(${rotation.toFixed(2)}, 100, 100)`);
            
            // Event listeners
            slice.addEventListener('mouseover', () => {
                this.chartInnerVal.textContent = `${item.pct.toFixed(0)}%`;
                this.chartInnerVal.style.fill = item.color;
            });

            slice.addEventListener('mouseout', () => {
                this.chartInnerVal.textContent = 'Stats';
                this.chartInnerVal.style.fill = 'var(--text-primary)';
            });

            slice.addEventListener('click', () => {
                this.activeLanguageFilter = this.activeLanguageFilter === item.name ? null : item.name;
                this.syncLanguageFilterUI();
                this.filterAndRenderRepos();
            });

            this.chartSlices.appendChild(slice);
            accumulatedPercent += item.pct;
        });

        // Set center hole default label
        this.chartInnerVal.textContent = 'Stats';

        // Render Legend list items
        this.chartLegend.innerHTML = '';
        data.forEach(item => {
            const leg = document.createElement('div');
            leg.className = 'legend-item';
            leg.dataset.lang = item.name;
            leg.innerHTML = `
                <span class="legend-dot" style="background-color: ${item.color};"></span>
                <div class="legend-details">
                    <span class="legend-name">${item.name}</span>
                    <span class="legend-pct">${item.pct.toFixed(1)}% (${item.count})</span>
                </div>
            `;

            leg.addEventListener('click', () => {
                this.activeLanguageFilter = this.activeLanguageFilter === item.name ? null : item.name;
                this.syncLanguageFilterUI();
                this.filterAndRenderRepos();
            });

            this.chartLegend.appendChild(leg);
        });
    }

    // Repository search, language filters, and sorting coordinators
    filterAndRenderRepos() {
        this.repoGrid.innerHTML = '';
        
        const searchQuery = this.repoSearch.value.trim().toLowerCase();
        const sortType = this.repoSort.value;
        
        // Filter elements
        let filtered = this.repos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchQuery) || 
                                  repo.description.toLowerCase().includes(searchQuery);
            const matchesLang = !this.activeLanguageFilter || 
                                repo.language.toLowerCase() === this.activeLanguageFilter.toLowerCase();
            return matchesSearch && matchesLang;
        });

        // Sort elements
        filtered.sort((a, b) => {
            switch(sortType) {
                case 'stars': return b.stars - a.stars;
                case 'forks': return b.forks - a.forks;
                case 'size': return b.size - a.size;
                case 'name': return a.name.localeCompare(b.name);
                default: return 0;
            }
        });

        // Display results
        if (filtered.length === 0) {
            this.repoGrid.innerHTML = '<div class="empty-state" style="grid-column: span 2; padding: 40px 0;">No matching repositories found.</div>';
            return;
        }

        const langColors = {
            'JavaScript': 'hsl(38, 100%, 55%)',
            'TypeScript': 'hsl(190, 100%, 45%)',
            'Python': 'hsl(262, 100%, 65%)',
            'HTML': 'hsl(12, 100%, 55%)',
            'CSS': 'hsl(276, 100%, 60%)',
            'Java': 'hsl(16, 70%, 50%)',
            'C++': 'hsl(350, 70%, 50%)'
        };

        filtered.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            
            const langDotColor = langColors[repo.language] || 'hsl(200, 10%, 40%)';
            const sizeFormatted = repo.size > 1024 ? `${(repo.size / 1024).toFixed(1)} MB` : `${repo.size} KB`;

            card.innerHTML = `
                <div class="repo-card-top">
                    <h3>${repo.name}</h3>
                    <p class="repo-desc">${repo.description}</p>
                </div>
                <div class="repo-card-bottom">
                    <span class="repo-lang">
                        <span class="repo-lang-dot" style="background-color: ${langDotColor};"></span>
                        <span>${repo.language}</span>
                    </span>
                    <div class="repo-metrics">
                        <span class="repo-metric-item" title="Stars">⭐ ${repo.stars}</span>
                        <span class="repo-metric-item" title="Forks">🍴 ${repo.forks}</span>
                        <span class="repo-metric-item" title="Code Size">💾 ${sizeFormatted}</span>
                    </div>
                </div>
            `;
            
            // Clicking card navigates to real repo if not a demo hash url
            card.addEventListener('click', () => {
                if (repo.url !== '#') {
                    window.open(repo.url, '_blank');
                } else {
                    this.showToast(`Simulated repository click: ${repo.name}`);
                }
            });

            this.repoGrid.appendChild(card);
        });
    }
}

// Spin up application on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.githubController = new GithubController();
});
