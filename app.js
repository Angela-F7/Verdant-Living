/* ==========================================================================
   Verdant Living - Interactive JavaScript Application Logic & 4-Page Routing
   ========================================================================== */

// Global Application State
const appState = {
  activeView: 'landingView',
  userPoints: 350,
  userTrees: 8,
  userCo2Offset: 176, // kg
  totalWasteDiverted: 8200, // kg
  cart: [],
  currentWeightInput: 10,
  redeemedPoints: 0,
  selectedPaymentMethod: 'upi',
  upiVerified: false,
  pastOrders: [],
  pastOrdersFilter: 'all',
  pastOrdersSearch: '',
  currentInvoiceOrderId: null,
  events: [
    {
      id: 1,
      title: "Coastal Marine Cleanup Drive",
      date: "Saturday, Oct 24, 2026 | 08:30 AM",
      location: "Juhu Beach & Versova Coast, Mumbai, Maharashtra",
      slots: 14,
      image: "images/event_1.jpg",
      rsvpConfirmed: false
    },
    {
      id: 2,
      title: "Urban Miyawaki Forest Plantation",
      date: "Sunday, Nov 08, 2026 | 09:00 AM",
      location: "Cubbon Park & GKVK Agro-Forestry Reserve, Bengaluru, Karnataka",
      slots: 8,
      image: "images/event_2.jpg",
      rsvpConfirmed: false
    },
    {
      id: 3,
      title: "Riverbank Invasive Weed & Plastic Removal",
      date: "Saturday, Nov 21, 2026 | 10:00 AM",
      location: "Yamuna Biodiversity Riverfront, Wazirabad, New Delhi",
      slots: 22,
      image: "images/event_3.jpg",
      rsvpConfirmed: false
    },
    {
      id: 4,
      title: "Community Backyard Compost Workshop",
      date: "Saturday, Dec 05, 2026 | 02:00 PM",
      location: "Besant Nagar Community Eco-Hub, Chennai, Tamil Nadu",
      slots: 5,
      image: "images/event_4.jpg",
      rsvpConfirmed: false
    }
  ],
  outlets: [
    {
      name: "Mumbai Circular Depot & Take-Back",
      city: "Mumbai",
      address: "Plot 14, Linking Road, Bandra West, Mumbai, MH",
      hours: "Mon-Sat: 9am - 7pm",
      materials: ["Worn Denim", "rPET Plastics", "Organic Textiles"]
    },
    {
      name: "Bengaluru Eco Hub & Take-Back Outlet",
      city: "Bengaluru",
      address: "100 Feet Road, Indiranagar, Bengaluru, KA",
      hours: "Daily: 10am - 6pm",
      materials: ["Footwear", "Textiles", "Compost Buckets"]
    },
    {
      name: "Delhi Green Recyclery",
      city: "New Delhi",
      address: "Aurobindo Marg, Hauz Khas, New Delhi, DL",
      hours: "Mon-Sun: 8am - 8pm",
      materials: ["All Verdant Gear", "Denim", "Wood Scrap"]
    },
    {
      name: "Chennai Coastal Circularity Center",
      city: "Chennai",
      address: "2nd Avenue, Besant Nagar, Chennai, TN",
      hours: "Tue-Sat: 10am - 6pm",
      materials: ["Invasive Weed Weaves", "Plastics", "Gear"]
    }
  ],
  treesList: [
    { species: "Sundarbans Mangrove (Rhizophora)", location: "Sundarbans Biosphere (21.9497° N, 88.8999° E)", date: "2026-08-14", co2Rate: "24 kg/yr" },
    { species: "Neem (Azadirachta indica)", location: "Western Ghats Corridor (13.0033° N, 76.1004° E)", date: "2026-08-28", co2Rate: "26 kg/yr" },
    { species: "Peepal (Ficus religiosa)", location: "Delhi Aravalli Biodiversity Zone (28.5355° N, 77.2410° E)", date: "2026-09-02", co2Rate: "28 kg/yr" },
    { species: "Indian Banyan (Ficus benghalensis)", location: "Kaveri River Basin (10.9601° N, 78.0766° E)", date: "2026-09-19", co2Rate: "30 kg/yr" }
  ]
};

// Eco-Store Product Catalog Data (All Curated Matching Greenwashed Images & INR Rupees)
const productsData = [
  {
    id: 'p1',
    name: 'Ocean Plastic rPET Daypack',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 2499,
    material: '100% Recycled rPET',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p1_daypack.jpg',
    description: 'Constructed from 32 recovered ocean plastic bottles. Waterproof, durable, and fully recyclable at end of life.'
  },
  {
    id: 'p2',
    name: 'Upcycled Denim Utility Tote',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 1299,
    material: 'Upcycled Cotton Denim',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p2_denim_tote.jpg',
    description: 'Handcrafted from post-consumer denim garments diverted from landfills. Features reinforced handles and internal zip pocket.'
  },
  {
    id: 'p3',
    name: 'Reclaimed Wood Desk Organizer',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 999,
    material: 'Reclaimed Timber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p3_wood_organizer.jpg',
    description: 'Sourced from old barn timber with natural wax finish. Keeps stationery organized while extending timber lifecycle.'
  },
  {
    id: 'p4',
    name: 'Wildflower Seed-Paper Journal',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 499,
    material: 'Zero-Waste Seed Paper',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p4_seed_journal.jpg',
    description: '100% recycled paper embedded with non-GMO wildflower seeds. Plant the pages after use to grow native blooms!'
  },
  {
    id: 'p5',
    name: 'Water-Hyacinth Woven Footwear',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 1899,
    material: 'Invasive Water-Hyacinth',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p5_hyacinth_shoes.jpg',
    description: 'Woven from invasive water hyacinth harvested to clear suffocated waterways. Lightweight, breathable, and ergonomic.'
  },
  {
    id: 'p6',
    name: 'Kudzu Fiber Crossbody Bag',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 1499,
    material: 'Kudzu Vine Fiber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p6_kudzu_crossbody.jpg',
    description: 'Harvested from invasive kudzu vine growth in southern reserves. Ultra-durable tensile fibers woven with eco dyes.'
  },
  {
    id: 'p7',
    name: 'Lionfish Leather Slim Cardholder',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 1199,
    material: 'Upcycled Fish Leather',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p7_cardholder.jpg',
    description: 'Crafted from invasive lionfish culls protecting coral reefs. Stronger than traditional bovine leather.'
  },
  {
    id: 'p8',
    name: 'Water-Hyacinth Storage Basket',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 899,
    material: 'Invasive Species Fiber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p8_basket.jpg',
    description: 'Sturdy handwoven storage container made from cleared river weeds. Ideal for home organization.'
  },
  {
    id: 'p9',
    name: 'Bamboo Cutlery & Straw Kit',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 499,
    material: '< 30-Day Biodegradable',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p9_bamboo_cutlery.jpg',
    description: '100% organic raw bamboo utensil travel pouch. Decomposes naturally in garden soil under 30 days.'
  },
  {
    id: 'p10',
    name: 'Solid Shampoo & Conditioner Bar Duo',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 599,
    material: 'Zero Plastic / Organic',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p10_shampoo_bars.jpg',
    description: 'Concentrated cold-pressed botanical bars replacing 4 plastic shampoo bottles. 100% biodegradable runoff safe.'
  },
  {
    id: 'p11',
    name: 'Loofah & Kitchen Scrubbers Pack',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 349,
    material: 'Home Compostable',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p11_loofah.jpg',
    description: 'Natural plant gourd scrubbers for zero-microplastic dishwashing and body exfoliation.'
  },
  {
    id: 'p12',
    name: 'Refillable Glass Eco-Cleaner Set',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 799,
    material: 'Zero Single-Use Plastic',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'images/p12_glass_cleaner.jpg',
    description: 'Amber glass spray bottle with 3 dissolvable non-toxic plant powder concentrate pods.'
  }
];

