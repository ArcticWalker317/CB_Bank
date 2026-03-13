/* ═══════════════════════════════════════
   ᴄʙ BANK — APP
═══════════════════════════════════════ */

/* ─────────────────────────────────────
   SETUP: GitHub Gist as database

   1. Go to github.com → Settings → Developer settings
      → Personal access tokens → Tokens (classic)
      → Generate new token → check ONLY "gist" scope
      Copy the token (starts with ghp_...)

   2. Go to gist.github.com → New gist
      - Filename: cbbank-data.json
      - Content: paste the JSON from DEFAULT_DATA below
      - Set to "Secret" gist → Create gist
      Copy the Gist ID from the URL
      (the long hash after your username, e.g. /username/abc123def456...)

   3. Fill in GIST_ID and GITHUB_TOKEN below.

   The token only has "gist" scope — if it ever leaks,
   no other GitHub data is at risk.
───────────────────────────────────── */
//THE GIST TOKEN EXPIRATION DATE IS 10/13/2026
// config.js (gitignored) can override these via window.CB_CONFIG
const CONFIG = {
  GIST_ID:       (window.CB_CONFIG || {}).GIST_ID       || '',
  GITHUB_TOKEN:  (window.CB_CONFIG || {}).GITHUB_TOKEN   || '',
  GIST_FILENAME: 'cbbank-data.json',
};

/* ─────────────────────────────────────
   DEFAULT DATA
   Paste this into your Gist on first setup.
   After that, the app manages it automatically.
───────────────────────────────────── */

const DEFAULT_DATA = {
  members: [
    { id:  1, name: 'Andrew',   initials: 'AN', balance: 47, color: '#FF6B35' },
    { id:  2, name: 'Kasra',    initials: 'KS', balance: 23, color: '#A78BFA' },
    { id:  3, name: 'Kate',     initials: 'KE', balance: 10, color: '#FF6B9D' },
    { id:  4, name: 'Caroline', initials: 'CA', balance: 61, color: '#F472B6' },
    { id:  5, name: 'Kayla',    initials: 'KY', balance: 10, color: '#C084FC' },
    { id:  6, name: 'Tyler',    initials: 'TY', balance: 29, color: '#FB923C' },
    { id:  7, name: 'Kit',      initials: 'KT', balance: 18, color: '#4ADE80' },
    { id:  8, name: 'Das',      initials: 'DA', balance: 35, color: '#FCD34D' },
    { id:  9, name: 'Owen',     initials: 'OW', balance: 10, color: '#34D399' },
    { id: 10, name: 'Grant',    initials: 'GR', balance: 10, color: '#60A5FA' },
    { id: 11, name: 'Kaley',    initials: 'KL', balance: 10, color: '#F59E0B' },
    { id: 12, name: 'Nora',     initials: 'NO', balance: 42, color: '#22D3EE' },
  ],
  feed: [
    { id:  1, from:  2, to:  1,    amount: 5,  desc: '1:1 concert',                    type: 'offering', time: '2h ago'  },
    { id:  2, from:  4, to:  7,    amount: 10, desc: 'custom bracelet',                 type: 'offering', time: '3h ago'  },
    { id:  3, from: null, to: 1,   amount: 20, desc: "Quest: got a stranger's number",  type: 'quest',    time: '5h ago'  },
    { id:  4, from:  1, to:  2,    amount: 4,  desc: 'portrait photoshoot',             type: 'offering', time: '1d ago'  },
    { id:  5, from:  8, to: null,  amount: 3,  desc: 'Veto power — picked restaurant',  type: 'system',   time: '1d ago'  },
    { id:  6, from: null, to: 4,   amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '2d ago'  },
    { id:  7, from:  1, to: null,  amount: 5,  desc: 'Immunity from dare',              type: 'system',   time: '3d ago'  },
    { id:  8, from:  2, to:  4,    amount: 2,  desc: 'psychic reading',                 type: 'offering', time: '3d ago'  },
    { id:  9, from:  7, to: 12,    amount: 5,  desc: 'custom poem',                     type: 'offering', time: '4d ago'  },
    { id: 10, from: null, to: 7,   amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '5d ago'  },
    { id: 11, from: 12, to:  1,    amount: 5,  desc: 'Spotlight hype 🔦',               type: 'system',   time: '6d ago'  },
    { id: 12, from:  6, to:  8,    amount: 15, desc: 'lost the Nora bet',               type: 'bet',      time: '1w ago'  },
    { id: 13, from: null, to:  3,  amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '1w ago'  },
    { id: 14, from: null, to:  5,  amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '1w ago'  },
    { id: 15, from: null, to:  9,  amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '1w ago'  },
    { id: 16, from: null, to: 10,  amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '1w ago'  },
    { id: 17, from: null, to: 11,  amount: 10, desc: 'Sign-up bonus 🎉',                type: 'bonus',    time: '1w ago'  },
  ],
  marketplace: {
    bounty: [
      { id: 'b1', postedBy: 3, title: 'Make me laugh until I cry',   reward: 8,  status: 'open',    time: '1h ago'  },
      { id: 'b2', postedBy: 5, title: 'Edit my highlight reel',       reward: 12, status: 'open',    time: '4h ago'  },
      { id: 'b3', postedBy: 7, title: 'Teach me to cook one dish',    reward: 6,  status: 'claimed', claimedBy: 4, time: '1d ago' },
      { id: 'b4', postedBy: 2, title: 'Find me a good book to read',  reward: 4,  status: 'open',    time: '2d ago'  },
    ],
    quest: [
      { id: 'q1', postedBy: 1, title: "First to get a stranger's number tonight", reward: 20, status: 'live', deadline: '11:59 PM tonight', time: '5h ago' },
      { id: 'q2', postedBy: 2, title: 'Best meme about the group',                 reward: 10, status: 'live', deadline: 'Sunday midnight',  time: '1d ago' },
      { id: 'q3', postedBy: 6, title: 'Most steps logged this week',               reward: 8,  status: 'live', deadline: 'Sunday midnight',  time: '2d ago' },
    ],
    bet: [
      { id: 'bet1', from: 1, to: 2, title: "Tyler shows up late to the next hangout", amount: 5,  status: 'open', adjudicator: 3, time: '2d ago' },
      { id: 'bet2', from: 4, to: 6, title: "Nora gets a new job by April",             amount: 15, status: 'open', adjudicator: 1, time: '3d ago' },
      { id: 'bet3', from: 5, to: 7, title: "Das tries sushi before summer",            amount: 8,  status: 'open', adjudicator: 2, time: '5d ago' },
    ],
    offering: [
      { id: 'o1',  by: 1, title: '1:1 concert experience',       price: 5,  status: 'available', time: '1w ago' },
      { id: 'o2',  by: 2, title: 'Portrait photoshoot',           price: 4,  status: 'available', time: '1w ago' },
      { id: 'o3',  by: 2, title: 'Custom poem',                   price: 5,  status: 'available', time: '1w ago' },
      { id: 'o4',  by: 3, title: 'Therapy session',               price: 5,  status: 'available', time: '1w ago' },
      { id: 'o5',  by: 3, title: 'Psychic reading',               price: 2,  status: 'available', time: '1w ago' },
      { id: 'o6',  by: 4, title: 'Custom bracelet or necklace',   price: 10, status: 'available', time: '1w ago' },
      { id: 'o7',  by: 4, title: 'Handmade poem',                 price: 5,  status: 'available', time: '1w ago' },
      { id: 'o8',  by: 4, title: 'Custom keychain',               price: 5,  status: 'available', time: '1w ago' },
      { id: 'o9',  by: 5, title: 'Ride anywhere in the city',     price: 50, status: 'available', time: '1w ago' },
      { id: 'o10', by: 6, title: 'Ride anywhere in the city',     price: 50, status: 'available', time: '1w ago' },
      { id: 'o11', by: 7, title: 'Ride anywhere in the city',     price: 50, status: 'available', time: '1w ago' },
    ],
  },
  balanceHistory: {
     1: [32, 28, 40, 35, 44, 42, 47],
     2: [10, 15, 12, 20, 18, 23, 23],
     3: [10, 10, 10, 10, 10, 10, 10],
     4: [40, 45, 50, 55, 58, 60, 61],
     5: [10, 10, 10, 10, 10, 10, 10],
     6: [15, 20, 25, 28, 30, 29, 29],
     7: [10, 10, 15, 12, 18, 18, 18],
     8: [20, 25, 30, 28, 32, 35, 35],
     9: [10, 10, 10, 10, 10, 10, 10],
    10: [10, 10, 10, 10, 10, 10, 10],
    11: [10, 10, 10, 10, 10, 10, 10],
    12: [30, 35, 38, 40, 42, 42, 42],
  },
};

