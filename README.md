# The Vanguard Chronicle — News & Magazine Web Experience

> **Architected with 10+ Years of Senior UI/UX & Web Development Craftsmanship**  
> An editorial news and magazine website combining classic print newspaper aesthetics with modern digital web interactions.

---

## 🌟 Key Features & Architecture

### 1. Headline Stories & Hero Section
- **Lead Hero Headline Story**: High-impact editorial photography, category kicker, responsive title, deck, full byline with author avatar, estimated read time, and quick-save bookmark button.
- **Secondary Lead Column**: Dual-story complementary column providing balanced visual weight.
- **"The Big Picture" Visual Photojournalism Strip**: 3-card curated photography dispatches with gradient overlays and category badges.

### 2. News Categories & Live Filtering
- **Sticky Navigation Bar**: Instant filtering by categories:
  - `World`
  - `Technology`
  - `Business`
  - `Culture`
  - `Science`
  - `Opinion`
  - `Lifestyle`
- Smooth client-side re-rendering of the **Featured Articles Grid** and **Latest News Stream** without full page reloads.

### 3. Featured Articles Grid
- 3-column responsive card layout with image zoom on hover.
- Badges for category, audio listening time (`🎧 8m`), and bookmarking.
- Author credit line and truncated excerpt.

### 4. Latest News & Wire Stream
- Chronological timeline stream with relative timestamps (`22m ago`, `1h ago`).
- Category tags and author credits.
- High-density layout suited for fast scanning of breaking developments.

### 5. Author Information & Newsroom Showcase
- Dedicated **Senior Correspondents & Columnists** showcase.
- Profile cards with high-res avatars, verified editorial badge, title/beat, credentials (e.g. *PhD in International Relations, LSE*), article count, and social handle.
- Full author bio inside each article reader modal.

### 6. Comprehensive Sidebar Section
- **Trending Stories**: Numbered top 5 (`01`–`05`) ranked articles with read counts and categories.
- **The Morning Dispatch**: Newsletter subscription card with input validation, animated loading state, and toast confirmation.
- **Market Pulse**: Real-time ticker for financial indices (`S&P 500`, `NASDAQ`, `BTC/USD`, `Brent Crude`) with positive/negative indicators.
- **Editor's Note / Columnist Quote**: Stylized pull-quote highlighting editorial independence.
- **Topics in Focus (Tag Cloud)**: Interactive hashtag pills that trigger instant search.

### 7. Interactive Article Reader Modal
- **Distraction-Free Reading Mode**: Clicking any article opens an overlay modal.
- **Dynamic Reading Progress Bar**: Real-time scroll indicator tracking reading completion.
- **Font Size Resizer**: Adjust typography between `Compact (A-)`, `Default (A)`, and `Large (A+)`.
- **Editorial Typography**: Styled drop-cap on the opening paragraph, blockquotes, and image captions.
- **In-Article Bookmarking & Social Share**: One-click link copying to clipboard with toast notification.

### 8. Bookmarks System & Global Search
- **Persistent Reading List**: Saved articles stored in browser `localStorage`.
- **Slide-Over Bookmarks Drawer**: Manage and remove saved articles directly.
- **Instant Search Modal**: Search across article titles, decks, categories, tags, and author names (`Cmd/Ctrl + K` or search button).

### 9. Dark & Light Theme Architecture
- CSS custom properties (design tokens) for light paper mode (`#fcfbf9`) and dark graphite mode (`#0e1117`).
- Smooth transitions and automatic preference detection with manual toggle.

---

## 📂 File Structure

```
BOYYYY/
├── index.html          # Semantic HTML5 editorial layout
├── css/
│   └── style.css       # Complete modern CSS design system, typography, grid, dark mode
├── js/
│   ├── news-data.js    # Editorial article dataset, author profiles, market metrics
│   └── app.js          # App controller: ticker, theme, filters, bookmarks, reader modal, search
└── README.md           # Documentation and user guide
```

---

## 🚀 How to Run the Website

### Option 1: Double-click to open
Simply double-click `index.html` in Windows Explorer. It runs directly in any modern web browser (Edge, Chrome, Firefox, Brave, Safari) without any build step required.

### Option 2: Run a local development server
You can also launch a lightweight local server via PowerShell:
```powershell
python -m http.server 8000
```
Then open your browser at:
```
http://localhost:8000
```

---

## ⌨️ Keyboard Shortcuts
- `Ctrl + K` or `Cmd + K`: Open Global Search
- `Esc`: Close open modal, bookmarks drawer, or search overlay
