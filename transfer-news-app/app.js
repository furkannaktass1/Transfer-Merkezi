// Mock Data for RSS Feed / Database
const MOCK_DATA = [
  {
    id: "1",
    status: "Official",
    timestamp: "2 mins ago",
    player: {
      name: "Jude Bellingham",
      age: 20,
      position: "Midfielder",
      nationality: "England",
      headshot: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=200&auto=format&fit=crop"
    },
    clubs: {
      from: { name: "BVB", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
      to: { name: "RMA", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" }
    },
    headline: "Agreement Reached! Deal signed until 2029.",
    marketValue: "€120.00m",
    articleText: "Real Madrid and Borussia Dortmund have completed the final paperwork for the transfer. The player has successfully passed all medical examinations. Official presentation scheduled for next week at the Bernabeu. The total package includes add-ons that could make this one of the most expensive transfers in history."
  },
  {
    id: "2",
    status: "Medical",
    timestamp: "45 mins ago",
    player: {
      name: "Declan Rice",
      age: 24,
      position: "Defensive Midfield",
      nationality: "England",
      headshot: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&auto=format&fit=crop"
    },
    clubs: {
      from: { name: "WHU", logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg" },
      to: { name: "ARS", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" }
    },
    headline: "Medical tests ongoing in London.",
    marketValue: "€90.00m",
    articleText: "The player is currently undergoing the second part of his medical tests. Both clubs agreed on a record fee late last night. If everything goes as planned, the official announcement will be made within the next 24 hours."
  },
  {
    id: "3",
    status: "Rumor",
    timestamp: "2 hours ago",
    player: {
      name: "Kylian Mbappé",
      age: 25,
      position: "Forward",
      nationality: "France",
      headshot: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop"
    },
    clubs: {
      from: { name: "PSG", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
      to: { name: "RMA", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" }
    },
    headline: "Exclusive: Direct contact expected next week.",
    marketValue: "€180.00m",
    articleText: "Sources close to the player suggest that negotiations will resume soon. The club is preparing a massive contract offer. However, Paris remains confident they can convince the player to activate the one-year extension clause."
  }
];

const TRENDING_DATA = [
  {
    id: "t1",
    player: "Victor Osimhen",
    value: "€130M",
    tier: "Tier 1",
    headshot: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "t2",
    player: "Harry Kane",
    value: "€100M",
    tier: "Breaking",
    headshot: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "t3",
    player: "Josko Gvardiol",
    value: "€90M",
    tier: "Confirmed",
    headshot: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  }
];

// Utility: Create HTML from string
const htmlToElement = (html) => {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

// Render Functions
const renderNewsCard = (item) => {
  const statusClass = `status-${item.status.toLowerCase()}`;
  
  const cardHtml = `
    <article class="news-card" data-id="${item.id}">
      <div class="card-header">
        <div class="status-badge ${statusClass}">
          <span class="dot"></span>
          ${item.status}
        </div>
        <span class="timestamp">${item.timestamp}</span>
      </div>
      <div class="card-body">
        <div class="player-avatar">
          <img src="${item.player.headshot}" alt="${item.player.name}" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-headline">${item.headline}</h3>
          <div class="transfer-path">
            <img src="${item.clubs.from.logo}" alt="${item.clubs.from.name}" class="club-logo">
            <i class="fa-solid fa-arrow-right-long transfer-arrow"></i>
            <img src="${item.clubs.to.logo}" alt="${item.clubs.to.name}" class="club-logo">
          </div>
        </div>
      </div>
    </article>
  `;
  
  const card = htmlToElement(cardHtml);
  card.addEventListener('click', () => openModal(item));
  return card;
};

const renderTrendingCard = (item) => {
  const cardHtml = `
    <div class="trending-card">
      <div class="tier-badge">
        <i class="fa-solid fa-bolt"></i>
        ${item.tier}
      </div>
      <div class="trending-info">
        <img src="${item.headshot}" alt="${item.player}" class="trending-player-img" loading="lazy">
        <div class="trending-details">
          <h3>${item.player}</h3>
          <div class="trending-value">${item.value}</div>
        </div>
      </div>
    </div>
  `;
  return htmlToElement(cardHtml);
};

// DOM Elements
const newsFeedContainer = document.getElementById('news-feed');
const trendingCarouselContainer = document.getElementById('trending-carousel');
const modalOverlay = document.getElementById('player-modal');
const modalContent = document.querySelector('.modal-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const navItems = document.querySelectorAll('.nav-item');

// Init
const initApp = () => {
  // Render Feed
  renderFeed(MOCK_DATA);
  
  // Render Trending
  TRENDING_DATA.forEach(item => {
    trendingCarouselContainer.appendChild(renderTrendingCard(item));
  });

  // Setup Pull to Refresh
  setupPullToRefresh();
};

const renderFeed = (data) => {
  newsFeedContainer.innerHTML = '';
  data.forEach(item => {
    newsFeedContainer.appendChild(renderNewsCard(item));
  });
};

// Modal Logic
const openModal = (item) => {
  const statusClass = `status-${item.status.toLowerCase()}`;
  
  const modalHtml = `
    <button class="modal-close-btn" id="close-modal-btn">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="modal-handle"></div>
    
    <div class="modal-scrollable">
      <div class="modal-header-hero">
        <img src="${item.player.headshot}" alt="${item.player.name}" class="modal-player-img">
        <h2 class="modal-player-name">${item.player.name}</h2>
        <div class="status-badge ${statusClass} modal-status">
          <span class="dot"></span>
          ${item.status}
        </div>
      </div>
      
      <div class="modal-transfer-path">
        <div class="modal-club">
          <img src="${item.clubs.from.logo}" alt="${item.clubs.from.name}">
          <span>${item.clubs.from.name}</span>
        </div>
        <i class="fa-solid fa-arrow-right-arrow-left text-accent" style="font-size: 1.5rem;"></i>
        <div class="modal-club">
          <img src="${item.clubs.to.logo}" alt="${item.clubs.to.name}">
          <span>${item.clubs.to.name}</span>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <span class="stat-label">Age</span>
          <span class="stat-value">${item.player.age}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Position</span>
          <span class="stat-value">${item.player.position}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Nation</span>
          <span class="stat-value">${item.player.nationality}</span>
        </div>
      </div>

      <div class="market-value-box">
        <div>
          <div class="mv-label">Est. Market Value</div>
          <div class="mv-value">${item.marketValue}</div>
        </div>
        <i class="fa-solid fa-chart-line" style="font-size: 2rem; color: var(--accent-color); opacity: 0.5;"></i>
      </div>

      <div class="article-content">
        <p>${item.articleText}</p>
        <p><strong>Timeline:</strong> Updated ${item.timestamp}</p>
      </div>
    </div>
  `;
  
  modalContent.innerHTML = modalHtml;
  modalOverlay.classList.remove('hidden');
  
  document.getElementById('close-modal-btn').addEventListener('click', closeModal);
};

const closeModal = () => {
  modalOverlay.classList.add('hidden');
};

// Event Listeners for Overlay Click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Filter Logic
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterText = btn.textContent;
    if (filterText === 'All') {
      renderFeed(MOCK_DATA);
    } else {
      const filtered = MOCK_DATA.filter(item => item.status === filterText || (filterText === 'Rumors' && item.status === 'Rumor'));
      renderFeed(filtered);
    }
  });
});

// Navigation Logic
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    // Implement navigation behavior here
  });
});

// Pull to Refresh Logic
const setupPullToRefresh = () => {
  const mainScroll = document.getElementById('main-content');
  const ptrIndicator = document.querySelector('.pull-to-refresh');
  
  let startY = 0;
  let isPulling = false;
  
  mainScroll.addEventListener('touchstart', e => {
    if (mainScroll.scrollTop === 0) {
      startY = e.touches[0].clientY;
      isPulling = true;
    }
  }, { passive: true });
  
  mainScroll.addEventListener('touchmove', e => {
    if (!isPulling) return;
    const y = e.touches[0].clientY;
    const dy = y - startY;
    
    if (dy > 50 && mainScroll.scrollTop === 0) {
      ptrIndicator.classList.add('active');
    }
  }, { passive: true });
  
  mainScroll.addEventListener('touchend', () => {
    if (ptrIndicator.classList.contains('active')) {
      // Simulate fetch
      setTimeout(() => {
        ptrIndicator.classList.remove('active');
        // Shuffle data to simulate refresh
        const shuffled = [...MOCK_DATA].sort(() => 0.5 - Math.random());
        renderFeed(shuffled);
      }, 1500);
    }
    isPulling = false;
  });
};

// Boot
document.addEventListener('DOMContentLoaded', initApp);