/* ─────────────────────────────────────
   MUTABLE STATE
───────────────────────────────────── */

let ME      = null;                                          // logged-in member id
let appData = JSON.parse(JSON.stringify(DEFAULT_DATA));     // live data (deep clone of defaults)

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */

const BANK  = { name: 'Bank',  initials: 'ᴄʙ',  color: '#F5C542' };
const ADMIN_ID = 0; // special id — not in members array
const isAdmin  = () => ME === ADMIN_ID;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TYPE_META = {
  bounty:   { label: 'Bounties',  emoji: '🎯', desc: 'Complete a task, earn ᴄʙ',      cls: 'type-bounty'   },
  quest:    { label: 'Quests',    emoji: '⚡', desc: 'Time-limited group challenges',  cls: 'type-quest'    },
  bet:      { label: 'Bets',      emoji: '🎲', desc: 'Put ᴄʙ on the line',            cls: 'type-bet'      },
  offering: { label: 'Offerings', emoji: '🎁', desc: 'Services for sale by members',  cls: 'type-offering' },
};

const state = {
  tab:     'feed',
  mktView: 'home',
  mktType: null,
};

/* ─────────────────────────────────────
   COOKIE HELPERS
───────────────────────────────────── */

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/* ─────────────────────────────────────
   GIST DATA STORE
───────────────────────────────────── */

function isValidData(d) {
  return d && Array.isArray(d.members) && d.members.length > 0
      && Array.isArray(d.feed)
      && d.marketplace && typeof d.marketplace === 'object';
}