// Initialize DOM Events when page loads
document.addEventListener('DOMContentLoaded', () => {
  initPastOrders();
  renderProducts('all');
  renderEvents();
  renderOutlets('all');
  renderTreesGrid();
  setupCompostSlider();
  setupHeaderScroll();
  setupMobileMenu();
  setupFaqAccordion();
  setupNewsletter();
  calculateTradeInCredit();
  animateImpactTicker();

  // Populate default sample cart item for Card View demonstration
  if (appState.cart.length === 0) {
    appState.cart.push({ product: productsData[0], quantity: 1 });
    updateProfileUI();
  }
  renderCardPage();
});

// 5 Page View Switcher Function
function switchPage(pageId) {
  appState.activeView = pageId;

  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active-view');
  });

  document.querySelectorAll('.page-tab-btn').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const targetView = document.getElementById(pageId);
  if (targetView) {
    targetView.classList.add('active-view');
  }

  const targetTab = document.getElementById(`tab-${pageId}`);
  if (targetTab) {
    targetTab.classList.add('active-tab');
  }

  // Close mobile navigation drawer if open to prevent screen overlap
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.classList.remove('open');
  }

  if (pageId === 'cardView') {
    renderCardPage();
  } else if (pageId === 'shippingView') {
    renderShippingPage();
  } else if (pageId === 'ordersView') {
    renderPastOrders();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth Scroll Helper
function scrollToSection(sectionId) {
  const elem = document.getElementById(sectionId);
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth' });
  }
}

// Sticky Header Box Shadow
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Navigation Drawer Toggle (uses clean CSS class toggle to avoid layout overlap)
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}

// Auth Form Toggle on Login Page
function toggleAuthForm(type) {
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const loginTab = document.getElementById('loginTabBtn');
  const signupTab = document.getElementById('signupTabBtn');

  if (type === 'login') {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

function handleAuthSubmit(e, type) {
  e.preventDefault();
  if (type === 'signup') {
    appState.userPoints += 100;
    appState.userTrees += 1;
    updateProfileUI();
    showToast('🎉 Account created! +100 Eco-Points & 1 Sapling awarded!');
  } else {
    showToast('👋 Welcome back! Signed in to your Verdant account.');
  }
  switchPage('landingView');
}

// ==========================================================================
// 1. Eco-Store Catalog & Filter Tabs
// ==========================================================================
function renderProducts(categoryFilter) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filtered = categoryFilter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === categoryFilter);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badge-group">
          <span class="badge-material">${product.material}</span>
          <span class="badge-sapling">${product.saplingBadge}</span>
        </div>
        <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Quick View</button>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px; line-clamp: 2; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;">
          ${product.description}
        </p>
        <div class="product-meta">
          <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          <button class="btn-add-cart" onclick="addToCart('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-btn')) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const category = e.target.getAttribute('data-category');
    renderProducts(category);
  }
});

function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById('quickViewContent');
  content.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-md); max-height: 280px; object-fit: cover;">
    </div>
    <div>
      <span class="section-badge">${product.categoryLabel}</span>
      <h3 style="font-size: 1.4rem; margin-top: 6px; margin-bottom: 8px;">${product.name}</h3>
      <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-terracotta); margin-bottom: 12px;">
        ₹${product.price.toLocaleString('en-IN')}
      </div>
      <p style="font-size: 0.92rem; color: var(--color-text-muted); margin-bottom: 16px;">
        ${product.description}
      </p>
      <div style="background-color: var(--color-forest-pale); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 700; color: var(--color-forest-dark); margin-bottom: 18px;">
        <i class="fa-solid fa-tree"></i> Includes guaranteed 1 Native Tree Planting & +${Math.round(product.price * 0.1)} Eco Points
      </div>
      <button class="btn-terracotta" style="width: 100%; justify-content: center;" onclick="addToCart('${product.id}'); closeModal('quickViewModal');">
        <i class="fa-solid fa-bag-shopping"></i> Add to Cart Now
      </button>
    </div>
  `;
  openModal('quickViewModal');
}

// ==========================================================================
// 2. Shopping Cart & Points System Logic
// ==========================================================================
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = appState.cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    appState.cart.push({ product, quantity: 1 });
  }

  const earnedPoints = Math.round(product.price * 0.1);
  appState.userPoints += earnedPoints;
  appState.userTrees += 1;
  appState.userCo2Offset += 22;

  appState.treesList.unshift({
    species: product.name.includes('Denim') ? 'Western Ghats Neem Sapling' : 'Sundarbans Mangrove Sapling',
    location: `Western Ghats Corridor (13.0033° N, 76.1004° E)`,
    date: new Date().toISOString().split('T')[0],
    co2Rate: '24 kg/yr'
  });

  updateProfileUI();
  renderCartDrawer();
  renderCardPage();
  renderTreesGrid();
  showToast(`🌱 Added ${product.name} to cart! Earned +${earnedPoints} Eco-Points & Planted 1 Tree!`);
}

function updateProfileUI() {
  document.getElementById('headerPointsVal').textContent = appState.userPoints;
  document.getElementById('userPointsVal').textContent = appState.userPoints;
  document.getElementById('userTreesVal').textContent = appState.userTrees;
  document.getElementById('userCo2Val').textContent = `${appState.userCo2Offset} kg`;
  
  const totalCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartBadgeCount').textContent = totalCount;
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  body.innerHTML = '';

  if (appState.cart.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--color-text-muted);">
        <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;"></i>
        <p>Your eco-cart is currently empty.</p>
        <button class="btn-outline" style="margin-top: 16px;" onclick="closeCart(); switchPage('landingView');">Explore Products</button>
      </div>
    `;
    document.getElementById('cartSubtotal').textContent = '₹0';
    document.getElementById('cartSaplingsCount').textContent = '0';
    document.getElementById('cartPointsEarned').textContent = '0';
    return;
  }

  let subtotal = 0;
  let totalTrees = 0;

  appState.cart.forEach((item, index) => {
    subtotal += item.product.price * item.quantity;
    totalTrees += item.quantity;

    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 14px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border); align-items: center;';
    row.innerHTML = `
      <img src="${item.product.image}" style="width: 60px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;">
      <div style="flex-grow: 1;">
        <div style="font-weight: 700; font-size: 0.95rem;">${item.product.name}</div>
        <div style="font-size: 0.85rem; color: var(--color-terracotta); font-weight: 700;">₹${item.product.price.toLocaleString('en-IN')} x ${item.quantity}</div>
      </div>
      <button onclick="removeFromCart(${index})" style="color: var(--color-text-light); font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
    `;
    body.appendChild(row);
  });

  document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('cartSaplingsCount').textContent = totalTrees;
  document.getElementById('cartPointsEarned').textContent = Math.round(subtotal * 0.1);
}

function removeFromCart(index) {
  appState.cart.splice(index, 1);
  updateProfileUI();
  renderCartDrawer();
  renderCardPage();
  showToast('Item removed from cart');
}

document.getElementById('openCartBtn').addEventListener('click', () => {
  document.getElementById('cartDrawer').classList.add('active');
});

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
}

