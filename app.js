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
  events: [
    {
      id: 1,
      title: "Coastal Marine Cleanup Drive",
      date: "Saturday, Oct 24, 2026 | 08:30 AM",
      location: "Juhu Beach, Koliwada, Mumbai, Maharashtra",
      slots: 14,
      image: "C:\Users\admin\Downloads\ECO\images\juhu-beach-cleanup.jpg",
      rsvpConfirmed: false
    },
    {
      id: 2,
      title: "Urban Miyawaki Forest Plantation",
      date: "Sunday, Nov 08, 2026 | 09:00 AM",
      location: "Highland Eco-Park, Austin, TX",
      slots: 8,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      rsvpConfirmed: false
    },
    {
      id: 3,
      title: "Riverbank Invasive Kudzu Removal",
      date: "Saturday, Nov 21, 2026 | 10:00 AM",
      location: "Chattahoochee Reserve, Atlanta, GA",
      slots: 22,
      image: "https://images.unsplash.com/photo-1511497584788-876761c119ef?auto=format&fit=crop&w=600&q=80",
      rsvpConfirmed: false
    },
    {
      id: 4,
      title: "Community Backyard Compost Workshop",
      date: "Saturday, Dec 05, 2026 | 02:00 PM",
      location: "Green Thumb Hub, New York, NY",
      slots: 5,
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=600&q=80",
      rsvpConfirmed: false
    }
  ],
  outlets: [
    {
      name: "SF Mission Circular Depot",
      city: "San Francisco",
      address: "2480 Mission St, San Francisco, CA",
      hours: "Mon-Sat: 9am - 7pm",
      materials: ["Worn Denim", "rPET Plastics", "Organic Textiles"]
    },
    {
      name: "Austin Eco Hub & Take-Back Outlets",
      city: "Austin",
      address: "1104 E 6th St, Austin, TX",
      hours: "Daily: 10am - 6pm",
      materials: ["Footwear", "Textiles", "Compost Buckets"]
    },
    {
      name: "Brooklyn Green Recyclery",
      city: "New York",
      address: "78 Grand St, Brooklyn, NY",
      hours: "Mon-Sun: 8am - 8pm",
      materials: ["All Verdant Gear", "Denim", "Wood Scrap"]
    },
    {
      name: "Seattle Emerald Take-Back Center",
      city: "Seattle",
      address: "512 Pine St, Seattle, WA",
      hours: "Tue-Sat: 10am - 6pm",
      materials: ["Invasive Weed Weaves", "Plastics", "Gear"]
    }
  ],
  treesList: [
    { species: "Red Mangrove", location: "Coastal Zone 4 (24.8607° N, 67.0011° E)", date: "2026-08-14", co2Rate: "22 kg/yr" },
    { species: "White Oak", location: "Highland Reserve (30.2672° N, 97.7431° W)", date: "2026-08-28", co2Rate: "24 kg/yr" },
    { species: "Eastern Redcedar", location: "Atlanta Valley (33.7490° N, 84.3880° W)", date: "2026-09-02", co2Rate: "20 kg/yr" },
    { species: "Wild Cherry Tree", location: "Green Belt Zone (40.7128° N, 74.0060° W)", date: "2026-09-19", co2Rate: "22 kg/yr" }
  ]
};

