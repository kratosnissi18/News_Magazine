/**
 * The Vanguard Chronicle - Core Application Controller
 * Handles editorial layout rendering, category filtering, search,
 * reader modal, bookmark persistence, dark/light theme, and micro-interactions.
 */

(function () {
  'use strict';

  // --- APPLICATION STATE ---
  const state = {
    activeCategory: 'all',
    currentTheme: localStorage.getItem('vanguard_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    savedBookmarks: JSON.parse(localStorage.getItem('vanguard_bookmarks') || '[]'),
    currentArticle: null,
    fontSizeMode: 'normal' // 'compact' | 'normal' | 'large'
  };

  // --- DOM CACHE ---
  const dom = {
    html: document.documentElement,
    liveDate: document.getElementById('live-date-display'),
    themeToggle: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    bookmarkBadge: document.getElementById('bookmark-counter-badge'),
    tickerTrack: document.getElementById('ticker-track'),
    navCategories: document.getElementById('nav-categories-list'),
    mobileNavToggle: document.getElementById('mobile-nav-toggle'),
    leadArticleContainer: document.getElementById('lead-article-container'),
    secondaryLeadContainer: document.getElementById('secondary-lead-container'),
    visualStripGrid: document.getElementById('visual-strip-grid'),
    featuredGrid: document.getElementById('featured-articles-grid'),
    featuredCategoryTitle: document.getElementById('featured-category-title'),
    latestStreamList: document.getElementById('latest-stream-list'),
    authorCardsGrid: document.getElementById('author-cards-grid'),
    trendingList: document.getElementById('trending-list-container'),
    marketList: document.getElementById('market-pulse-list'),
    tagsCloud: document.getElementById('tags-cloud-container'),
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterInput: document.getElementById('newsletter-email-input'),
    newsletterFeedback: document.getElementById('newsletter-feedback-msg'),
    modalOverlay: document.getElementById('article-reader-modal'),
    modalScrollArea: document.getElementById('modal-scroll-area'),
    modalProgressBar: document.getElementById('reader-progress-bar'),
    modalContent: document.getElementById('modal-article-render'),
    modalBookmarkBtn: document.getElementById('modal-bookmark-toggle-btn'),
    modalShareBtn: document.getElementById('modal-share-btn'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    fontCompactBtn: document.getElementById('font-compact-btn'),
    fontNormalBtn: document.getElementById('font-normal-btn'),
    fontLargeBtn: document.getElementById('font-large-btn'),
    drawerOverlay: document.getElementById('bookmarks-drawer-overlay'),
    drawerPanel: document.getElementById('bookmarks-drawer-panel'),
    drawerList: document.getElementById('bookmarks-drawer-list'),
    drawerCloseBtn: document.getElementById('drawer-close-btn'),
    drawerTriggerBtn: document.getElementById('drawer-trigger-btn'),
    searchOverlay: document.getElementById('search-overlay'),
    searchTriggerBtn: document.getElementById('search-trigger-btn'),
    searchInput: document.getElementById('search-input-field'),
    searchResults: document.getElementById('search-results-list'),
    searchCloseBtn: document.getElementById('search-close-btn'),
    toastContainer: document.getElementById('toast-container')
  };

  // --- UTILITIES ---
  function showToast(message, icon = '✦') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function getAuthor(authorId) {
    return window.NEWS_DATA?.authors?.[authorId] || {
      name: 'Vanguard Staff',
      role: 'Staff Reporter',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Reporting from the Vanguard international bureau.',
      credentials: 'Editorial Board'
    };
  }

  function getArticleById(id) {
    return window.NEWS_DATA?.articles?.find(a => a.id === id);
  }

  // --- THEME MANAGEMENT ---
  function applyTheme(theme) {
    state.currentTheme = theme;
    dom.html.setAttribute('data-theme', theme);
    localStorage.setItem('vanguard_theme', theme);
    if (dom.themeIcon) {
      dom.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function toggleTheme() {
    applyTheme(state.currentTheme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${state.currentTheme} mode`);
  }

  // --- LIVE DATE FORMATTER ---
  function initLiveDate() {
    if (!dom.liveDate) return;
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dom.liveDate.textContent = now.toLocaleDateString('en-US', options);
  }

  // --- BREAKING TICKER RENDERING ---
  function initBreakingTicker() {
    if (!dom.tickerTrack || !window.NEWS_DATA?.breakingNews) return;
    const items = window.NEWS_DATA.breakingNews;
    // Duplicate array to enable uninterrupted infinite looping animation
    const doubled = [...items, ...items];
    dom.tickerTrack.innerHTML = doubled.map(item => `
      <div class="ticker-item" data-ticker-id="${item.id}">
        <span class="ticker-tag">${item.category}</span>
        <span>${item.title}</span>
        <span style="opacity: 0.6; font-size: 0.7rem;">(${item.time})</span>
      </div>
    `).join('');

    dom.tickerTrack.querySelectorAll('.ticker-item').forEach(el => {
      el.addEventListener('click', () => {
        // Find corresponding article or open top headline
        const matched = window.NEWS_DATA.articles[0];
        if (matched) openReaderModal(matched);
      });
    });
  }

  // --- NAVIGATION & CATEGORY SWITCHING ---
  function initNavigation() {
    if (!dom.navCategories || !window.NEWS_DATA?.categories) return;

    dom.navCategories.innerHTML = window.NEWS_DATA.categories.map(cat => `
      <button class="nav-cat-btn ${cat.id === state.activeCategory ? 'active' : ''}" data-cat-id="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    dom.navCategories.querySelectorAll('.nav-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        setActiveCategory(catId);
      });
    });

    if (dom.mobileNavToggle) {
      dom.mobileNavToggle.addEventListener('click', () => {
        dom.navCategories.classList.toggle('mobile-open');
      });
    }
  }

  function setActiveCategory(catId) {
    state.activeCategory = catId;
    dom.navCategories.querySelectorAll('.nav-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat-id') === catId);
    });

    if (dom.featuredCategoryTitle) {
      const catObj = window.NEWS_DATA.categories.find(c => c.id === catId);
      dom.featuredCategoryTitle.textContent = catObj ? `${catObj.name}` : 'Curated Stories';
    }

    renderFeaturedArticles();
    renderLatestNewsStream();
  }

  // --- HERO EDITORIAL RENDERING ---
  function renderHeroSection() {
    const articles = window.NEWS_DATA?.articles || [];
    const lead = articles.find(a => a.featuredHero) || articles[0];
    const secondary = articles.filter(a => a.isSecondaryHero).slice(0, 2);

    // Lead headline card
    if (dom.leadArticleContainer && lead) {
      const author = getAuthor(lead.authorId);
      const isSaved = state.savedBookmarks.includes(lead.id);

      dom.leadArticleContainer.innerHTML = `
        <article class="lead-card" data-article-id="${lead.id}">
          <div class="lead-media-wrap">
            <img src="${lead.coverImage}" alt="${lead.title}" loading="lazy" />
          </div>
          <span class="badge-kicker">${lead.kicker || lead.category}</span>
          <h2 class="lead-title">${lead.title}</h2>
          <p class="lead-deck">${lead.deck}</p>
          <div class="article-byline">
            <div class="author-meta">
              <img class="author-avatar-sm" src="${author.avatar}" alt="${author.name}" />
              <div>
                <div class="author-name-text">${author.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${author.role}</div>
              </div>
            </div>
            <div class="article-read-metrics">
              <span>⏱ ${lead.readTime}</span>
              <button class="btn-bookmark-action ${isSaved ? 'saved' : ''}" data-bookmark-id="${lead.id}" title="Save story">
                ${isSaved ? '★' : '☆'}
              </button>
            </div>
          </div>
        </article>
      `;

      dom.leadArticleContainer.querySelector('.lead-card').addEventListener('click', (e) => {
        if (e.target.closest('.btn-bookmark-action')) {
          e.stopPropagation();
          toggleBookmark(lead.id);
          return;
        }
        openReaderModal(lead);
      });
    }

    // Secondary lead column
    if (dom.secondaryLeadContainer && secondary.length > 0) {
      dom.secondaryLeadContainer.innerHTML = secondary.map(art => {
        const author = getAuthor(art.authorId);
        const isSaved = state.savedBookmarks.includes(art.id);
        return `
          <article class="secondary-lead-card" data-article-id="${art.id}">
            <div class="secondary-lead-media">
              <img src="${art.coverImage}" alt="${art.title}" loading="lazy" />
            </div>
            <span class="badge-kicker">${art.kicker || art.category}</span>
            <h3 class="secondary-lead-title">${art.title}</h3>
            <p class="secondary-lead-deck">${art.deck}</p>
            <div class="article-byline">
              <span style="font-weight: 600; font-size: 0.78rem;">By ${author.name}</span>
              <div class="article-read-metrics">
                <span>${art.readTime}</span>
                <button class="btn-bookmark-action ${isSaved ? 'saved' : ''}" data-bookmark-id="${art.id}">
                  ${isSaved ? '★' : '☆'}
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');

      dom.secondaryLeadContainer.querySelectorAll('.secondary-lead-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const id = card.getAttribute('data-article-id');
          if (e.target.closest('.btn-bookmark-action')) {
            e.stopPropagation();
            toggleBookmark(id);
            return;
          }
          const art = getArticleById(id);
          if (art) openReaderModal(art);
        });
      });
    }
  }

  // --- VISUAL STRIP ("THE BIG PICTURE") ---
  function renderVisualStrip() {
    if (!dom.visualStripGrid || !window.NEWS_DATA?.articles) return;
    const visualStories = window.NEWS_DATA.articles.slice(3, 6);

    dom.visualStripGrid.innerHTML = visualStories.map(art => `
      <div class="visual-card" data-article-id="${art.id}">
        <img src="${art.coverImage}" alt="${art.title}" loading="lazy" />
        <div class="visual-card-overlay">
          <span class="visual-card-category">${art.category}</span>
          <h4 class="visual-card-title">${art.title}</h4>
        </div>
      </div>
    `).join('');

    dom.visualStripGrid.querySelectorAll('.visual-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-article-id');
        const art = getArticleById(id);
        if (art) openReaderModal(art);
      });
    });
  }

  // --- FEATURED ARTICLES GRID ---
  function renderFeaturedArticles() {
    if (!dom.featuredGrid || !window.NEWS_DATA?.articles) return;

    let articles = window.NEWS_DATA.articles;
    if (state.activeCategory !== 'all') {
      articles = articles.filter(a => a.category.toLowerCase() === state.activeCategory.toLowerCase());
    }

    if (articles.length === 0) {
      dom.featuredGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p>No featured stories currently available in this edition.</p>
        </div>
      `;
      return;
    }

    dom.featuredGrid.innerHTML = articles.map(art => {
      const author = getAuthor(art.authorId);
      const isSaved = state.savedBookmarks.includes(art.id);

      return `
        <article class="article-card" data-article-id="${art.id}">
          <div class="card-media">
            <span class="card-category-badge">${art.category}</span>
            <img src="${art.coverImage}" alt="${art.title}" loading="lazy" />
          </div>
          <div class="card-body">
            <span class="badge-kicker">${art.kicker || art.category}</span>
            <h3 class="card-title">${art.title}</h3>
            <p class="card-deck">${art.deck}</p>
            <div class="card-footer">
              <span style="font-weight: 600;">By ${author.name}</span>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="card-audio-pill">🎧 ${art.audioTime || '6m'}</span>
                <button class="btn-bookmark-action ${isSaved ? 'saved' : ''}" data-bookmark-id="${art.id}">
                  ${isSaved ? '★' : '☆'}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    dom.featuredGrid.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-article-id');
        if (e.target.closest('.btn-bookmark-action')) {
          e.stopPropagation();
          toggleBookmark(id);
          return;
        }
        const art = getArticleById(id);
        if (art) openReaderModal(art);
      });
    });
  }

  // --- LATEST NEWS STREAM (TIMELINE) ---
  function renderLatestNewsStream() {
    if (!dom.latestStreamList || !window.NEWS_DATA?.articles) return;

    let items = window.NEWS_DATA.articles;
    if (state.activeCategory !== 'all') {
      items = items.filter(a => a.category.toLowerCase() === state.activeCategory.toLowerCase());
    }

    dom.latestStreamList.innerHTML = items.map(item => {
      const author = getAuthor(item.authorId);
      return `
        <div class="stream-item" data-article-id="${item.id}">
          <div class="stream-time">${item.timeAgo}</div>
          <div class="stream-main">
            <span class="stream-category-tag">${item.category}</span>
            <h4 class="stream-title">${item.title}</h4>
            <div class="stream-author">Reported by ${author.name} · ${item.readTime}</div>
          </div>
          <img class="stream-thumbnail" src="${item.coverImage}" alt="${item.title}" loading="lazy" />
        </div>
      `;
    }).join('');

    dom.latestStreamList.querySelectorAll('.stream-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-article-id');
        const art = getArticleById(id);
        if (art) openReaderModal(art);
      });
    });
  }

  // --- AUTHOR CARDS SHOWCASE ---
  function renderAuthorShowcase() {
    if (!dom.authorCardsGrid || !window.NEWS_DATA?.authors) return;
    const authors = Object.values(window.NEWS_DATA.authors);

    dom.authorCardsGrid.innerHTML = authors.slice(0, 3).map(author => `
      <div class="author-card">
        <div class="author-portrait-wrap">
          <img class="author-card-avatar" src="${author.avatar}" alt="${author.name}" />
          <span class="author-verified-badge" title="Accredited Staff Reporter">✓</span>
        </div>
        <h4 class="author-card-name">${author.name}</h4>
        <span class="author-card-role">${author.role}</span>
        <p class="author-card-bio">${author.bio}</p>
        <div class="author-card-meta">
          <span>📰 ${author.articlesCount} Articles</span>
          <span>·</span>
          <span style="color: var(--accent-cobalt); font-weight: 700;">${author.twitter}</span>
        </div>
      </div>
    `).join('');
  }

  // --- SIDEBAR COMPONENTS ---
  function renderSidebar() {
    // 1. Trending rankings
    if (dom.trendingList && window.NEWS_DATA?.trendingRankings) {
      dom.trendingList.innerHTML = window.NEWS_DATA.trendingRankings.map(t => `
        <div class="trending-item" data-article-id="${t.id}">
          <span class="trending-number">${t.rank}</span>
          <div class="trending-item-content">
            <div class="trending-item-category">${t.category}</div>
            <h4 class="trending-item-title">${t.title}</h4>
            <div class="trending-item-meta">${t.views} · ${t.readTime}</div>
          </div>
        </div>
      `).join('');

      dom.trendingList.querySelectorAll('.trending-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-article-id');
          const art = getArticleById(id);
          if (art) openReaderModal(art);
        });
      });
    }

    // 2. Market pulse widget
    if (dom.marketList && window.NEWS_DATA?.markets) {
      dom.marketList.innerHTML = window.NEWS_DATA.markets.map(m => `
        <div class="market-row">
          <span style="font-weight: 700;">${m.symbol}</span>
          <span>${m.value}</span>
          <span class="stock-change ${m.positive ? 'positive' : 'negative'}">
            ${m.positive ? '▲' : '▼'} ${m.change}
          </span>
        </div>
      `).join('');
    }

    // 3. Tag cloud
    if (dom.tagsCloud && window.NEWS_DATA?.popularTags) {
      dom.tagsCloud.innerHTML = window.NEWS_DATA.popularTags.map(tag => `
        <span class="tag-pill" data-tag-name="${tag}">#${tag}</span>
      `).join('');

      dom.tagsCloud.querySelectorAll('.tag-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const tagName = pill.getAttribute('data-tag-name');
          openSearchWithQuery(tagName);
        });
      });
    }
  }

  // --- ARTICLE READER MODAL ---
  function openReaderModal(article) {
    if (!dom.modalOverlay || !article) return;
    state.currentArticle = article;
    const author = getAuthor(article.authorId);
    const isSaved = state.savedBookmarks.includes(article.id);

    // Update bookmark icon in modal bar
    updateModalBookmarkStatus(isSaved);

    // Reset progress bar & font size
    if (dom.modalProgressBar) dom.modalProgressBar.style.width = '0%';
    if (dom.modalScrollArea) dom.modalScrollArea.scrollTop = 0;

    // Render article contents
    const paragraphsHtml = (article.content || [article.deck]).map(p => `<p>${p}</p>`).join('');
    const tagsHtml = (article.tags || []).map(t => `<span class="tag-pill">#${t}</span>`).join('');

    dom.modalContent.innerHTML = `
      <div class="reader-header">
        <div class="reader-kicker">${article.kicker || article.category}</div>
        <h1 class="reader-title">${article.title}</h1>
        <p class="reader-deck">${article.deck}</p>
        <div class="reader-byline">
          <img class="reader-author-avatar" src="${author.avatar}" alt="${author.name}" />
          <div class="reader-author-info">
            <span class="reader-author-name">${author.name}</span>
            <span class="reader-author-role">${author.role} · ${article.date} · ${article.readTime}</span>
          </div>
        </div>
      </div>

      <figure class="reader-figure">
        <img src="${article.coverImage}" alt="${article.title}" />
        <figcaption class="reader-caption">${article.imageCaption || 'Photograph: Editorial Archives / The Vanguard'}</figcaption>
      </figure>

      <div class="reader-content-body size-${state.fontSizeMode}" id="reader-body-text">
        ${paragraphsHtml}

        <div class="reader-quote-callout">
          “The sovereign power of the twenty-first century belongs to interconnection: who controls the software, switching matrices, and long-range corridors.”
        </div>
      </div>

      <div class="reader-tags-container">
        ${tagsHtml}
      </div>

      <div class="reader-author-spotlight">
        <img src="${author.avatar}" alt="${author.name}" />
        <div>
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 0.2rem;">About the Author: ${author.name}</h4>
          <span style="font-size: 0.75rem; color: var(--accent-editorial); font-weight: 700;">${author.credentials}</span>
          <p class="reader-author-bio">${author.bio}</p>
        </div>
      </div>
    `;

    dom.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeReaderModal() {
    if (!dom.modalOverlay) return;
    dom.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    state.currentArticle = null;
  }

  function updateModalBookmarkStatus(isSaved) {
    if (!dom.modalBookmarkBtn) return;
    dom.modalBookmarkBtn.innerHTML = isSaved ? '★ Saved to Bookmarks' : '☆ Save Article';
    dom.modalBookmarkBtn.style.color = isSaved ? 'var(--accent-editorial)' : '';
  }

  function handleReadingProgress() {
    if (!dom.modalScrollArea || !dom.modalProgressBar) return;
    const { scrollTop, scrollHeight, clientHeight } = dom.modalScrollArea;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    dom.modalProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  function setFontSize(mode) {
    state.fontSizeMode = mode;
    const bodyText = document.getElementById('reader-body-text');
    if (bodyText) {
      bodyText.className = `reader-content-body size-${mode}`;
    }
    [dom.fontCompactBtn, dom.fontNormalBtn, dom.fontLargeBtn].forEach(btn => {
      if (btn) btn.style.borderColor = '';
    });
    if (mode === 'compact' && dom.fontCompactBtn) dom.fontCompactBtn.style.borderColor = 'var(--accent-editorial)';
    if (mode === 'normal' && dom.fontNormalBtn) dom.fontNormalBtn.style.borderColor = 'var(--accent-editorial)';
    if (mode === 'large' && dom.fontLargeBtn) dom.fontLargeBtn.style.borderColor = 'var(--accent-editorial)';
  }

  // --- BOOKMARKS LOGIC ---
  function toggleBookmark(articleId) {
    const index = state.savedBookmarks.indexOf(articleId);
    let isNowSaved = false;
    if (index > -1) {
      state.savedBookmarks.splice(index, 1);
      showToast('Article removed from your bookmarks');
    } else {
      state.savedBookmarks.push(articleId);
      isNowSaved = true;
      showToast('Article saved to your personal reading list', '★');
    }

    localStorage.setItem('vanguard_bookmarks', JSON.stringify(state.savedBookmarks));
    updateBookmarkUI();

    // If modal is open for this article, update its button
    if (state.currentArticle && state.currentArticle.id === articleId) {
      updateModalBookmarkStatus(isNowSaved);
    }
  }

  function updateBookmarkUI() {
    if (dom.bookmarkBadge) {
      dom.bookmarkBadge.textContent = state.savedBookmarks.length;
    }

    // Refresh all bookmark buttons in DOM
    document.querySelectorAll('.btn-bookmark-action').forEach(btn => {
      const id = btn.getAttribute('data-bookmark-id');
      const isSaved = state.savedBookmarks.includes(id);
      btn.classList.toggle('saved', isSaved);
      btn.innerHTML = isSaved ? '★' : '☆';
    });

    renderBookmarksDrawer();
  }

  function renderBookmarksDrawer() {
    if (!dom.drawerList) return;
    const savedIds = state.savedBookmarks;

    if (savedIds.length === 0) {
      dom.drawerList.innerHTML = `
        <div class="drawer-empty-state">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem; opacity: 0.5;">📖</div>
          <p style="font-weight: 600; margin-bottom: 0.25rem;">No saved stories yet</p>
          <span style="font-size: 0.78rem;">Click the star icon on any article to save it for offline reading.</span>
        </div>
      `;
      return;
    }

    dom.drawerList.innerHTML = savedIds.map(id => {
      const art = getArticleById(id);
      if (!art) return '';
      return `
        <div class="drawer-item" data-article-id="${art.id}">
          <img src="${art.coverImage}" alt="${art.title}" style="width: 60px; height: 50px; border-radius: 4px; object-fit: cover;" />
          <div style="flex: 1;">
            <div style="font-size: 0.6875rem; font-weight: 800; color: var(--accent-editorial); text-transform: uppercase;">${art.category}</div>
            <h5 class="drawer-item-title">${art.title}</h5>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${art.readTime}</div>
          </div>
          <button class="btn-remove-bookmark" data-remove-id="${art.id}" style="color: var(--text-muted); font-size: 1.1rem; padding: 0.25rem;" title="Remove">✕</button>
        </div>
      `;
    }).join('');

    dom.drawerList.querySelectorAll('.drawer-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-bookmark')) {
          e.stopPropagation();
          const removeId = e.target.closest('.btn-remove-bookmark').getAttribute('data-remove-id');
          toggleBookmark(removeId);
          return;
        }
        const id = item.getAttribute('data-article-id');
        const art = getArticleById(id);
        if (art) {
          closeBookmarksDrawer();
          openReaderModal(art);
        }
      });
    });
  }

  function openBookmarksDrawer() {
    renderBookmarksDrawer();
    dom.drawerOverlay.classList.add('active');
    dom.drawerPanel.classList.add('active');
  }

  function closeBookmarksDrawer() {
    dom.drawerOverlay.classList.remove('active');
    dom.drawerPanel.classList.remove('active');
  }

  // --- SEARCH SYSTEM ---
  function openSearchWithQuery(initialQuery = '') {
    dom.searchOverlay.classList.add('active');
    dom.searchInput.value = initialQuery;
    dom.searchInput.focus();
    executeSearch(initialQuery);
  }

  function closeSearch() {
    dom.searchOverlay.classList.remove('active');
    dom.searchInput.value = '';
    dom.searchResults.innerHTML = '';
  }

  function executeSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      dom.searchResults.innerHTML = '<div style="padding: 1rem; color: var(--text-muted); text-align: center; font-size: 0.85rem;">Type to search all news, topics, and authors...</div>';
      return;
    }

    const matches = (window.NEWS_DATA?.articles || []).filter(a => {
      const author = getAuthor(a.authorId);
      return (
        a.title.toLowerCase().includes(q) ||
        a.deck.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        author.name.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      );
    });

    if (matches.length === 0) {
      dom.searchResults.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching stories found for "${query}".</div>`;
      return;
    }

    dom.searchResults.innerHTML = matches.map(m => `
      <div class="search-result-item" data-article-id="${m.id}">
        <span class="search-result-cat">${m.category} · ${m.readTime}</span>
        <h5 class="search-result-title">${m.title}</h5>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">By ${getAuthor(m.authorId).name}</div>
      </div>
    `).join('');

    dom.searchResults.querySelectorAll('.search-result-item').forEach(res => {
      res.addEventListener('click', () => {
        const id = res.getAttribute('data-article-id');
        const art = getArticleById(id);
        if (art) {
          closeSearch();
          openReaderModal(art);
        }
      });
    });
  }

  // --- NEWSLETTER SUBSCRIPTION ---
  function initNewsletter() {
    if (!dom.newsletterForm) return;

    dom.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = dom.newsletterInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        dom.newsletterInput.focus();
        return;
      }

      const submitBtn = dom.newsletterForm.querySelector('.btn-newsletter-submit');
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Subscribed ✓';
        submitBtn.style.backgroundColor = 'var(--accent-emerald)';
        dom.newsletterFeedback.className = 'newsletter-feedback success';
        dom.newsletterFeedback.textContent = 'Welcome! You will receive the Morning Dispatch daily at 6:00 AM.';
        dom.newsletterInput.value = '';
        showToast('Successfully subscribed to The Morning Dispatch!', '✉');
      }, 700);
    });
  }

  // --- EVENT LISTENERS INITIALIZATION ---
  function bindGlobalEvents() {
    // Theme toggle
    if (dom.themeToggle) {
      dom.themeToggle.addEventListener('click', toggleTheme);
    }

    // Modal controls
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.addEventListener('click', closeReaderModal);
    }
    if (dom.modalOverlay) {
      dom.modalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.modalOverlay) closeReaderModal();
      });
    }
    if (dom.modalScrollArea) {
      dom.modalScrollArea.addEventListener('scroll', handleReadingProgress);
    }

    // Font size adjusters
    if (dom.fontCompactBtn) dom.fontCompactBtn.addEventListener('click', () => setFontSize('compact'));
    if (dom.fontNormalBtn) dom.fontNormalBtn.addEventListener('click', () => setFontSize('normal'));
    if (dom.fontLargeBtn) dom.fontLargeBtn.addEventListener('click', () => setFontSize('large'));

    // Modal bookmark button
    if (dom.modalBookmarkBtn) {
      dom.modalBookmarkBtn.addEventListener('click', () => {
        if (state.currentArticle) {
          toggleBookmark(state.currentArticle.id);
        }
      });
    }

    // Modal Share Button
    if (dom.modalShareBtn) {
      dom.modalShareBtn.addEventListener('click', () => {
        if (!state.currentArticle) return;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('Article link copied to clipboard!', '🔗');
        } else {
          showToast('Link ready to share!');
        }
      });
    }

    // Bookmarks Drawer
    if (dom.drawerTriggerBtn) dom.drawerTriggerBtn.addEventListener('click', openBookmarksDrawer);
    if (dom.drawerCloseBtn) dom.drawerCloseBtn.addEventListener('click', closeBookmarksDrawer);
    if (dom.drawerOverlay) {
      dom.drawerOverlay.addEventListener('click', (e) => {
        if (e.target === dom.drawerOverlay) closeBookmarksDrawer();
      });
    }

    // Search overlay
    if (dom.searchTriggerBtn) dom.searchTriggerBtn.addEventListener('click', () => openSearchWithQuery(''));
    if (dom.searchCloseBtn) dom.searchCloseBtn.addEventListener('click', closeSearch);
    if (dom.searchOverlay) {
      dom.searchOverlay.addEventListener('click', (e) => {
        if (e.target === dom.searchOverlay) closeSearch();
      });
    }
    if (dom.searchInput) {
      let debounceTimeout;
      dom.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => executeSearch(e.target.value), 180);
      });
    }

    // Global Keyboard Shortcuts (Escape to close, Ctrl/Cmd + K for search)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeReaderModal();
        closeBookmarksDrawer();
        closeSearch();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchWithQuery('');
      }
    });
  }

  // --- BOOTSTRAP ---
  function init() {
    applyTheme(state.currentTheme);
    initLiveDate();
    initBreakingTicker();
    initNavigation();
    renderHeroSection();
    renderVisualStrip();
    renderFeaturedArticles();
    renderLatestNewsStream();
    renderAuthorShowcase();
    renderSidebar();
    updateBookmarkUI();
    initNewsletter();
    bindGlobalEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