// ==========================================================================
// PAGE 3: CARD & REWARDS PAGE RENDERER
// ==========================================================================
function renderCardPage() {
  const container = document.getElementById('cardPageItemsList');
  if (!container) return;
  container.innerHTML = '';

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--color-text-muted);">
        <i class="fa-solid fa-basket-shopping" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4;"></i>
        <p>No items in your cart. Add eco-products from the catalog below!</p>
      </div>
    `;
  } else {
    appState.cart.forEach((item, index) => {
      const cardRow = document.createElement('div');
      cardRow.style.cssText = 'display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--color-border); align-items: center;';
      cardRow.innerHTML = `
        <img src="${item.product.image}" style="width: 72px; height: 72px; border-radius: var(--radius-md); object-fit: cover;">
        <div style="flex-grow: 1;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-forest-dark);">${item.product.name}</h4>
          <div style="font-size: 0.82rem; color: var(--color-text-muted);">${item.product.material}</div>
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-terracotta); margin-top: 4px;">₹${item.product.price.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn-chip" onclick="updateCartQty(${index}, -1)">-</button>
          <span style="font-weight: 800; font-size: 1rem; width: 24px; text-align: center;">${item.quantity}</span>
          <button class="btn-chip" onclick="updateCartQty(${index}, 1)">+</button>
        </div>
        <button onclick="removeFromCart(${index})" style="color: var(--color-text-light); font-size: 1.1rem; margin-left: 12px;"><i class="fa-solid fa-trash"></i></button>
      `;
      container.appendChild(cardRow);
    });
  }

  calculateCardTotals();
}

function updateCartQty(index, delta) {
  if (appState.cart[index]) {
    appState.cart[index].quantity += delta;
    if (appState.cart[index].quantity <= 0) {
      appState.cart.splice(index, 1);
    }
  }
  updateProfileUI();
  renderCartDrawer();
  renderCardPage();
}

function updatePointsDiscount(pointsVal) {
  appState.redeemedPoints = parseInt(pointsVal) || 0;
  const discountAmount = Math.round((appState.redeemedPoints / 100) * 100);
  document.getElementById('redeemPointsLabel').textContent = `${appState.redeemedPoints} pts (-₹${discountAmount.toLocaleString('en-IN')})`;
  calculateCardTotals();
}

function calculateCardTotals() {
  let subtotal = 0;
  let totalTrees = 0;

  appState.cart.forEach(item => {
    subtotal += item.product.price * item.quantity;
    totalTrees += item.quantity;
  });

  const discountAmount = Math.round((appState.redeemedPoints / 100) * 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  document.getElementById('cardSubtotalVal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('cardTreesCount').textContent = `${totalTrees} Tree(s)`;
  document.getElementById('cardDiscountVal').textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
  document.getElementById('cardTotalVal').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
  document.getElementById('cardAvailablePoints').textContent = appState.userPoints;

  // Sync with Shipping Page Summary
  document.getElementById('shippingSubtotalVal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('shippingDiscountVal').textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
  document.getElementById('shippingTotalVal').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  // Dynamically update UPI QR Code amount if QR is visible
  updateUpiQrCode(finalTotal);
}

function renderShippingPage() {
  calculateCardTotals();
  selectPaymentMethod(appState.selectedPaymentMethod || 'upi');
}

// ==========================================================================
// Interactive Checkout Payment Logic: UPI, COD, & Credit/Debit Card
// ==========================================================================

/**
 * Switch payment method between 'upi', 'cod', and 'card'.
 */
function selectPaymentMethod(method) {
  appState.selectedPaymentMethod = method;

  const cardUpi = document.getElementById('pmCardUpi');
  const cardCod = document.getElementById('pmCardCod');
  const cardCard = document.getElementById('pmCardCard');

  const panelUpi = document.getElementById('upiDetailsPanel');
  const panelCod = document.getElementById('codDetailsPanel');
  const panelCard = document.getElementById('cardDetailsPanel');

  const submitBtnText = document.getElementById('checkoutSubmitBtnText');

  // Sync radio buttons
  document.querySelectorAll('input[name="paymentMethodRadio"]').forEach(r => {
    r.checked = (r.value === method);
  });

  if (method === 'upi') {
    cardUpi?.classList.add('selected');
    cardCod?.classList.remove('selected');
    cardCard?.classList.remove('selected');

    if (panelUpi) panelUpi.style.display = 'block';
    if (panelCod) panelCod.style.display = 'none';
    if (panelCard) panelCard.style.display = 'none';

    if (submitBtnText) submitBtnText.textContent = 'Place Closed-Loop Order & Generate Invoice';
    updateUpiQrCode();
  } else if (method === 'cod') {
    cardUpi?.classList.remove('selected');
    cardCod?.classList.add('selected');
    cardCard?.classList.remove('selected');

    if (panelUpi) panelUpi.style.display = 'none';
    if (panelCod) panelCod.style.display = 'block';
    if (panelCard) panelCard.style.display = 'none';

    if (submitBtnText) submitBtnText.textContent = 'Confirm Order with Cash on Delivery & Generate Invoice';
  } else if (method === 'card') {
    cardUpi?.classList.remove('selected');
    cardCod?.classList.remove('selected');
    cardCard?.classList.add('selected');

    if (panelUpi) panelUpi.style.display = 'none';
    if (panelCod) panelCod.style.display = 'none';
    if (panelCard) panelCard.style.display = 'block';

    if (submitBtnText) submitBtnText.textContent = 'Pay Securely via Card & Generate Invoice';
  }
}

/**
 * Generate a scannable SVG QR Code with high-contrast matrix and center UPI logo.
 */
function generateUpiQrSvg(amount, upiUrl) {
  const size = 29;
  const matrix = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder patterns at (0,0), (size-7, 0), (0, size-7)
  const addFinder = (startX, startY) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  };
  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = (i % 2 === 0);
    matrix[i][6] = (i % 2 === 0);
  }

  // Alignment pattern
  const alignX = size - 9;
  const alignY = size - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      matrix[alignY + r][alignX + c] = (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0));
    }
  }

  // Deterministic modules based on UPI URL payload
  let hash = 0;
  for (let i = 0; i < upiUrl.length; i++) {
    hash = ((hash << 5) - hash) + upiUrl.charCodeAt(i);
    hash |= 0;
  }
  let seed = Math.abs(hash) || 12345;
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const centerMin = Math.floor(size / 2) - 3;
  const centerMax = Math.floor(size / 2) + 3;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if ((r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8)) continue;
      if (r === 6 || c === 6) continue;
      if (Math.abs(r - alignY) <= 2 && Math.abs(c - alignX) <= 2) continue;
      if (r >= centerMin && r <= centerMax && c >= centerMin && c <= centerMax) continue;

      matrix[r][c] = rng() > 0.48;
    }
  }

  const moduleSize = 6;
  const padding = 12;
  const totalDim = size * moduleSize + padding * 2;
  let paths = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        const x = padding + c * moduleSize;
        const y = padding + r * moduleSize;
        paths += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="#1b4332"/>`;
      }
    }
  }

  const centerPixel = padding + (size / 2) * moduleSize;
  const centerBadgeSize = moduleSize * 6.5;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalDim} ${totalDim}" style="width: 100%; height: 100%; border-radius: 8px;">
      <rect width="${totalDim}" height="${totalDim}" fill="#ffffff" rx="8"/>
      ${paths}
      <rect x="${centerPixel - centerBadgeSize / 2}" y="${centerPixel - centerBadgeSize / 2}" width="${centerBadgeSize}" height="${centerBadgeSize}" fill="#ffffff" rx="6" stroke="#2d6a4f" stroke-width="2"/>
      <rect x="${centerPixel - centerBadgeSize / 2 + 3}" y="${centerPixel - centerBadgeSize / 2 + 3}" width="${centerBadgeSize - 6}" height="${centerBadgeSize - 6}" fill="#1b4332" rx="4"/>
      <text x="${centerPixel}" y="${centerPixel + 4}" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="11" text-anchor="middle">UPI</text>
    </svg>
  `;
}

/**
 * Dynamically render the sample scannable QR Code container with the current order amount.
 */
function updateUpiQrCode(amount) {
  if (amount === undefined) {
    let subtotal = 0;
    appState.cart.forEach(item => subtotal += item.product.price * item.quantity);
    const discountAmount = Math.round((appState.redeemedPoints / 100) * 100);
    const carrierRadios = document.querySelectorAll('input[name="carrier"]');
    const shippingFee = (carrierRadios.length > 1 && carrierRadios[1].checked) ? 99 : 0;
    amount = Math.max(0, subtotal - discountAmount + shippingFee);
  }

  const displayElem = document.getElementById('upiDisplayAmount');
  if (displayElem) displayElem.textContent = `₹${amount.toLocaleString('en-IN')}`;

  const container = document.getElementById('upiQrCodeContainer');
  if (!container) return;

  const upiUrl = `upi://pay?pa=verdantliving@upi&pn=Verdant%20Living&am=${amount}&cu=INR&tn=Eco%20Marketplace%20Order`;
  const svgHtml = generateUpiQrSvg(amount, upiUrl);

  container.innerHTML = `
    <div style="position: relative; width: 170px; height: 170px; margin: 0 auto;">
      ${svgHtml}
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=170x170&margin=4&data=${encodeURIComponent(upiUrl)}" 
           alt="UPI Payment QR Code" 
           style="position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 8px; opacity: 0.98;"
           onerror="this.style.display='none'">
    </div>
    <a href="${upiUrl}" class="btn-chip" style="margin-top: 10px; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 6px;">
      <i class="fa-solid fa-mobile-screen"></i> Pay via UPI App (₹${amount.toLocaleString('en-IN')})
    </a>
  `;
}