// Eco-Store Product Catalog Data
const productsData = [
  {
    id: 'p1',
    name: 'Ocean Plastic rPET Daypack',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 78.00,
    material: '100% Recycled rPET',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Constructed from 32 recovered ocean plastic bottles. Waterproof, durable, and fully recyclable at end of life.'
  },
  {
    id: 'p2',
    name: 'Upcycled Denim Utility Tote',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 42.00,
    material: 'Upcycled Cotton Denim',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted from post-consumer denim garments diverted from landfills. Features reinforced handles and internal zip pocket.'
  },
  {
    id: 'p3',
    name: 'Reclaimed Wood Desk Organizer',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 35.00,
    material: 'Reclaimed Timber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    description: 'Sourced from old barn timber with natural wax finish. Keeps stationery organized while extending timber lifecycle.'
  },
  {
    id: 'p4',
    name: 'Wildflower Seed-Paper Journal',
    category: 'recycled',
    categoryLabel: 'Recycled & Upcycled',
    price: 18.00,
    material: 'Zero-Waste Seed Paper',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '100% recycled paper embedded with non-GMO wildflower seeds. Plant the pages after use to grow native blooms!'
  },
  {
    id: 'p5',
    name: 'Water-Hyacinth Woven Footwear',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 64.00,
    material: 'Invasive Water-Hyacinth',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    description: 'Woven from invasive water hyacinth harvested to clear suffocated waterways. Lightweight, breathable, and ergonomic.'
  },
  {
    id: 'p6',
    name: 'Kudzu Fiber Crossbody Bag',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 52.00,
    material: 'Kudzu Vine Fiber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    description: 'Harvested from invasive kudzu vine growth in southern reserves. Ultra-durable tensile fibers woven with eco dyes.'
  },
  {
    id: 'p7',
    name: 'Lionfish Leather Slim Cardholder',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 48.00,
    material: 'Invasive Lionfish Leather',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    description: 'Crafted from invasive lionfish culls protecting coral reefs. Stronger than traditional bovine leather.'
  },
  {
    id: 'p8',
    name: 'Water-Hyacinth Storage Basket',
    category: 'invasive',
    categoryLabel: 'Invasive Species Line',
    price: 38.00,
    material: 'Invasive Species Fiber',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    description: 'Sturdy handwoven storage container made from cleared river weeds. Ideal for home organization.'
  },
  {
    id: 'p9',
    name: 'Bamboo Cutlery & Straw Kit',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 22.00,
    material: '< 30-Day Biodegradable',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: '100% organic raw bamboo utensil travel pouch. Decomposes naturally in garden soil under 30 days.'
  },
  {
    id: 'p10',
    name: 'Solid Shampoo & Conditioner Bar Duo',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 19.00,
    material: 'Zero Plastic / Organic',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f947?auto=format&fit=crop&w=600&q=80',
    description: 'Concentrated cold-pressed botanical bars replacing 4 plastic shampoo bottles. 100% biodegradable runoff safe.'
  },
  {
    id: 'p11',
    name: 'Loofah & Kitchen Scrubbers Pack',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 15.00,
    material: 'Home Compostable',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    description: 'Natural plant gourd scrubbers for zero-microplastic dishwashing and body exfoliation.'
  },
  {
    id: 'p12',
    name: 'Refillable Glass Eco-Cleaner Set',
    category: 'biodegradable',
    categoryLabel: 'Biodegradable Everyday',
    price: 26.00,
    material: 'Zero Single-Use Plastic',
    saplingBadge: '🌱 Plants 1 Sapling',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    description: 'Amber glass spray bottle with 3 dissolvable non-toxic plant powder concentrate pods.'
  }
];

