// Watch customization data
const watchData = {
    faces: [
        { id: 'classic-white', name: 'Classic White', color: '#FFFFFF', price: 50 },
        { id: 'midnight-black', name: 'Midnight Black', color: '#1F2937', price: 60 },
        { id: 'navy-blue', name: 'Navy Blue', color: '#1E40AF', price: 65 },
        { id: 'forest-green', name: 'Forest Green', color: '#059669', price: 65 },
        { id: 'burgundy', name: 'Burgundy', color: '#991B1B', price: 70 },
        { id: 'champagne', name: 'Champagne', color: '#FEF3C7', price: 85 },
        { id: 'mother-pearl', name: 'Mother of Pearl', color: '#F8FAFC', pattern: 'pearl', price: 120 },
        { id: 'carbon-fiber', name: 'Carbon Fiber', color: '#374151', pattern: 'carbon', price: 150 },
    ],
    hands: [
        { id: 'classic-silver', name: 'Classic Silver', style: 'classic', color: '#94A3B8', price: 25 },
        { id: 'gold-elegant', name: 'Gold Elegant', style: 'elegant', color: '#F59E0B', price: 45 },
        { id: 'black-modern', name: 'Black Modern', style: 'modern', color: '#1F2937', price: 35 },
        { id: 'rose-gold', name: 'Rose Gold', style: 'elegant', color: '#EC4899', price: 50 },
        { id: 'blue-steel', name: 'Blue Steel', style: 'sport', color: '#3B82F6', price: 40 },
        { id: 'luminous-white', name: 'Luminous White', style: 'sport', color: '#F9FAFB', price: 55 },
    ],
    cases: [
        { id: 'steel-40mm', name: 'Stainless Steel 40mm', material: 'Steel', color: '#94A3B8', size: '40mm', price: 200 },
        { id: 'gold-40mm', name: 'Gold 40mm', material: 'Gold', color: '#F59E0B', size: '40mm', price: 800 },
        { id: 'black-40mm', name: 'Black Steel 40mm', material: 'Steel', color: '#1F2937', size: '40mm', price: 250 },
        { id: 'rose-gold-38mm', name: 'Rose Gold 38mm', material: 'Rose Gold', color: '#EC4899', size: '38mm', price: 750 },
        { id: 'titanium-42mm', name: 'Titanium 42mm', material: 'Titanium', color: '#6B7280', size: '42mm', price: 600 },
        { id: 'ceramic-40mm', name: 'Ceramic 40mm', material: 'Ceramic', color: '#F9FAFB', size: '40mm', price: 450 },
    ],
    straps: [
        { id: 'leather-black', name: 'Black Leather', material: 'Leather', color: '#1F2937', texture: 'smooth', price: 80 },
        { id: 'leather-brown', name: 'Brown Leather', material: 'Leather', color: '#92400E', texture: 'grain', price: 85 },
        { id: 'metal-silver', name: 'Silver Metal', material: 'Metal', color: '#94A3B8', price: 120 },
        { id: 'metal-gold', name: 'Gold Metal', material: 'Metal', color: '#F59E0B', price: 180 },
        { id: 'nato-blue', name: 'NATO Blue', material: 'Nylon', color: '#1E40AF', price: 45 },
        { id: 'nato-green', name: 'NATO Green', material: 'Nylon', color: '#059669', price: 45 },
        { id: 'rubber-black', name: 'Sport Rubber Black', material: 'Rubber', color: '#1F2937', price: 60 },
        { id: 'milanese-silver', name: 'Milanese Silver', material: 'Metal', color: '#94A3B8', texture: 'mesh', price: 150 },
    ],
    markers: [
        { id: 'roman-silver', name: 'Roman Silver', style: 'roman', color: '#94A3B8', price: 30 },
        { id: 'arabic-gold', name: 'Arabic Gold', style: 'arabic', color: '#F59E0B', price: 35 },
        { id: 'indices-white', name: 'Indices White', style: 'indices', color: '#F9FAFB', price: 25 },
        { id: 'diamonds', name: 'Diamond Markers', style: 'diamonds', color: '#F9FAFB', price: 500 },
        { id: 'dots-luminous', name: 'Luminous Dots', style: 'dots', color: '#10B981', price: 40 },
        { id: 'minimalist', name: 'Minimalist Lines', style: 'lines', color: '#6B7280', price: 20 },
    ]
};

// Current customization state
let currentCustomization = {
    face: watchData.faces[0],
    hands: watchData.hands[0],
    case: watchData.cases[0],
    strap: watchData.straps[0],
    markers: watchData.markers[0]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    renderWatch();
    renderOptions('face');
    renderPriceDisplay();
});

// Tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Render options for selected tab
            renderOptions(tabType);
        });
    });
}