/**
 * Handle UPI ID (VPA) verification and trigger automated invoice generation upon success.
 */
function handleUpiVerification() {
  const upiInput = document.getElementById('upiIdInput');
  const statusElem = document.getElementById('upiVerifyStatus');
  const verifyBtn = document.getElementById('verifyUpiBtn');
  const upiId = (upiInput?.value || '').trim();

  if (!upiId || !upiId.includes('@')) {
    if (statusElem) {
      statusElem.style.display = 'block';
      statusElem.className = 'upi-verify-status error';
      statusElem.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid UPI ID (e.g. yourname@okhdfcbank or 9876543210@upi)';
    }
    return;
  }

  // Verifying state with spinner
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
  }
  if (statusElem) {
    statusElem.style.display = 'block';
    statusElem.className = 'upi-verify-status verifying';
    statusElem.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connecting to UPI gateway for VPA "<strong>${upiId}</strong>"...`;
  }

  setTimeout(() => {
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.className = 'btn-forest';
      verifyBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verified ✓';
    }
    if (statusElem) {
      statusElem.className = 'upi-verify-status success';
      statusElem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.25rem; color: var(--color-forest-medium);"></i>
          <div>
            <strong>UPI ID Verified: ${upiId}</strong><br>
            <span>NPCI VPA active • Payment Authorized. Launching automated invoice...</span>
          </div>
        </div>
      `;
    }
    appState.upiVerified = true;
    showToast(`✓ UPI ID "${upiId}" verified! Generating official invoice...`);

    // Automated Invoice Generation triggered on successful payment verification!
    setTimeout(() => {
      completeCheckoutWithMethod('UPI', {
        vpa: upiId,
        status: 'Paid - Verified via UPI Instant Pay',
        txnId: 'UPI-TXN-' + Math.floor(100000000 + Math.random() * 900000000)
      });
    }, 900);
  }, 1000);
}

/**
 * Universal order placement and automated invoice generation handler.
 */
function completeCheckoutWithMethod(paymentMethod, paymentMeta = {}) {
  if (appState.cart.length === 0) {
    showToast('Your cart is empty! Please add products first.');
    switchPage('landingView');
    return null;
  }

  // Extract recipient address details
  const firstName = document.getElementById('shipFirstName')?.value.trim() || 'Jane';
  const lastName = document.getElementById('shipLastName')?.value.trim() || 'Doe';
  const street = document.getElementById('shipStreet')?.value.trim() || '42 MG Road, Indiranagar';
  const city = document.getElementById('shipCity')?.value.trim() || 'Bengaluru';
  const state = document.getElementById('shipState')?.value.trim() || 'Karnataka';
  const zip = document.getElementById('shipZip')?.value.trim() || '560038';

  // Determine delivery carrier & fee
  const carrierRadios = document.querySelectorAll('input[name="carrier"]');
  let selectedCarrier = 'Zero-Emission EV Courier (100% Electric)';
  let shippingFee = 0;
  if (carrierRadios.length > 1 && carrierRadios[1].checked) {
    selectedCarrier = 'Doorstep Take-Back Exchange Courier';
    shippingFee = 99;
  }

  // Eco-Packaging preference
  const packagingSelect = document.getElementById('packagingChoice');
  const selectedPackaging = packagingSelect ? packagingSelect.value : '100% Home-Compostable Mushroom Mycelium Packaging';

  // Calculate items, saplings, CO2 offset, and financial totals
  let subtotal = 0;
  let totalTrees = 0;
  const orderItems = appState.cart.map(item => {
    subtotal += item.product.price * item.quantity;
    totalTrees += item.quantity;
    return {
      id: item.product.id,
      name: item.product.name,
      category: item.product.category,
      categoryLabel: item.product.categoryLabel,
      material: item.product.material,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      saplingBadge: item.product.saplingBadge,
      description: item.product.description
    };
  });

  const discountAmount = Math.round((appState.redeemedPoints / 100) * 100);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const co2Offset = totalTrees * 22;
  const pointsEarned = Math.round(subtotal * 0.1);

  // Generate unique Order ID
  const orderNumber = Math.floor(10000 + Math.random() * 90000);
  const orderId = `VL-2026-${orderNumber}`;

  // Current formatted timestamp
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' | ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const orderStatus = paymentMethod === 'Cash on Delivery (COD)' ? 'Processing' : 'Processing';

  // Construct new Past Order object with complete payment metadata
  const newOrder = {
    id: orderId,
    date: dateFormatted,
    timestamp: Date.now(),
    status: orderStatus,
    paymentMethod: paymentMethod,
    paymentDetails: paymentMeta,
    recipient: {
      name: `${firstName} ${lastName}`.trim(),
      street: street,
      city: city,
      state: state,
      zip: zip
    },
    carrier: selectedCarrier,
    packaging: selectedPackaging,
    items: orderItems,
    subtotal: subtotal,
    discount: discountAmount,
    shippingFee: shippingFee,
    taxAmount: 0, // 5% GST included in MRP
    total: finalTotal,
    treesPlanted: totalTrees,
    co2Offset: co2Offset,
    pointsEarned: pointsEarned
  };

  // Prepend to localStorage past orders list
  const existingOrders = getPastOrders();
  existingOrders.unshift(newOrder);
  savePastOrders(existingOrders);

  // Update State & Points Balance
  appState.userPoints = Math.max(0, appState.userPoints - appState.redeemedPoints) + pointsEarned;
  appState.userTrees += totalTrees;
  appState.userCo2Offset += co2Offset;
  appState.cart = [];
  appState.redeemedPoints = 0;

  updateProfileUI();
  renderCartDrawer();
  renderCardPage();
  renderPastOrders();

  // Populate Order Success Modal in case accessed later
  const successOrderIdElem = document.getElementById('successOrderId');
  if (successOrderIdElem) successOrderIdElem.textContent = `#${newOrder.id}`;
  
  const successOrderTotalElem = document.getElementById('successOrderTotal');
  if (successOrderTotalElem) successOrderTotalElem.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  const successOrderTreesElem = document.getElementById('successOrderTrees');
  if (successOrderTreesElem) successOrderTreesElem.textContent = `${totalTrees} Saplings Planted`;

  const successViewInvoiceBtn = document.getElementById('successViewInvoiceBtn');
  if (successViewInvoiceBtn) {
    successViewInvoiceBtn.onclick = () => {
      closeModal('orderSuccessModal');
      openInvoiceModal(newOrder.id);
    };
  }

  // Trigger automated Invoice Generation modal directly!
  openInvoiceModal(newOrder.id);
  showToast(`🎉 Order #${newOrder.id} placed! Automated official invoice generated.`);
  return newOrder;
}