// Initialize DOM Events when page loads
document.addEventListener('DOMContentLoaded', () => {
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

// 4 Page View Switcher Function
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

  if (pageId === 'cardView') {
    renderCardPage();
  } else if (pageId === 'shippingView') {
    renderShippingPage();
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

// Mobile Navigation Drawer Toggle
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navMenu');
  btn.addEventListener('click', () => {
    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '80px';
      menu.style.left = '0';
      menu.style.right = '0';
      menu.style.background = '#ffffff';
      menu.style.padding = '20px';
      menu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
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
        <span class="badge-material">${product.material}</span>
        <span class="badge-sapling">${product.saplingBadge}</span>
        <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Quick View</button>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px; line-clamp: 2; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;">
          ${product.description}
        </p>
        <div class="product-meta">
          <span class="product-price">$${product.price.toFixed(2)}</span>
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
        $${product.price.toFixed(2)}
      </div>
      <p style="font-size: 0.92rem; color: var(--color-text-muted); margin-bottom: 16px;">
        ${product.description}
      </p>
      <div style="background-color: var(--color-forest-pale); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 700; color: var(--color-forest-dark); margin-bottom: 18px;">
        <i class="fa-solid fa-tree"></i> Includes guaranteed 1 Native Tree Planting & +${Math.round(product.price * 1.5)} Eco Points
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

  const earnedPoints = Math.round(product.price * 1.5);
  appState.userPoints += earnedPoints;
  appState.userTrees += 1;
  appState.userCo2Offset += 22;

  appState.treesList.unshift({
    species: product.name.includes('Denim') ? 'Redwood Sapling' : 'Coastal Mangrove',
    location: `Eco-Restoration Zone (37.7749° N, 122.4194° W)`,
    date: new Date().toISOString().split('T')[0],
    co2Rate: '22 kg/yr'
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
    document.getElementById('cartSubtotal').textContent = '$0.00';
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
        <div style="font-size: 0.85rem; color: var(--color-terracotta); font-weight: 700;">$${item.product.price.toFixed(2)} x ${item.quantity}</div>
      </div>
      <button onclick="removeFromCart(${index})" style="color: var(--color-text-light); font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
    `;
    body.appendChild(row);
  });

  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartSaplingsCount').textContent = totalTrees;
  document.getElementById('cartPointsEarned').textContent = Math.round(subtotal * 1.5);
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
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-terracotta); margin-top: 4px;">$${item.product.price.toFixed(2)}</div>
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
  const discountAmount = (appState.redeemedPoints / 100) * 5.00;
  document.getElementById('redeemPointsLabel').textContent = `${appState.redeemedPoints} pts (-$${discountAmount.toFixed(2)})`;
  calculateCardTotals();
}

function calculateCardTotals() {
  let subtotal = 0;
  let totalTrees = 0;

  appState.cart.forEach(item => {
    subtotal += item.product.price * item.quantity;
    totalTrees += item.quantity;
  });

  const discountAmount = (appState.redeemedPoints / 100) * 5.00;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  document.getElementById('cardSubtotalVal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cardTreesCount').textContent = `${totalTrees} Tree(s)`;
  document.getElementById('cardDiscountVal').textContent = `-$${discountAmount.toFixed(2)}`;
  document.getElementById('cardTotalVal').textContent = `$${finalTotal.toFixed(2)}`;
  document.getElementById('cardAvailablePoints').textContent = appState.userPoints;

  // Sync with Shipping Page Summary
  document.getElementById('shippingSubtotalVal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('shippingDiscountVal').textContent = `-$${discountAmount.toFixed(2)}`;
  document.getElementById('shippingTotalVal').textContent = `$${finalTotal.toFixed(2)}`;
}

function renderShippingPage() {
  calculateCardTotals();
}

function handleShippingOrderSubmit(e) {
  e.preventDefault();
  if (appState.cart.length === 0) {
    showToast('Your cart is empty! Please add products first.');
    switchPage('landingView');
    return;
  }

  appState.userPoints = Math.max(0, appState.userPoints - appState.redeemedPoints);
  appState.cart = [];
  appState.redeemedPoints = 0;

  updateProfileUI();
  renderCartDrawer();
  renderCardPage();
  openModal('orderSuccessModal');
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
  const rate = parseFloat(document.getElementById('takebackItemType').value) || 15;
  const qty = parseFloat(document.getElementById('takebackQty').value) || 1;
  const credit = (rate * qty).toFixed(2);
  const pts = Math.round(rate * qty * 10);
  
  const text = `Estimated Credit Reward: $${credit} Store Credit + ${pts} Eco Points`;
  document.getElementById('estimatorResultPill').textContent = text;
  document.getElementById('modalPayoutEst').textContent = `$${credit} Store Credit + ${pts} Eco Points`;
}

function selectOutlet(index) {
  showToast(`Selected Disposal Outlet: ${appState.outlets[index].name}`);
}

function handleCourierSubmit(e) {
  e.preventDefault();
  closeModal('courierModal');
  appState.userPoints += 200;
  updateProfileUI();
  showToast('📦 Prepaid Take-Back Courier Pass generated! $30.00 Credit reserved pending scan.');
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