// Render customization options
function renderOptions(type) {
    const optionsGrid = document.getElementById('optionsGrid');
    const options = watchData[type + 's'] || watchData[type];
    
    optionsGrid.innerHTML = '';
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = `option ${currentCustomization[type].id === option.id ? 'selected' : ''}`;
        optionElement.onclick = () => selectOption(type, option);
        
        let previewContent = '';
        if (type === 'face') {
            previewContent = `<div class="option-preview" style="background-color: ${option.color};"></div>`;
        } else if (type === 'hands') {
            previewContent = `
                <div class="option-preview" style="background-color: #1F2937; position: relative;">
                    <div style="position: absolute; top: 50%; left: 50%; width: 2px; height: 20px; background-color: ${option.color}; transform: translate(-50%, -100%) rotate(45deg); transform-origin: bottom;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; width: 1px; height: 24px; background-color: ${option.color}; transform: translate(-50%, -100%) rotate(120deg); transform-origin: bottom;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; width: 4px; height: 4px; background-color: ${option.color}; border-radius: 50%; transform: translate(-50%, -50%);"></div>
                </div>
            `;
        } else if (type === 'case') {
            previewContent = `<div class="option-preview" style="border-color: ${option.color}; background-color: rgba(0,0,0,0.3);"></div>`;
        } else if (type === 'strap') {
            previewContent = `<div class="option-preview" style="background-color: ${option.color}; border-radius: 20px; height: 20px;"></div>`;
        } else if (type === 'markers') {
            let markerSymbol = '12';
            if (option.style === 'roman') markerSymbol = 'XII';
            else if (option.style === 'indices') markerSymbol = '|';
            else if (option.style === 'diamonds') markerSymbol = '◊';
            else if (option.style === 'dots') markerSymbol = '●';
            else if (option.style === 'lines') markerSymbol = '—';
            
            previewContent = `
                <div class="option-preview" style="background-color: #1F2937; display: flex; align-items: center; justify-content: center; color: ${option.color}; font-weight: bold;">
                    ${markerSymbol}
                </div>
            `;
        }
        
        optionElement.innerHTML = `
            ${previewContent}
            <div class="option-name">${option.name}</div>
            ${option.material ? `<div class="option-material">${option.material}</div>` : ''}
            <div class="option-price">₹${option.price}</div>
        `;
        
        optionsGrid.appendChild(optionElement);
    });
}

// Select an option
function selectOption(type, option) {
    currentCustomization[type] = option;
    renderWatch();
    renderOptions(type);
    renderPriceDisplay();
}

// Render the watch display
function renderWatch() {
    const watchDisplay = document.getElementById('watchDisplay');
    const { face, hands, case: watchCase, strap, markers } = currentCustomization;
    
    // Get pattern styles for face
    let faceStyle = `background-color: ${face.color};`;
    if (face.pattern === 'pearl') {
        faceStyle = `
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 1px, transparent 1px),
                       radial-gradient(circle at 70% 70%, rgba(255,255,255,0.7) 1px, transparent 1px),
                       radial-gradient(circle at 20% 80%, rgba(255,255,255,0.5) 1px, transparent 1px),
                       ${face.color};
            background-size: 12px 12px, 8px 8px, 10px 10px;
        `;
    } else if (face.pattern === 'carbon') {
        faceStyle = `
            background: linear-gradient(45deg, ${face.color} 25%, transparent 25%),
                       linear-gradient(-45deg, ${face.color} 25%, transparent 25%),
                       linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
                       linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%);
            background-size: 3px 3px;
            background-position: 0 0, 0 1.5px, 1.5px -1.5px, -1.5px 0px;
        `;
    }
    
    // Get strap texture
    let strapStyle = `background-color: ${strap.color};`;
    if (strap.material === 'Metal' && strap.texture === 'mesh') {
        strapStyle = `
            background: linear-gradient(90deg, ${strap.color} 0.5px, transparent 0.5px),
                       linear-gradient(${strap.color} 0.5px, transparent 0.5px);
            background-size: 1.5px 1.5px;
        `;
    } else if (strap.texture === 'grain') {
        strapStyle = `
            background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.2) 0.5px, transparent 0.5px),
                       ${strap.color};
            background-size: 3px 3px;
        `;
    }
    
    // Generate markers
    const markerPositions = [
        { hour: 12, x: 50, y: 12 },
        { hour: 1, x: 75, y: 20 },
        { hour: 2, x: 88, y: 35 },
        { hour: 3, x: 88, y: 50 },
        { hour: 4, x: 88, y: 65 },
        { hour: 5, x: 75, y: 80 },
        { hour: 6, x: 50, y: 88 },
        { hour: 7, x: 25, y: 80 },
        { hour: 8, x: 12, y: 65 },
        { hour: 9, x: 12, y: 50 },
        { hour: 10, x: 12, y: 35 },
        { hour: 11, x: 25, y: 20 },
    ];
    
    let markersHtml = '';
    markerPositions.forEach(({ hour, x, y }) => {
        let markerContent = '';
        const isMajor = [12, 3, 6, 9].includes(hour);
        
        if (markers.style === 'roman' && isMajor) {
            const romanNumerals = { 12: 'XII', 3: 'III', 6: 'VI', 9: 'IX' };
            markerContent = `<span class="marker roman" style="left: ${x}%; top: ${y}%; color: ${markers.color};">${romanNumerals[hour]}</span>`;
        } else if (markers.style === 'arabic' && isMajor) {
            markerContent = `<span class="marker arabic" style="left: ${x}%; top: ${y}%; color: ${markers.color};">${hour}</span>`;
        } else if (markers.style === 'indices') {
            markerContent = `<div class="marker indices ${isMajor ? 'major' : 'minor'}" style="left: ${x}%; top: ${y}%; background-color: ${markers.color};"></div>`;
        } else if (markers.style === 'diamonds') {
            markerContent = `<div class="marker diamonds" style="left: ${x}%; top: ${y}%; background-color: ${markers.color};"></div>`;
        } else if (markers.style === 'dots') {
            markerContent = `<div class="marker dots ${isMajor ? 'major' : 'minor'}" style="left: ${x}%; top: ${y}%; background-color: ${markers.color};"></div>`;
        } else if (markers.style === 'lines') {
            markerContent = `<div class="marker lines ${isMajor ? 'major' : 'minor'}" style="left: ${x}%; top: ${y}%; background-color: ${markers.color};"></div>`;
        }
        
        markersHtml += markerContent;
    });
    
    watchDisplay.innerHTML = `
        <div class="watch-container">
            <div class="watch-strap" style="${strapStyle}"></div>
            <div class="watch-case" style="background-color: ${watchCase.color}; border-color: ${watchCase.color};">
                <div class="watch-face" style="${faceStyle}">
                    <div class="watch-markers">
                        ${markersHtml}
                    </div>
                    <div class="watch-hands">
                        <div class="watch-hand hour-hand" style="background-color: ${hands.color};"></div>
                        <div class="watch-hand minute-hand" style="background-color: ${hands.color};"></div>
                    </div>
                    <div class="center-dot" style="background-color: ${hands.color};"></div>
                </div>
                <div class="crown" style="background-color: ${watchCase.color};"></div>
            </div>
        </div>
        <div class="watch-details">
            <h2 class="watch-title">Bespoke Timepiece</h2>
            <div class="watch-specs">
                <p>${watchCase.material} ${watchCase.size} • Swiss Movement</p>
                <p style="font-size: 14px; color: #9ca3af;">${strap.material} Strap • ${markers.name}</p>
            </div>
            <div class="watch-features">
                <span>Water Resistant 100m</span>
                <span>•</span>
                <span>Sapphire Crystal</span>
                <span>•</span>
                <span>Swiss Made</span>
            </div>
        </div>
    `;
}