async function loadFromGist() {
  // No Gist configured — try localStorage cache, then fall back to defaults
  if (!CONFIG.GIST_ID) {
    const cached = localStorage.getItem('cbbank-cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (isValidData(parsed)) appData = parsed;
      } catch (_) {}
    }
    return;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(`https://api.github.com/gists/${CONFIG.GIST_ID}`, {
      signal: controller.signal,
      headers: {
        Authorization: `token ${CONFIG.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const gist = await res.json();
    const raw  = gist.files[CONFIG.GIST_FILENAME]?.content;
    if (!raw) throw new Error('file not found in gist');

    const parsed = JSON.parse(raw);
    if (!isValidData(parsed)) throw new Error('gist data missing required fields');

    appData = parsed;
    localStorage.setItem('cbbank-cache', raw); // update offline cache
  } catch (err) {
    console.warn('Gist load failed, trying local cache:', err);
    const cached = localStorage.getItem('cbbank-cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (isValidData(parsed)) appData = parsed;
      } catch (_) {}
    }
    // Otherwise appData stays as DEFAULT_DATA (always valid)
  }
}

async function saveToGist() {
  const raw = JSON.stringify(appData, null, 2);
  localStorage.setItem('cbbank-cache', raw); // always persist locally first

  if (!CONFIG.GIST_ID || !CONFIG.GITHUB_TOKEN) return;

  try {
    await fetch(`https://api.github.com/gists/${CONFIG.GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${CONFIG.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        files: { [CONFIG.GIST_FILENAME]: { content: raw } },
      }),
    });
  } catch (err) {
    console.warn('Gist save failed (data is saved locally):', err);
    showToast('Saved locally — will sync when back online');
  }
}

/* ─────────────────────────────────────
   AUTH
───────────────────────────────────── */

function showLoginScreen() {
  const grid = document.getElementById('login-member-grid');

  grid.innerHTML = appData.members.map(m => `
    <button class="login-member-card" data-id="${m.id}">
      <div class="login-avatar" style="background:${m.color}">${m.initials}</div>
      <div class="login-name">${m.name}</div>
    </button>
  `).join('') + `
    <button class="login-admin-card" data-id="${ADMIN_ID}">
      <div class="login-admin-icon">🏦</div>
      <div class="login-admin-label">Bank Admin</div>
      <div class="login-admin-sub">manage · monitor · mint</div>
    </button>
  `;

  function doLogin(id) {
    setCookie('cbbank_me', id, 365);
    ME = id;
    const loginEl = document.getElementById('screen-login');
    loginEl.classList.add('fade-out');
    setTimeout(() => {
      loginEl.classList.add('hidden');
      loginEl.classList.remove('fade-out');
      document.getElementById('app').classList.remove('hidden');
      renderAll();
    }, 340);
  }

  grid.querySelectorAll('.login-member-card, .login-admin-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      if (id === ADMIN_ID) {
        const pw = prompt('Enter admin password:');
        if (pw !== 'WeAre67') { showToast('Wrong password'); return; }
      }
      doLogin(id);
    });
  });

  document.getElementById('screen-login').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function signOut() {
  deleteCookie('cbbank_me');
  ME = null;
  state.tab     = 'feed';
  state.mktView = 'home';
  state.mktType = null;

  // Reset tab UI
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-feed').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.querySelector('.nav-item[data-tab="feed"]').classList.add('active');

  showLoginScreen();
}

/* ─────────────────────────────────────
   UTILS
───────────────────────────────────── */

function getMember(id) {
  return appData.members.find(m => m.id === id) || BANK;
}

function avatarDiv(member, size = 36) {
  const m  = typeof member === 'number' ? getMember(member) : member;
  const fs = Math.floor(size * 0.32);
  return `<div class="feed-avatar" style="background:${m.color};width:${size}px;height:${size}px;font-size:${fs}px">${m.initials}</div>`;
}

function miniAvatarDiv(member) {
  const m = typeof member === 'number' ? getMember(member) : member;
  return `<div class="mini-avatar" style="background:${m.color}">${m.initials}</div>`;
}

function cbNum(n, sign = '') {
  return `${sign}${n} <span class="cb-mark" style="font-size:0.75em">ᴄʙ</span>`;
}

function renderAll() {
  renderMembersStrip();
  renderFeed();
  renderMarketGrid();
  renderProfile();
  // Swap feed header button for admin
  const sendBtn = document.getElementById('btnSend');
  if (sendBtn) {
    sendBtn.textContent = isAdmin() ? 'Mint ᴄʙ' : 'Send ᴄʙ';
  }
}

/* ─────────────────────────────────────
   FEED
───────────────────────────────────── */