/**
 * Handle checkout submission via the main Place Order button.
 */
function handleShippingOrderSubmit(e) {
  e.preventDefault();
  if (appState.cart.length === 0) {
    showToast('Your cart is empty! Please add products first.');
    switchPage('landingView');
    return;
  }

  const method = appState.selectedPaymentMethod || 'upi';
  let paymentMeta = {};

  if (method === 'upi') {
    const upiInput = document.getElementById('upiIdInput');
    const vpa = (upiInput?.value || '').trim() || 'verdantliving@upi';
    paymentMeta = {
      vpa: vpa,
      status: 'Paid - Verified via UPI Instant Pay',
      txnId: 'UPI-TXN-' + Math.floor(100000000 + Math.random() * 900000000)
    };
    completeCheckoutWithMethod('UPI', paymentMeta);
  } else if (method === 'cod') {
    paymentMeta = {
      terms: 'Payable on Delivery to EV Courier',
      status: 'Authorized - COD Doorstep Verification Pending',
      otp: Math.floor(1000 + Math.random() * 9000)
    };
    completeCheckoutWithMethod('Cash on Delivery (COD)', paymentMeta);
  } else if (method === 'card') {
    const cardNum = document.getElementById('cardNumInput')?.value.trim() || '4532 8921 7734 8890';
    const cardHolder = document.getElementById('cardHolderInput')?.value.trim() || 'Jane Doe';
    paymentMeta = {
      cardHolder: cardHolder,
      last4: cardNum.slice(-4),
      status: 'Paid - Verified 256-bit Encrypted Card',
      authCode: 'AUTH-' + Math.floor(100000 + Math.random() * 900000)
    };
    completeCheckoutWithMethod('Credit / Debit Card', paymentMeta);
  }
}

// ==========================================================================
// 3. Gamified Composting & Waste Rewards Logic
// ==========================================================================
function setupCompostSlider() {
  const slider = document.getElementById('weightSlider');
  const directInput = document.getElementById('directWeightInput');
  const displayVal = document.getElementById('compostWeightVal');

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    appState.currentWeightInput = val;
    directInput.value = val;
    displayVal.textContent = val;
    updateMilestonesUI(val);
  });

  directInput.addEventListener('input', (e) => {
    let val = parseInt(e.target.value) || 0;
    if (val > 50) val = 50;
    appState.currentWeightInput = val;
    slider.value = Math.min(val, 30);
    displayVal.textContent = val;
    updateMilestonesUI(val);
  });

  document.getElementById('claimRewardBtn').addEventListener('click', () => {
    const weight = appState.currentWeightInput;
    if (weight <= 0) {
      showToast('Please enter a weight greater than 0 kg');
      return;
    }

    const earnedPoints = weight * 50;
    appState.userPoints += earnedPoints;
    appState.totalWasteDiverted += weight;

    document.getElementById('counterWaste').textContent = `${appState.totalWasteDiverted.toLocaleString()}`;

    updateProfileUI();
    showToast(`🏆 Logged ${weight} kg compost waste! You earned +${earnedPoints} Eco-Reward Points!`);
  });
}

function setSliderValue(val) {
  const slider = document.getElementById('weightSlider');
  const directInput = document.getElementById('directWeightInput');
  const displayVal = document.getElementById('compostWeightVal');

  const newVal = appState.currentWeightInput + val;
  appState.currentWeightInput = newVal;
  slider.value = Math.min(newVal, 30);
  directInput.value = newVal;
  displayVal.textContent = newVal;
  updateMilestonesUI(newVal);
}

function updateMilestonesUI(weight) {
  const ms10 = document.getElementById('ms-10');
  const ms10Badge = document.getElementById('ms-10-badge');

  const ms20 = document.getElementById('ms-20');
  const ms20Badge = document.getElementById('ms-20-badge');

  if (weight >= 10) {
    ms10.className = 'milestone-item unlocked';
    ms10Badge.className = 'milestone-status status-unlocked';
    ms10Badge.textContent = 'UNLOCKED';
  } else {
    ms10.className = 'milestone-item active-target';
    ms10Badge.className = 'milestone-status status-unlocked';
    ms10Badge.textContent = 'IN PROGRESS';
  }

  if (weight >= 20) {
    ms20.className = 'milestone-item unlocked';
    ms20Badge.className = 'milestone-status status-unlocked';
    ms20Badge.textContent = 'UNLOCKED';
  } else {
    ms20.className = 'milestone-item';
    ms20Badge.className = 'milestone-status status-locked';
    ms20Badge.textContent = 'LOCKED';
  }
}

// ==========================================================================
// 4. Monthly Community Drives Logic
// ==========================================================================
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';

  appState.events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-img">
      <div class="event-body">
        <div class="event-date-pill"><i class="fa-regular fa-calendar-check"></i> ${event.date}</div>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-location"><i class="fa-solid fa-location-dot"></i> ${event.location}</div>
        
        <div class="event-footer">
          <span class="slots-left"><i class="fa-solid fa-user-group"></i> ${event.slots} slots left</span>
          <button class="${event.rsvpConfirmed ? 'btn-forest' : 'btn-terracotta'}" 
                  style="padding: 8px 16px; font-size: 0.85rem;" 
                  onclick="openRsvpModal(${event.id})" 
                  ${event.rsvpConfirmed ? 'disabled' : ''}>
            ${event.rsvpConfirmed ? 'Confirmed ✓' : 'RSVP Now'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openRsvpModal(eventId) {
  const event = appState.events.find(e => e.id === eventId);
  if (!event || event.rsvpConfirmed) return;

  document.getElementById('rsvpEventTitle').textContent = `RSVP: ${event.title}`;
  document.getElementById('rsvpForm').dataset.eventId = eventId;
  openModal('rsvpModal');
}

function handleRsvpSubmit(e) {
  e.preventDefault();
  const eventId = parseInt(e.target.dataset.eventId);
  const event = appState.events.find(e => e.id === eventId);
  if (event) {
    event.rsvpConfirmed = true;
    event.slots = Math.max(0, event.slots - 1);
    appState.userPoints += 50;
    updateProfileUI();
    renderEvents();
    closeModal('rsvpModal');
    showToast(`🎁 Registration confirmed! +50 Eco-Points added & Goodie Bag reserved for on-site pickup!`);
  }
}

// ==========================================================================
// 5. Closed-Loop Take-Back Outlets & Estimator Logic
// ==========================================================================
function renderOutlets(filterCity) {
  const list = document.getElementById('outletsList');
  list.innerHTML = '';

  const filtered = filterCity === 'all' 
    ? appState.outlets 
    : appState.outlets.filter(o => o.city === filterCity);

  filtered.forEach((outlet, index) => {
    const item = document.createElement('div');
    item.className = `outlet-card-item ${index === 0 ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="outlet-name"><i class="fa-solid fa-building-circle-check"></i> ${outlet.name}</div>
      <div class="outlet-details">${outlet.address}</div>
      <div style="font-size: 0.8rem; color: var(--color-forest-medium); font-weight: 700; margin-top: 4px;">
        <i class="fa-regular fa-clock"></i> ${outlet.hours}
      </div>
      <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
        ${outlet.materials.map(m => `<span style="background: #ffffff; border: 1px solid var(--color-border); font-size: 0.72rem; padding: 2px 8px; border-radius: var(--radius-full); font-weight: 600;">${m}</span>`).join('')}
      </div>
    `;
    list.appendChild(item);
  });
}

document.getElementById('cityFilter').addEventListener('change', (e) => {
  renderOutlets(e.target.value);
});

document.getElementById('outletSearchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const list = document.getElementById('outletsList');
  list.innerHTML = '';
  const filtered = appState.outlets.filter(o => o.name.toLowerCase().includes(query) || o.city.toLowerCase().includes(query) || o.address.toLowerCase().includes(query));
  filtered.forEach(outlet => {
    const item = document.createElement('div');
    item.className = 'outlet-card-item';
    item.innerHTML = `
      <div class="outlet-name"><i class="fa-solid fa-building-circle-check"></i> ${outlet.name}</div>
      <div class="outlet-details">${outlet.address}</div>
    `;
    list.appendChild(item);
  });
});