// Render price display
function renderPriceDisplay() {
    const priceDisplay = document.getElementById('priceDisplay');
    const { face, hands, case: watchCase, strap, markers } = currentCustomization;
    
    const totalPrice = face.price + hands.price + watchCase.price + strap.price + markers.price;
    const basePrice = 1299;
    const finalPrice = totalPrice + basePrice;
    
    priceDisplay.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">Your Masterpiece</h3>
            <p class="card-subtitle">Handcrafted Swiss Excellence</p>
        </div>
        
        <div class="price-breakdown">
            <div class="price-item">
                <span class="price-item-name">Face: ${face.name}</span>
                <span class="price-item-value">₹${face.price}</span>
            </div>
            <div class="price-item">
                <span class="price-item-name">Hands: ${hands.name}</span>
                <span class="price-item-value">₹${hands.price}</span>
            </div>
            <div class="price-item">
                <span class="price-item-name">Case: ${watchCase.name}</span>
                <span class="price-item-value">₹${watchCase.price}</span>
            </div>
            <div class="price-item">
                <span class="price-item-name">Strap: ${strap.name}</span>
                <span class="price-item-value">₹${strap.price}</span>
            </div>
            <div class="price-item">
                <span class="price-item-name">Markers: ${markers.name}</span>
                <span class="price-item-value">₹${markers.price}</span>
            </div>
            <div class="price-item" style="border-bottom: 1px solid #6b7280;">
                <span class="price-item-name">Swiss Movement & Assembly</span>
                <span class="price-item-value">₹${basePrice}</span>
            </div>
        </div>
        
        <div class="price-total">
            <div class="price-total-row">
                <span class="price-total-label">Total Investment</span>
                <span class="price-total-value">₹${finalPrice.toLocaleString()}</span>
            </div>
            <p class="price-note">Includes lifetime warranty & certification</p>
        </div>
        
        <div class="action-buttons">
            <button class="btn-primary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Commission Timepiece
            </button>
            
            <div class="secondary-buttons">
                <button class="btn-secondary">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Save
                </button>
                <button class="btn-secondary">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16,6 12,2 8,6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
        
        <div class="guarantees">
            <div class="guarantee">
                <svg class="guarantee-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                </svg>
                <span>Lifetime warranty & authenticity guarantee</span>
            </div>
            <div class="guarantee">
                <svg class="guarantee-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Complimentary worldwide shipping & insurance</span>
            </div>
            <div class="guarantee">
                <svg class="guarantee-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
                <span>Swiss certified chronometer movement</span>
            </div>
        </div>
        
        <div class="delivery-info">
            <p>⏱️ Estimated crafting time: 6-8 weeks</p>
            <p>Each timepiece is individually numbered & certified</p>
        </div>
    `;
}