function renderMembersStrip() {
  const sorted = [...appData.members].sort((a, b) => b.balance - a.balance);
  document.getElementById('members-strip').innerHTML = sorted.map(m => {
    const isMe = m.id === ME;
    return `
      <div class="member-card ${isMe ? 'is-me' : ''}">
        <div class="member-avatar" style="background:${m.color}">${m.initials}</div>
        <div>
          <div class="member-name">${isMe ? 'You' : m.name}</div>
          <div class="member-balance">${m.balance} ᴄʙ</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderFeed() {
  const BADGE = {
    offering: 'badge-offering', quest:  'badge-quest',  bet:    'badge-bet',
    bonus:    'badge-bonus',    system: 'badge-system', bounty: 'badge-bounty',
  };

  document.getElementById('feed-list').innerHTML = appData.feed.map((item, i) => {
    const fromM  = item.from ? getMember(item.from) : BANK;
    const toM    = item.to   ? getMember(item.to)   : BANK;
    const isMe   = item.from === ME || item.to === ME;
    const sign   = item.to === ME ? '+' : (item.from === ME ? '-' : '');
    const amtCls = item.to === ME ? '' : (item.from === ME ? 'negative' : 'neutral');
    return `
      <div class="feed-card ${isMe ? 'highlight' : ''}" style="animation-delay:${i * 0.04}s">
        <div class="feed-card-top">
          <div class="feed-avatars">
            ${avatarDiv(fromM, 32)}
            <div class="feed-arrow">→</div>
            ${avatarDiv(toM, 32)}
          </div>
          <div class="feed-amount ${amtCls}">${cbNum(item.amount, sign)}</div>
        </div>
        <div class="feed-body">
          <div class="feed-desc">${item.desc}</div>
          <div class="feed-meta">
            <span class="type-badge ${BADGE[item.type] || 'badge-system'}">${item.type}</span>
            <span class="feed-meta-names">${fromM.name} → ${toM.name}</span>
            <span class="feed-meta-time">${item.time}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ─────────────────────────────────────
   MARKETPLACE
───────────────────────────────────── */

function renderMarketGrid() {
  document.getElementById('mkt-grid').innerHTML = Object.keys(TYPE_META).map((type, i) => {
    const meta  = TYPE_META[type];
    const count = appData.marketplace[type]?.length ?? 0;
    return `
      <div class="mkt-type-card ${meta.cls}" data-type="${type}" style="animation-delay:${i * 0.08}s">
        <div class="mkt-count">${count}</div>
        <div class="mkt-type-icon">${meta.emoji}</div>
        <div class="mkt-type-name">${meta.label}</div>
        <div class="mkt-type-desc">${meta.desc}</div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.mkt-type-card').forEach(card => {
    card.addEventListener('click', () => showMarketList(card.dataset.type));
  });
}

function showMarketList(type) {
  state.mktView = 'list';
  state.mktType = type;
  document.getElementById('list-title').textContent = TYPE_META[type].label;
  document.getElementById('mkt-home').classList.add('hidden');
  document.getElementById('mkt-list').classList.remove('hidden');
  renderMarketItems(type);
}

function renderMarketItems(type) {
  const items = appData.marketplace[type] || [];
  const el    = document.getElementById('mkt-items');

  if (!items.length) {
    el.innerHTML = `<div class="empty-state">No ${type}s yet.<br>Be the first to post one!</div>`;
    return;
  }

  el.innerHTML = items.map((item, i) => {
    let inner = '';

    const adminBtn = (label, dataAttr) =>
      isAdmin() ? `<button class="admin-action-btn" ${dataAttr}>${label}</button>` : '';

    if (type === 'bounty') {
      const poster = getMember(item.postedBy);
      inner = `
        <div class="mkt-item-header">
          <div class="mkt-item-title">${item.title}</div>
          <div class="mkt-item-amount">${cbNum(item.reward)}</div>
        </div>
        <div class="mkt-item-footer">
          <div class="mkt-item-by">${miniAvatarDiv(poster)}<span>${poster.name}</span><span style="color:var(--gray2)">· ${item.time}</span></div>
          ${item.status !== 'claimed'
            ? adminBtn('🏆 Award', `data-admin-action="award-bounty" data-idx="${appData.marketplace.bounty.indexOf(item)}"`)
            : `<span class="status-tag status-claimed">claimed</span>`}
        </div>`;

    } else if (type === 'quest') {
      const poster = getMember(item.postedBy);
      inner = `
        <div class="mkt-item-header">
          <div class="mkt-item-title">${item.title}</div>
          <div class="mkt-item-amount">${cbNum(item.reward)}</div>
        </div>
        <div class="mkt-item-footer">
          <div class="mkt-item-by">${miniAvatarDiv(poster)}<span>${poster.name}</span><span class="deadline-tag">⏱ ${item.deadline}</span></div>
          ${item.status === 'live'
            ? adminBtn('🏆 Award', `data-admin-action="award-quest" data-idx="${appData.marketplace.quest.indexOf(item)}"`)
            : `<span class="status-tag status-${item.status}">${item.status}</span>`}
        </div>`;

    } else if (type === 'bet') {
      const fromM = getMember(item.from);
      const toM   = getMember(item.to);
      const adjM  = getMember(item.adjudicator);
      inner = `
        <div class="mkt-item-header">
          <div class="mkt-item-title">${item.title}</div>
          <div class="mkt-item-amount">${cbNum(item.amount)}</div>
        </div>
        <div class="mkt-item-footer">
          <div class="mkt-item-by">${miniAvatarDiv(fromM)}<span>${fromM.name}</span><span class="vs-divider">vs</span>${miniAvatarDiv(toM)}<span>${toM.name}</span></div>
          ${item.status === 'open'
            ? adminBtn('⚖️ Resolve', `data-admin-action="resolve-bet" data-idx="${appData.marketplace.bet.indexOf(item)}"`)
            : `<span class="status-tag status-${item.status}">${item.status}</span>`}
        </div>
        <div class="adj-tag">Judge: ${adjM.name} · ${item.time}</div>`;

    } else if (type === 'offering') {
      const byM  = getMember(item.by);
      const isMe = item.by === ME;
      inner = `
        <div class="mkt-item-header">
          <div class="mkt-item-title">${item.title}</div>
          <div class="mkt-item-amount">${cbNum(item.price)}</div>
        </div>
        <div class="mkt-item-footer">
          <div class="mkt-item-by">${miniAvatarDiv(byM)}<span>${isMe && !isAdmin() ? 'You' : byM.name}</span><span style="color:var(--gray2)">· ${item.time}</span></div>
          ${isAdmin()
            ? adminBtn('🗑 Remove', `data-admin-action="remove-offering" data-idx="${appData.marketplace.offering.indexOf(item)}"`)
            : isMe
              ? '<span class="status-tag status-yours">yours</span>'
              : `<button class="buy-btn" data-id="${item.id}" data-price="${item.price}" data-by="${item.by}">Buy</button>`
          }
        </div>`;
    }

    return `<div class="mkt-item-card" style="animation-delay:${i * 0.05}s">${inner}</div>`;
  }).join('');

  el.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () =>
      handleBuyOffering(btn.dataset.id, parseInt(btn.dataset.price), parseInt(btn.dataset.by))
    );
  });

  el.querySelectorAll('.admin-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.adminAction;
      const idx    = parseInt(btn.dataset.idx);
      if (action === 'resolve-bet')    openAdminResolveModal(appData.marketplace.bet[idx],    'bet');
      if (action === 'award-quest')    openAdminResolveModal(appData.marketplace.quest[idx],  'quest');
      if (action === 'award-bounty')   openAdminResolveModal(appData.marketplace.bounty[idx], 'bounty');
      if (action === 'remove-offering') {
        appData.marketplace.offering.splice(idx, 1);
        renderMarketItems('offering');
        renderMarketGrid();
        saveToGist();
        showToast('Offering removed');
      }
    });
  });
}

function handleBuyOffering(offeringId, price, sellerId) {
  const buyer  = appData.members.find(m => m.id === ME);
  const sellerM = appData.members.find(m => m.id === sellerId);
  const item   = appData.marketplace.offering.find(o => o.id === offeringId);
  if (!buyer || !item) return;
  if (buyer.balance < price) { showToast('Not enough ᴄʙ!'); return; }

  buyer.balance -= price;
  if (sellerM) sellerM.balance += price;

  appData.feed.unshift({
    id: Date.now(), from: ME, to: sellerId,
    amount: price, desc: item.title,
    type: 'offering', time: 'just now',
  });

  renderAll();
  showMarketList('offering');
  saveToGist();
  showToast(`Bought "${item.title}" from ${getMember(sellerId).name}! 🎉`);
}

/* ─────────────────────────────────────
   PROFILE
───────────────────────────────────── */

function renderProfile() {
  if (isAdmin()) { renderAdminPanel(); return; }

  const me     = getMember(ME);
  const myTxns = appData.feed.filter(t => t.from === ME || t.to === ME);
  const earned = myTxns.filter(t => t.to === ME).reduce((s, t) => s + t.amount, 0);
  const spent  = myTxns.filter(t => t.from === ME).reduce((s, t) => s + t.amount, 0);
  const rank   = [...appData.members].sort((a, b) => b.balance - a.balance).findIndex(m => m.id === ME) + 1;
  const myOff  = appData.marketplace.offering.filter(o => o.by === ME);

  const hist   = (appData.balanceHistory || {})[ME] || [];
  const maxBal = Math.max(...hist, 1);
  const bars   = hist.map((val, i) => {
    const pct     = Math.round((val / maxBal) * 100);
    const isToday = i === hist.length - 1;
    return `
      <div class="bar-col ${isToday ? 'today' : ''}">
        <div class="bar ${isToday ? 'today' : ''}" style="height:${pct}%"></div>
        <div class="bar-day">${DAYS[i] ?? ''}</div>
      </div>`;
  }).join('');

  const recentRows = myTxns.slice(0, 6).map(t => {
    const isIn  = t.to === ME;
    const other = isIn
      ? (t.from ? getMember(t.from) : BANK)
      : (t.to   ? getMember(t.to)   : BANK);
    return `
      <div class="feed-card" style="margin-bottom:8px">
        ${avatarDiv(other, 34)}
        <div class="feed-body">
          <div class="feed-desc" style="font-size:13px">${t.desc}</div>
          <div class="feed-meta">${other.name} · ${t.time}</div>
        </div>
        <div class="feed-amount ${isIn ? '' : 'negative'}">${cbNum(t.amount, isIn ? '+' : '-')}</div>
      </div>`;
  }).join('');

  const rankLabel = rank === 1 ? '🥇 #1' : rank === 2 ? '🥈 #2' : rank === 3 ? '🥉 #3' : `#${rank}`;

  document.getElementById('profile-body').innerHTML = `
    <div class="profile-hero">
      <div class="profile-avatar" style="background:${me.color}">${me.initials}</div>
      <div class="profile-name">${me.name}</div>
      <div class="profile-balance">${me.balance}</div>
      <div class="profile-balance-label"><span class="cb-mark">ᴄʙ</span> cool bucks</div>
    </div>

    <div class="profile-stats">
      <div class="stat-item"><div class="stat-value green">+${earned}</div><div class="stat-label">Earned</div></div>
      <div class="stat-item"><div class="stat-value red">-${spent}</div><div class="stat-label">Spent</div></div>
      <div class="stat-item"><div class="stat-value">${rankLabel}</div><div class="stat-label">Rank</div></div>
    </div>

    ${hist.length ? `
    <div class="chart-section">
      <div class="section-label">Balance History</div>
      <div class="bar-chart">${bars}</div>
    </div>` : ''}

    <div class="profile-section">
      <div class="profile-section-header">My Offerings</div>
      ${myOff.map(o => `
        <div class="offering-row">
          <span class="offering-row-title">${o.title}</span>
          <span class="offering-row-price">${cbNum(o.price)}</span>
        </div>`).join('') || '<div class="empty-state">No offerings yet</div>'}
    </div>

    <div class="profile-section">
      <div class="profile-section-header">Recent Transactions</div>
      ${recentRows || '<div class="empty-state">No transactions yet</div>'}
    </div>
  `;
}

function renderAdminPanel() {
  const sorted      = [...appData.members].sort((a, b) => b.balance - a.balance);
  const totalCB     = appData.members.reduce((s, m) => s + m.balance, 0);
  const totalTxns   = appData.feed.length;
  const openBets    = appData.marketplace.bet.filter(b => b.status === 'open').length;
  const livequests  = appData.marketplace.quest.filter(q => q.status === 'live').length;

  const leaderboard = sorted.map((m, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
    return `
      <div class="admin-member-row">
        <span class="admin-rank">${medal}</span>
        <div class="member-avatar" style="background:${m.color};width:32px;height:32px;font-size:10px;flex-shrink:0">${m.initials}</div>
        <span class="admin-member-name">${m.name}</span>
        <span class="admin-member-bal">${cbNum(m.balance)}</span>
        <button class="admin-give-btn" data-id="${m.id}" data-name="${m.name}">Give</button>
      </div>`;
  }).join('');

  document.getElementById('profile-body').innerHTML = `
    <div class="admin-hero">
      <div class="admin-hero-icon">🏦</div>
      <div class="admin-hero-title">Bank Admin</div>
      <div class="admin-hero-sub">full access</div>
    </div>

    <div class="profile-stats">
      <div class="stat-item"><div class="stat-value">${totalCB}</div><div class="stat-label">Total ᴄʙ</div></div>
      <div class="stat-item"><div class="stat-value">${totalTxns}</div><div class="stat-label">Txns</div></div>
      <div class="stat-item"><div class="stat-value">${openBets + livequests}</div><div class="stat-label">Active</div></div>
    </div>

    <div class="profile-section">
      <div class="profile-section-header">Leaderboard</div>
      <div class="admin-member-list">${leaderboard}</div>
    </div>

    <div class="profile-section">
      <div class="profile-section-header">Recent Activity</div>
      ${appData.feed.slice(0, 8).map(t => {
        const fromM = t.from ? getMember(t.from) : BANK;
        const toM   = t.to   ? getMember(t.to)   : BANK;
        return `
          <div class="feed-card" style="margin-bottom:8px">
            ${avatarDiv(fromM, 32)}<div class="feed-arrow" style="margin:0 3px">→</div>${avatarDiv(toM, 32)}
            <div class="feed-body">
              <div class="feed-desc" style="font-size:12.5px">${t.desc}</div>
              <div class="feed-meta">${fromM.name} → ${toM.name} · ${t.time}</div>
            </div>
            <div class="feed-amount">${cbNum(t.amount)}</div>
          </div>`;
      }).join('')}
    </div>
  `;

  // Wire up Give buttons
  document.querySelectorAll('.admin-give-btn').forEach(btn => {
    btn.addEventListener('click', () => openAdminMintModal(parseInt(btn.dataset.id)));
  });
}

/* ─────────────────────────────────────
   MODAL: SEND ᴄʙ
───────────────────────────────────── */

function openAdminMintModal(preselectedId = null) {
  let selectedId = preselectedId;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-title">🏦 Mint <span class="cb-mark">ᴄʙ</span></div>
    <label class="modal-label">Give to</label>
    <div class="member-picker" id="mint-picker">
      ${appData.members.map(m => `
        <div class="member-pick-item ${m.id === preselectedId ? 'selected' : ''}" data-id="${m.id}">
          <div class="member-avatar" style="background:${m.color};width:40px;height:40px;font-size:13px">${m.initials}</div>
          <span>${m.name}</span>
        </div>`).join('')}
    </div>
    <label class="modal-label">Amount</label>
    <input class="modal-input" id="mint-amount" type="number" inputmode="decimal" placeholder="0" min="1">
    <label class="modal-label">Reason</label>
    <input class="modal-input" id="mint-reason" type="text" placeholder="e.g. Quest reward, bonus…">
    <button class="modal-submit" id="do-mint">Mint & Send</button>
  `;

  document.getElementById('mint-picker').querySelectorAll('.member-pick-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#mint-picker .member-pick-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedId = parseInt(item.dataset.id);
    });
  });

  document.getElementById('do-mint').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mint-amount').value);
    const reason = document.getElementById('mint-reason').value.trim() || 'Admin grant';
    if (!selectedId)            { showToast('Pick a member'); return; }
    if (!amount || amount <= 0) { showToast('Enter an amount'); return; }

    const receiver = appData.members.find(m => m.id === selectedId);
    receiver.balance += amount;

    appData.feed.unshift({
      id: Date.now(), from: null, to: selectedId,
      amount, desc: reason, type: 'bonus', time: 'just now',
    });

    closeModal();
    renderAll();
    saveToGist();
    showToast(`Minted ${amount} ᴄʙ → ${receiver.name}`);
  });

  openModal();
}

function openAdminResolveModal(item, type) {
  let html = '';

  if (type === 'bet') {
    const fromM = getMember(item.from);
    const toM   = getMember(item.to);
    html = `
      <div class="modal-title">⚖️ Resolve Bet</div>
      <div style="font-size:15px;font-weight:600;margin-bottom:20px;line-height:1.4">${item.title}</div>
      <label class="modal-label">Who wins ${cbNum(item.amount)}?</label>
      <div style="display:flex;gap:10px;margin-bottom:20px">
        <button class="resolve-btn" data-winner="${item.from}" style="flex:1;background:var(--s2);border:1.5px solid var(--border);border-radius:var(--r-md);padding:16px;font-size:14px;font-weight:700;color:var(--white);transition:all .15s">
          ${avatarDiv(fromM, 36)}<span style="margin-top:6px;display:block">${fromM.name}</span>
        </button>
        <button class="resolve-btn" data-winner="${item.to}" style="flex:1;background:var(--s2);border:1.5px solid var(--border);border-radius:var(--r-md);padding:16px;font-size:14px;font-weight:700;color:var(--white);transition:all .15s">
          ${avatarDiv(toM, 36)}<span style="margin-top:6px;display:block">${toM.name}</span>
        </button>
      </div>
    `;
  } else if (type === 'quest' || type === 'bounty') {
    const label = type === 'quest' ? 'Quest' : 'Bounty';
    html = `
      <div class="modal-title">🏆 Award ${label}</div>
      <div style="font-size:15px;font-weight:600;margin-bottom:20px;line-height:1.4">${item.title}</div>
      <label class="modal-label">Award ${cbNum(item.reward || item.reward)} to</label>
      <div class="member-picker" id="award-picker">
        ${appData.members.map(m => `
          <div class="member-pick-item" data-id="${m.id}">
            <div class="member-avatar" style="background:${m.color};width:40px;height:40px;font-size:13px">${m.initials}</div>
            <span>${m.name}</span>
          </div>`).join('')}
      </div>
      <button class="modal-submit" id="do-award">Award</button>
    `;
  }

  document.getElementById('modal-content').innerHTML = html;

  if (type === 'bet') {
    document.querySelectorAll('.resolve-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const winnerId = parseInt(btn.dataset.winner);
        const loserId  = winnerId === item.from ? item.to : item.from;
        const winner   = appData.members.find(m => m.id === winnerId);
        const loser    = appData.members.find(m => m.id === loserId);
        if (winner) winner.balance += item.amount;
        if (loser)  loser.balance  = Math.max(0, loser.balance - item.amount);
        item.status = 'resolved';
        appData.feed.unshift({
          id: Date.now(), from: loserId, to: winnerId,
          amount: item.amount, desc: `Bet resolved: "${item.title}"`,
          type: 'bet', time: 'just now',
        });
        closeModal();
        renderAll();
        if (state.mktView === 'list') renderMarketItems(state.mktType);
        saveToGist();
        showToast(`${getMember(winnerId).name} wins the bet!`);
      });
    });
  }

  if (type === 'quest' || type === 'bounty') {
    let awardTo = null;
    document.getElementById('award-picker')?.querySelectorAll('.member-pick-item').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('#award-picker .member-pick-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        awardTo = parseInt(el.dataset.id);
      });
    });
    document.getElementById('do-award')?.addEventListener('click', () => {
      if (!awardTo) { showToast('Pick a winner'); return; }
      const reward  = item.reward;
      const winner  = appData.members.find(m => m.id === awardTo);
      if (winner) winner.balance += reward;
      item.status = 'claimed';
      appData.feed.unshift({
        id: Date.now(), from: null, to: awardTo,
        amount: reward, desc: `${type === 'quest' ? 'Quest' : 'Bounty'} won: "${item.title}"`,
        type, time: 'just now',
      });
      closeModal();
      renderAll();
      if (state.mktView === 'list') renderMarketItems(state.mktType);
      saveToGist();
      showToast(`${winner.name} awarded ${reward} ᴄʙ!`);
    });
  }

  openModal();
}

function openSendModal() {
  const others = appData.members.filter(m => m.id !== ME);
  let selectedId = null;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-title">Send <span class="cb-mark">ᴄʙ</span></div>
    <label class="modal-label">To</label>
    <div class="member-picker" id="send-picker">
      ${others.map(m => `
        <div class="member-pick-item" data-id="${m.id}">
          <div class="member-avatar" style="background:${m.color};width:40px;height:40px;font-size:13px">${m.initials}</div>
          <span>${m.name}</span>
        </div>`).join('')}
    </div>
    <label class="modal-label">Amount</label>
    <input class="modal-input" id="send-amount" type="number" inputmode="decimal" placeholder="0" min="1">
    <label class="modal-label">Note</label>
    <input class="modal-input" id="send-note" type="text" placeholder="What's this for?">
    <button class="modal-submit" id="do-send">Send <span class="cb-mark">ᴄʙ</span></button>
  `;

  document.getElementById('send-picker').querySelectorAll('.member-pick-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#send-picker .member-pick-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedId = parseInt(item.dataset.id);
    });
  });

  document.getElementById('do-send').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('send-amount').value);
    const note   = document.getElementById('send-note').value.trim() || 'sent ᴄʙ';
    if (!selectedId)            { showToast('Pick someone to send to'); return; }
    if (!amount || amount <= 0) { showToast('Enter a valid amount');    return; }

    const sender   = appData.members.find(m => m.id === ME);
    const receiver = appData.members.find(m => m.id === selectedId);
    if (sender.balance < amount) { showToast('Not enough ᴄʙ!'); return; }

    sender.balance   -= amount;
    receiver.balance += amount;

    appData.feed.unshift({
      id: Date.now(), from: ME, to: selectedId,
      amount, desc: note, type: 'offering', time: 'just now',
    });

    closeModal();
    renderAll();
    saveToGist();
    showToast(`Sent ${amount} ᴄʙ to ${receiver.name}! 💸`);
  });

  openModal();
}