function calculateTradeInCredit() {
  const rate = parseFloat(document.getElementById('takebackItemType').value) || 350;
  const qty = parseFloat(document.getElementById('takebackQty').value) || 1;
  const credit = Math.round(rate * qty);
  const pts = Math.round(credit * 0.5);
  
  const text = `Estimated Credit Reward: ₹${credit.toLocaleString('en-IN')} Store Credit + ${pts} Eco Points`;
  document.getElementById('estimatorResultPill').textContent = text;
  document.getElementById('modalPayoutEst').textContent = `₹${credit.toLocaleString('en-IN')} Store Credit + ${pts} Eco Points`;
}

function selectOutlet(index) {
  showToast(`Selected Disposal Outlet: ${appState.outlets[index].name}`);
}

function handleCourierSubmit(e) {
  e.preventDefault();
  closeModal('courierModal');
  appState.userPoints += 200;
  updateProfileUI();
  showToast('📦 Prepaid Take-Back Courier Pass generated! ₹700 Store Credit reserved pending scan.');
}

function handlePickupSubmit(e) {
  e.preventDefault();
  closeModal('pickupModal');
  showToast('🚛 Doorstep Municipal Compost Pickup scheduled! Our zero-emission van will arrive at your slot.');
}

// ==========================================================================
// 6. Personal Forest Footprint Dashboard
// ==========================================================================
function renderTreesGrid() {
  const grid = document.getElementById('treesVisualGrid');
  grid.innerHTML = '';

  appState.treesList.forEach(tree => {
    const card = document.createElement('div');
    card.className = 'tree-card';
    card.innerHTML = `
      <div class="tree-badge-icon">
        <i class="fa-solid fa-tree"></i>
      </div>
      <div class="tree-species">${tree.species}</div>
      <div class="tree-gps"><i class="fa-solid fa-location-crosshairs"></i> ${tree.location}</div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 4px;">Planted: ${tree.date}</div>
      <div class="tree-offset-rate"><i class="fa-solid fa-cloud-arrow-down"></i> Est. ${tree.co2Rate} CO₂ Offset</div>
    `;
    grid.appendChild(card);
  });
}

// ==========================================================================
// 7. Interactive Accordion FAQ & Newsletter
// ==========================================================================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function setupNewsletter() {
  const form = document.getElementById('newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
      appState.userPoints += 100;
      updateProfileUI();
      document.getElementById('newsletterEmail').value = '';
      showToast('🎉 Newsletter subscribed! +100 bonus Eco-Points awarded to your account!');
    }
  });
}

