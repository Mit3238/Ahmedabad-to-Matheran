// Budget trip website JavaScript functionality

// Trip data from the provided JSON
const tripData = {
    "Budget Trip": {
        "transport": 5415,
        "accommodation": 3867,
        "activities": 2149,
        "food": 1300,
        "grand_total": 12731
    },
    "Mid-Range Trip": {
        "transport": 6255,
        "accommodation": 4775,
        "activities": 4649,
        "food": 1900,
        "grand_total": 17579
    },
    "Premium Trip": {
        "transport": 7350,
        "accommodation": 14568,
        "activities": 2850,
        "food": 1900,
        "grand_total": 26668
    }
};

// Chart instance
let costChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeBudgetSelector();
    initializeChart();
    initializeDayCards();
    initializeActivityFilters();
    initializeBottomNavigation();
    initializeChecklist();
    setTimeout(initializeAnimations, 100);
});

// Budget selector functionality
function initializeBudgetSelector() {
    const budgetOptions = document.querySelectorAll('.budget-option');
    
    budgetOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all options
            budgetOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get budget type
            const budgetType = this.dataset.budget;
            let budgetKey;
            
            switch(budgetType) {
                case 'budget':
                    budgetKey = 'Budget Trip';
                    break;
                case 'mid-range':
                    budgetKey = 'Mid-Range Trip';
                    break;
                case 'premium':
                    budgetKey = 'Premium Trip';
                    break;
                default:
                    budgetKey = 'Mid-Range Trip';
            }
            
            // Update cost breakdown with smooth transition
            updateCostBreakdown(budgetKey);
        });
    });
}

// Update cost breakdown display and chart
function updateCostBreakdown(budgetType) {
    const data = tripData[budgetType];
    
    // Update cost values with animation
    const elements = [
        { id: 'transport-cost', value: data.transport },
        { id: 'accommodation-cost', value: data.accommodation },
        { id: 'activities-cost', value: data.activities },
        { id: 'food-cost', value: data.food }
    ];
    
    elements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.textContent = `₹${item.value.toLocaleString('en-IN')}`;
                element.style.opacity = '1';
            }, 150);
        }
    });
    
    // Update chart
    if (costChart) {
        costChart.data.datasets[0].data = [
            data.transport,
            data.accommodation,
            data.activities,
            data.food
        ];
        costChart.update('active');
    }
}

// Initialize Chart.js pie chart
function initializeChart() {
    const chartCanvas = document.getElementById('costChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // Default to mid-range data
    const defaultData = tripData['Mid-Range Trip'];
    
    costChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Transport', 'Accommodation', 'Activities', 'Food'],
            datasets: [{
                data: [
                    defaultData.transport,
                    defaultData.accommodation,
                    defaultData.activities,
                    defaultData.food
                ],
                backgroundColor: [
                    '#1FB8CD',
                    '#FFC185', 
                    '#B4413C',
                    '#5D878F'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                animateRotate: true,
                animateScale: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12,
                            family: 'FKGroteskNeue, sans-serif'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Day cards expand/collapse functionality
function initializeDayCards() {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        const header = card.querySelector('.day-card__header');
        const expandBtn = card.querySelector('.expand-btn');
        const content = card.querySelector('.day-card__content');
        
        if (header && expandBtn && content) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other expanded cards first
                dayCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                        const otherBtn = otherCard.querySelector('.expand-btn');
                        if (otherBtn) otherBtn.textContent = '+';
                    }
                });
                
                // Toggle current card
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    expandBtn.textContent = '+';
                } else {
                    card.classList.add('expanded');
                    expandBtn.textContent = '−';
                    
                    // Smooth scroll to make sure the expanded content is visible
                    setTimeout(() => {
                        const rect = card.getBoundingClientRect();
                        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                        
                        if (!isFullyVisible) {
                            card.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'nearest' 
                            });
                        }
                    }, 300);
                }
            });
        }
    });
}

// Activity filters functionality
function initializeActivityFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter;
            
            // Filter activity cards with smooth transition
            activityCards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.location === filter;
                
                if (shouldShow) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 200);
                }
            });
        });
    });
}

// Bottom navigation functionality
function initializeBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const targetSection = this.dataset.section;
            const section = document.querySelector(`.${targetSection}`);
            
            if (section) {
                // Smooth scroll to section
                const headerOffset = 80;
                const elementPosition = section.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav item on scroll (debounced)
    window.addEventListener('scroll', debounce(updateActiveNavItem, 100));
}

// Update active navigation item based on scroll position
function updateActiveNavItem() {
    const sections = [
        { element: document.querySelector('.budget-section'), nav: 'budget-section' },
        { element: document.querySelector('.itinerary-section'), nav: 'itinerary-section' },
        { element: document.querySelector('.activities-section'), nav: 'activities-section' },
        { element: document.querySelector('.monsoon-section'), nav: 'monsoon-section' }
    ];
    
    const scrollPosition = window.scrollY + 150;
    let activeSection = null;
    
    sections.forEach(section => {
        if (section.element) {
            const sectionTop = section.element.offsetTop;
            const sectionBottom = sectionTop + section.element.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.nav;
            }
        }
    });
    
    if (activeSection) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        // Add active class to current section nav item
        const activeNav = document.querySelector(`[data-section="${activeSection}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }
}

// Checklist functionality
function initializeChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    checklistItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (e.target.type !== 'checkbox') {
                checkbox.checked = !checkbox.checked;
            }
            
            // Add visual feedback with smooth transition
            if (checkbox.checked) {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0.7';
                item.style.textDecoration = 'line-through';
            } else {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.textDecoration = 'none';
            }
        });
    });
}

// Add intersection observer for fade-in animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.budget-option, .day-card, .activity-card, .tip-card, .transport-card');
    
    fadeElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(el);
    });
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for chart responsiveness
window.addEventListener('resize', debounce(function() {
    if (costChart) {
        costChart.resize();
    }
}, 250));

// Remove parallax effect that was causing issues
// window.addEventListener('scroll', function() {
//     const hero = document.querySelector('.hero');
//     const scrolled = window.pageYOffset;
//     const rate = scrolled * -0.5;
//     
//     if (hero) {
//         hero.style.transform = `translateY(${rate}px)`;
//     }
// });

// Error handling
window.addEventListener('error', function(e) {
    console.log('An error occurred:', e.error);
});

// Handle chart errors gracefully
function handleChartError() {
    const chartContainer = document.querySelector('.cost-chart-container');
    if (chartContainer && !costChart) {
        chartContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Chart loading...</p>';
    }
}

// Utility function to format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Initialize loading state
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent default behavior on certain elements to avoid unwanted navigation
document.addEventListener('click', function(e) {
    // Prevent default on expand buttons
    if (e.target.classList.contains('expand-btn')) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Prevent default on filter buttons
    if (e.target.classList.contains('filter-btn')) {
        e.preventDefault();
        e.stopPropagation();
    }
});