/* ─────────────────────────────────────
   MODAL: CREATE
───────────────────────────────────── */

function openCreateModal(preType = null) {
  let selectedType = preType;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-title">New Post</div>
    <label class="modal-label">Type</label>
    <div class="type-selector">
      ${Object.keys(TYPE_META).map(t => {
        const meta = TYPE_META[t];
        return `<div class="type-option ${selectedType === t ? 'selected' : ''}" data-type="${t}">${meta.emoji} ${meta.label.slice(0, -1)}</div>`;
      }).join('')}
    </div>
    <label class="modal-label">Title</label>
    <input class="modal-input" id="create-title" type="text" placeholder="Describe it in one line…">
    <label class="modal-label">Amount (<span class="cb-mark">ᴄʙ</span>)</label>
    <input class="modal-input" id="create-amount" type="number" inputmode="decimal" placeholder="0" min="1">
    <button class="modal-submit" id="do-create">Post It</button>
  `;

  document.querySelectorAll('.type-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedType = opt.dataset.type;
    });
  });

  document.getElementById('do-create').addEventListener('click', () => {
    const title  = document.getElementById('create-title').value.trim();
    const amount = parseFloat(document.getElementById('create-amount').value);
    if (!selectedType)            { showToast('Pick a type');   return; }
    if (!title)                   { showToast('Add a title');   return; }
    if (!amount || amount <= 0)   { showToast('Set an amount'); return; }

    const newItem = { id: `${selectedType[0]}${Date.now()}`, title, time: 'just now' };

    if      (selectedType === 'bounty')   { newItem.postedBy = ME; newItem.reward = amount; newItem.status = 'open'; }
    else if (selectedType === 'quest')    { newItem.postedBy = ME; newItem.reward = amount; newItem.status = 'live'; newItem.deadline = 'TBD'; }
    else if (selectedType === 'bet')      { newItem.from = ME; newItem.to = null; newItem.amount = amount; newItem.status = 'open'; newItem.adjudicator = null; }
    else if (selectedType === 'offering') { newItem.by = ME; newItem.price = amount; newItem.status = 'available'; }

    appData.marketplace[selectedType].unshift(newItem);
    closeModal();
    renderMarketGrid();
    if (state.mktView === 'list' && state.mktType === selectedType) renderMarketItems(selectedType);
    saveToGist();
    showToast(`${TYPE_META[selectedType].emoji} Posted and live!`);
  });

  openModal();
}

/* ─────────────────────────────────────
   MODAL SYSTEM
───────────────────────────────────── */

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal-overlay').setAttribute('aria-hidden', 'false');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal-overlay').setAttribute('aria-hidden', 'true');
}

/* ─────────────────────────────────────
   TOAST
───────────────────────────────────── */

let _toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ─────────────────────────────────────
   TAB SWITCHING
───────────────────────────────────── */

function switchTab(tabId) {
  if (state.tab === tabId) return;
  state.tab = tabId;
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');
  document.querySelector(`.nav-item[data-tab="${tabId}"]`).classList.add('active');
}

/* ─────────────────────────────────────
   INIT
───────────────────────────────────── */

async function init() {
  // 1. Load data from Gist (or local cache, or hardcoded defaults)
  await loadFromGist();

  // 2. Check for saved session in cookie
  const savedId = parseInt(getCookie('cbbank_me') || '');
  if (savedId && appData.members.find(m => m.id === savedId)) {
    ME = savedId;
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    renderAll();
  } else {
    showLoginScreen();
  }

  // 3. Wire event listeners
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('btnSend').addEventListener('click', () => {
    isAdmin() ? openAdminMintModal() : openSendModal();
  });
  document.getElementById('btnSignOut').addEventListener('click', signOut);

  document.getElementById('btnBack').addEventListener('click', () => {
    state.mktView = 'home';
    state.mktType = null;
    document.getElementById('mkt-home').classList.remove('hidden');
    document.getElementById('mkt-list').classList.add('hidden');
  });

  document.getElementById('btnCreate').addEventListener('click', () => openCreateModal());
  document.getElementById('btnCreateList').addEventListener('click', () => openCreateModal(state.mktType));

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