// ==========================================================================
// 8. Impact Counter Animation & Report Download Helper
// ==========================================================================
function animateImpactTicker() {
  const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = Math.floor(progress * (end - start) + start);
      obj.innerHTML = `${prefix}${val.toLocaleString()}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  animateValue('counterTrees', 10000, 12450, 1500);
  animateValue('counterWaste', 6000, 8200, 1500, '', ' kg');
  animateValue('counterVolunteers', 1000, 1500, 1500, '', '+');
  animateValue('counterCredits', 500000, 1450000, 1500, '₹');
}

function openReportModal() {
  openModal('reportModal');
}

function downloadReportFile() {
  const reportText = `
=====================================================
VERDANT LIVING - ANNUAL CIRCULARITY AUDIT REPORT 2026
=====================================================
Date: October 2026
Verification Standard: Closed-Loop ISO 14855 / ASTM D6400

KEY METRICS & IMPACT HIGHLIGHTS:
--------------------------------
1. Total Trees Planted: 12,450 Native Saplings across 6 restoration zones.
2. Organic Waste Diverted: 8,200 kg processed into bio-nutrient compost.
3. Closed-Loop Take-Back Recycling Efficiency: 94.2%.
4. Biodegradable Product Line Decomposition: Guaranteed <= 30 to 180 days.

CERTIFICATION AUDIT STATUS: PASSED (Zero Micro-Plastics Detected).
=====================================================
`;
  const blob = new Blob([reportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Verdant_Living_Circularity_Report_2026.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📄 Downloaded Verdant Living 2026 Circularity Impact Report!');
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Toast Notification Helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--color-forest-mint);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// 9. Past Orders & Dynamic Invoice Generation Logic (localStorage backed)
// ==========================================================================
const STORAGE_KEY_PAST_ORDERS = 'verdant_past_orders';

/**
 * Retrieve past orders array from localStorage or initialize with seed eco-friendly orders.
 */
function getPastOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PAST_ORDERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading past orders from localStorage:', err);
  }

  // Seed default eco-friendly orders if none exist
  const defaultOrders = [
    {
      id: 'VL-2026-89412',
      date: 'Oct 18, 2026 | 02:45 PM',
      timestamp: Date.now() - (5 * 86400000),
      status: 'Delivered',
      recipient: {
        name: 'Jane Doe',
        street: '42 MG Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560038'
      },
      carrier: 'Zero-Emission EV Courier (100% Electric)',
      packaging: '100% Home-Compostable Mushroom Mycelium Packaging',
      items: [
        {
          id: 'p1',
          name: 'Ocean Plastic rPET Daypack',
          material: '100% Recycled rPET',
          price: 2499,
          quantity: 1,
          image: 'images/p1_daypack.jpg',
          saplingBadge: '🌱 Plants 1 Sapling',
          description: 'Constructed from 32 recovered ocean plastic bottles.'
        },
        {
          id: 'p9',
          name: 'Bamboo Cutlery & Straw Kit',
          material: '< 30-Day Biodegradable',
          price: 499,
          quantity: 2,
          image: 'images/p9_bamboo_cutlery.jpg',
          saplingBadge: '🌱 Plants 1 Sapling',
          description: '100% organic raw bamboo utensil travel pouch.'
        }
      ],
      subtotal: 3497,
      discount: 100,
      shippingFee: 0,
      total: 3397,
      treesPlanted: 3,
      co2Offset: 66,
      pointsEarned: 350
    },
    {
      id: 'VL-2026-91024',
      date: 'Oct 21, 2026 | 11:15 AM',
      timestamp: Date.now() - (2 * 86400000),
      status: 'Processing',
      recipient: {
        name: 'Jane Doe',
        street: '42 MG Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560038'
      },
      carrier: 'Zero-Emission EV Courier (100% Electric)',
      packaging: '100% Recycled Kraft Cardboard Box',
      items: [
        {
          id: 'p5',
          name: 'Water-Hyacinth Woven Footwear',
          material: 'Invasive Water-Hyacinth',
          price: 1899,
          quantity: 1,
          image: 'images/p5_hyacinth_shoes.jpg',
          saplingBadge: '🌱 Plants 1 Sapling',
          description: 'Woven from invasive water hyacinth harvested to clear waterways.'
        },
        {
          id: 'p4',
          name: 'Wildflower Seed-Paper Journal',
          material: 'Zero-Waste Seed Paper',
          price: 499,
          quantity: 1,
          image: 'images/p4_seed_journal.jpg',
          saplingBadge: '🌱 Plants 1 Sapling',
          description: '100% recycled paper embedded with wildflower seeds.'
        }
      ],
      subtotal: 2398,
      discount: 0,
      shippingFee: 0,
      total: 2398,
      treesPlanted: 2,
      co2Offset: 44,
      pointsEarned: 240
    }
  ];

  savePastOrders(defaultOrders);
  return defaultOrders;
}

/**
 * Persist past orders array to localStorage.
 */
function savePastOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY_PAST_ORDERS, JSON.stringify(orders));
  } catch (err) {
    console.error('Error saving past orders to localStorage:', err);
  }
}

/**
 * Initialize Past Orders on DOM load.
 */
function initPastOrders() {
  appState.pastOrders = getPastOrders();
  renderPastOrders();
}

/**
 * Change status filter ('all', 'Delivered', 'Processing').
 */
function filterOrders(status) {
  appState.pastOrdersFilter = status;

  // Update pills UI
  const pills = document.querySelectorAll('.order-filter-pill');
  pills.forEach(p => p.classList.remove('active'));

  if (status === 'all') {
    document.getElementById('filter-pill-all')?.classList.add('active');
  } else if (status.toLowerCase() === 'delivered') {
    document.getElementById('filter-pill-delivered')?.classList.add('active');
  } else if (status.toLowerCase() === 'processing') {
    document.getElementById('filter-pill-processing')?.classList.add('active');
  }

  renderPastOrders();
}

/**
 * Handle search query by order ID or product name.
 */
function handleOrdersSearch(query) {
  appState.pastOrdersSearch = (query || '').trim().toLowerCase();
  renderPastOrders();
}

/**
 * Render the Past Orders container and summary metrics.
 */
function renderPastOrders() {
  const container = document.getElementById('pastOrdersContainer');
  if (!container) return;

  const orders = getPastOrders();
  appState.pastOrders = orders;

  // Summary Metrics calculations
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalTrees = orders.reduce((sum, o) => sum + (o.treesPlanted || 0), 0);
  const totalCo2 = orders.reduce((sum, o) => sum + (o.co2Offset || 0), 0);

  const countDelivered = orders.filter(o => o.status.toLowerCase() === 'delivered').length;
  const countProcessing = orders.filter(o => o.status.toLowerCase() === 'processing').length;

  // Update summary header DOM elements
  const countStatElem = document.getElementById('ordersCountStat');
  if (countStatElem) countStatElem.textContent = totalOrders;

  const spentStatElem = document.getElementById('ordersSpentStat');
  if (spentStatElem) spentStatElem.textContent = `₹${totalSpent.toLocaleString('en-IN')}`;

  const treesStatElem = document.getElementById('ordersTreesStat');
  if (treesStatElem) treesStatElem.textContent = `${totalTrees} Saplings`;

  const co2StatElem = document.getElementById('ordersCo2Stat');
  if (co2StatElem) co2StatElem.textContent = `${totalCo2} kg`;

  // Update filter pill counts
  const filterCountAll = document.getElementById('filterCountAll');
  if (filterCountAll) filterCountAll.textContent = totalOrders;

  const filterCountDelivered = document.getElementById('filterCountDelivered');
  if (filterCountDelivered) filterCountDelivered.textContent = countDelivered;

  const filterCountProcessing = document.getElementById('filterCountProcessing');
  if (filterCountProcessing) filterCountProcessing.textContent = countProcessing;

  // Apply status and search filters
  let filtered = orders;
  if (appState.pastOrdersFilter !== 'all') {
    filtered = filtered.filter(o => o.status.toLowerCase() === appState.pastOrdersFilter.toLowerCase());
  }

  if (appState.pastOrdersSearch) {
    const q = appState.pastOrdersSearch;
    filtered = filtered.filter(o => {
      const matchId = o.id.toLowerCase().includes(q);
      const matchItems = o.items.some(item => 
        item.name.toLowerCase().includes(q) || 
        (item.material && item.material.toLowerCase().includes(q))
      );
      const matchDate = o.date.toLowerCase().includes(q);
      return matchId || matchItems || matchDate;
    });
  }

  container.innerHTML = '';

  // Render empty state if no matching orders
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="orders-empty-state">
        <div class="orders-empty-icon">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px; color: var(--color-forest-dark);">No Previous Orders Found</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 20px;">
          ${appState.pastOrdersSearch ? `No orders matched "${appState.pastOrdersSearch}". Try clearing the search keyword.` : 'You have no eco-friendly orders under this status filter yet.'}
        </p>
        <button class="btn-terracotta" onclick="switchPage('cardView')">
          <i class="fa-solid fa-basket-shopping"></i> Explore Eco Catalog
        </button>
      </div>
    `;
    return;
  }

  // Render individual Order Cards
  filtered.forEach(order => {
    const isDelivered = order.status.toLowerCase() === 'delivered';
    const statusClass = isDelivered ? 'status-delivered' : 'status-processing';
    const statusIcon = isDelivered ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-clock"></i>';

    const card = document.createElement('div');
    card.className = 'order-card';

    // Build items list HTML
    let itemsHtml = '';
    order.items.forEach(item => {
      itemsHtml += `
        <div class="order-item-row">
          <img src="${item.image}" alt="${item.name}" class="order-item-thumb" onerror="this.src='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&q=80'">
          <div class="order-item-info">
            <h4 class="order-item-title">${item.name}</h4>
            <div class="order-item-badges">
              <span class="badge-material">${item.material || 'Eco-Friendly'}</span>
              ${item.saplingBadge ? `<span class="badge-sapling">${item.saplingBadge}</span>` : ''}
            </div>
          </div>
          <div class="order-item-pricing">
            <div class="order-item-qty-price">${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</div>
            <div class="order-item-line-total">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          </div>
        </div>
      `;
    });

    const packagingLabel = order.packaging ? order.packaging.split('(')[0].trim() : 'Mushroom Mycelium Packaging';
    const carrierLabel = order.carrier ? order.carrier.split('(')[0].trim() : 'Zero-Emission EV Courier';

    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-header-left">
          <div class="order-id-tag">
            <i class="fa-solid fa-receipt" style="color: var(--color-terracotta);"></i> #${order.id}
          </div>
          <div class="order-date-tag">
            <i class="fa-regular fa-calendar-check"></i> ${order.date}
          </div>
        </div>
        <div>
          <span class="order-status-badge ${statusClass}">
            ${statusIcon} ${order.status}
          </span>
        </div>
      </div>

      <div class="order-card-body">
        <div class="order-items-list">
          ${itemsHtml}
        </div>
      </div>

      <div class="order-card-footer">
        <div class="order-eco-pills">
          <span class="order-eco-pill">
            <i class="fa-solid fa-box-open" style="color: var(--color-terracotta);"></i> ${packagingLabel}
          </span>
          <span class="order-eco-pill">
            <i class="fa-solid fa-truck-fast"></i> ${carrierLabel}
          </span>
          <span class="order-eco-pill tree-highlight">
            <i class="fa-solid fa-tree"></i> ${order.treesPlanted || 1} Sapling(s) Planted
          </span>
        </div>

        <div class="order-card-right">
          <div class="order-total-block">
            <div class="order-total-lbl">Total Paid</div>
            <div class="order-total-val">₹${order.total.toLocaleString('en-IN')}</div>
          </div>
          <button class="btn-view-invoice" onclick="openInvoiceModal('${order.id}')">
            <i class="fa-solid fa-file-invoice"></i> View Invoice
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Open professional, printable Eco Invoice Modal for a specific order.
 */
function openInvoiceModal(orderId) {
  const orders = getPastOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    showToast('Order not found!');
    return;
  }

  appState.currentInvoiceOrderId = orderId;
  const container = document.getElementById('invoicePrintableArea');
  if (!container) return;

  const isDelivered = order.status.toLowerCase() === 'delivered';
  const statusClass = isDelivered ? 'status-delivered' : 'status-processing';
  const statusIcon = isDelivered ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-clock"></i>';

  let itemsRowsHtml = '';
  order.items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    itemsRowsHtml += `
      <tr>
        <td style="text-align: center; font-weight: 700; color: var(--color-text-light);">${index + 1}</td>
        <td>
          <div style="font-weight: 700; color: var(--color-forest-dark); font-size: 0.95rem;">${item.name}</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">${item.description ? item.description.substring(0, 70) + '...' : ''}</div>
        </td>
        <td>
          <span style="background: var(--color-forest-pale); color: var(--color-forest-dark); padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;">
            ${item.material || 'Eco Sustainable'}
          </span>
        </td>
        <td style="text-align: center; font-weight: 700;">${item.quantity}</td>
        <td style="text-align: right; font-weight: 600;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="text-align: right; font-weight: 800; color: var(--color-forest-dark);">₹${lineTotal.toLocaleString('en-IN')}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="invoice-header-box">
      <div>
        <div class="invoice-brand-title">
          <div class="logo-icon" style="width: 34px; height: 34px; font-size: 0.95rem;">
            <i class="fa-solid fa-leaf"></i>
          </div>
          <span>Verdant Living</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-top: 4px;">
          Closed-Loop Circularity Platform • Verified Microplastic-Free Lifecycle • GSTIN: 29AABCV1234F1Z8
        </div>
      </div>
      <div class="invoice-meta-right">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-light); font-weight: 700;">Tax Invoice & Certificate</div>
        <div class="invoice-number-tag">INV-${order.id}</div>
        <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-top: 2px;">
          <i class="fa-regular fa-calendar"></i> ${order.date}
        </div>
        <div style="margin-top: 6px;">
          <span class="order-status-badge ${statusClass}" style="font-size: 0.75rem; padding: 3px 10px;">
            ${statusIcon} ${order.status}
          </span>
        </div>
      </div>
    </div>

    <div class="invoice-details-grid">
      <div class="invoice-details-col">
        <h5>Billed & Shipped To</h5>
        <div style="font-weight: 800; color: var(--color-forest-dark); font-size: 0.98rem;">${order.recipient.name}</div>
        <div style="color: var(--color-text-muted); margin-top: 2px;">${order.recipient.street}</div>
        <div style="color: var(--color-text-muted);">${order.recipient.city}, ${order.recipient.state} - ${order.recipient.zip}</div>
        <div style="color: var(--color-text-muted); font-size: 0.82rem; margin-top: 4px;">Payment Mode: Verified Carbon-Neutral Prepaid</div>
      </div>
      <div class="invoice-details-col">
        <h5>Fulfillment & Eco Packaging</h5>
        <div style="font-weight: 700; color: var(--color-forest-dark);"><i class="fa-solid fa-truck-fast" style="color: var(--color-forest-medium);"></i> ${order.carrier}</div>
        <div style="color: var(--color-forest-dark); font-weight: 600; margin-top: 4px;"><i class="fa-solid fa-box-open" style="color: var(--color-terracotta);"></i> ${order.packaging}</div>
        <div style="font-size: 0.82rem; color: var(--color-forest-medium); font-weight: 700; margin-top: 6px;">
          <i class="fa-solid fa-shield-halved"></i> 100% Zero Single-Use Plastic Certified
        </div>
      </div>
    </div>

    <div class="invoice-table-wrapper">
      <table class="invoice-table">
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">#</th>
            <th>Eco-Item Description</th>
            <th>Lifecycle / Material</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRowsHtml}
        </tbody>
      </table>
    </div>

    <div class="invoice-totals-box">
      <div class="invoice-total-row">
        <span>Items Subtotal:</span>
        <span style="font-weight: 700;">₹${order.subtotal.toLocaleString('en-IN')}</span>
      </div>
      ${order.discount > 0 ? `
        <div class="invoice-total-row" style="color: var(--color-terracotta);">
          <span>Eco-Points Discount:</span>
          <span style="font-weight: 700;">-₹${order.discount.toLocaleString('en-IN')}</span>
        </div>
      ` : ''}
      <div class="invoice-total-row">
        <span>Zero-Emission Delivery:</span>
        <span style="font-weight: 700; color: var(--color-forest-medium);">${order.shippingFee > 0 ? `₹${order.shippingFee}` : 'FREE (0 CO₂)'}</span>
      </div>
      <div class="invoice-total-row grand-total">
        <span>Total Paid:</span>
        <span>₹${order.total.toLocaleString('en-IN')}</span>
      </div>
    </div>

    <div class="invoice-eco-certificate">
      <div class="invoice-cert-badge">
        <i class="fa-solid fa-seedling"></i>
      </div>
      <div>
        <strong>Verified Environmental Impact Certificate:</strong><br>
        This circular purchase successfully funded <strong>${order.treesPlanted} Native Tree Sapling(s)</strong> (est. ${order.co2Offset} kg Lifetime CO₂ offset) planted in protected restoration corridors. Tested under ISO 14855 standards with zero micro-plastic runoff.
      </div>
    </div>
  `;

  openModal('invoiceModal');
}

/**
 * Trigger native print dialog for the current invoice.
 */
function printInvoice() {
  window.print();
}

/**
 * Download text file of the active invoice.
 */
function downloadCurrentInvoice() {
  if (!appState.currentInvoiceOrderId) return;
  downloadInvoiceFile(appState.currentInvoiceOrderId);
}

/**
 * Generate formatted text receipt and download to local disk.
 */
function downloadInvoiceFile(orderId) {
  const orders = getPastOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  let itemsText = '';
  order.items.forEach((item, idx) => {
    itemsText += `${idx + 1}. ${item.name} (${item.material}) x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
  });

  const invoiceText = `
=====================================================
VERDANT LIVING - OFFICIAL CIRCULAR TAX INVOICE
=====================================================
Invoice No: INV-${order.id}
Order Date: ${order.date}
Status: ${order.status.toUpperCase()}
GSTIN: 29AABCV1234F1Z8
Verification: ISO 14855 / ASTM D6400 Verified Zero-Microplastic

CUSTOMER & SHIPPING DETAILS:
----------------------------
Recipient: ${order.recipient.name}
Address: ${order.recipient.street}, ${order.recipient.city}, ${order.recipient.state} - ${order.recipient.zip}
Delivery Carrier: ${order.carrier}
Eco-Packaging: ${order.packaging}

PURCHASED ECO-FRIENDLY ITEMS:
-----------------------------
${itemsText}
FINANCIAL BREAKDOWN:
--------------------
Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}
Eco-Points Discount: -₹${order.discount.toLocaleString('en-IN')}
Shipping Fee: ${order.shippingFee > 0 ? `₹${order.shippingFee}` : 'FREE (Carbon-Neutral)'}
-----------------------------------------------------
TOTAL AMOUNT PAID: ₹${order.total.toLocaleString('en-IN')}
=====================================================

ENVIRONMENTAL IMPACT CERTIFICATE:
---------------------------------
Native Trees Planted: ${order.treesPlanted} Sapling(s)
Lifetime CO2 Offset: ${order.co2Offset} kg CO2
Earned Eco-Points: +${order.pointsEarned} pts

Thank you for choosing closed-loop sustainability!
Verdant Living Platform Inc. (https://verdantliving.org)
=====================================================
`;

  const blob = new Blob([invoiceText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Verdant_Living_Invoice_${order.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`📄 Downloaded invoice for Order #${order.id}`);
}
