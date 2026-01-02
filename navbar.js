/**
 * 章鱼工具集 - 通用导航条脚本
 * 统一管理所有页面的导航条，方便维护和更新
 */

class OctopusNavbar {
    constructor() {
        this.config = {
            brand: {
                text: '🐙 章鱼工具集',
                href: 'index.html'
            },
            navItems: [
                { href: 'index.html', text: '🏠 首页', id: 'home' },
                { href: 'index-1.html', text: '📝 文本分割器', id: 'text-splitter' },
                { href: 'index-2.html', text: '🔢 字数统计器', id: 'word-counter' },
                { href: 'index-3.html', text: '📺 智能提词器', id: 'teleprompter' },
                { href: 'index-4.html', text: '💰 ROI计算器', id: 'roi-calculator' },
                { href: 'index-5.html', text: '🎵 音频播放器', id: 'audio-player' }
            ]
        };
        
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    /**
     * 获取当前页面
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }
    
    /**
     * 初始化导航条
     */
    init() {
        this.injectStyles();
        this.createNavbar();
        this.bindEvents();
        this.adjustBodyPadding();
    }
    
    /**
     * 注入导航条样式
     */
    injectStyles() {
        const styleId = 'octopus-navbar-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* 导航条样式 */
            .octopus-navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 1000;
                padding: 15px 0;
                animation: slideDown 0.6s ease-out;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .octopus-navbar-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
            }
            
            .octopus-navbar-brand {
                font-size: 1.2rem;
                font-weight: 700;
                color: #00f5ff;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                animation: brandGlow 3s ease-in-out infinite;
            }
            
            @keyframes brandGlow {
                0%, 100% {
                    text-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
                }
                50% {
                    text-shadow: 0 0 20px rgba(0, 245, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.3);
                }
            }
            
            .octopus-navbar-brand:hover {
                transform: scale(1.1) rotate(5deg);
                text-shadow: 0 0 25px rgba(0, 245, 255, 1), 0 0 35px rgba(255, 0, 255, 0.5);
                animation: brandBounce 0.6s ease;
            }
            
            @keyframes brandBounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: scale(1.1) rotate(5deg) translateY(0);
                }
                40% {
                    transform: scale(1.15) rotate(5deg) translateY(-5px);
                }
                60% {
                    transform: scale(1.05) rotate(5deg) translateY(-2px);
                }
            }
            
            .octopus-navbar-nav {
                display: flex;
                list-style: none;
                gap: 30px;
                margin: 0;
                padding: 0;
            }
            
            .octopus-navbar-nav a {
                color: #a0a0a0;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.9rem;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                padding: 8px 16px;
                border-radius: 8px;
                position: relative;
                overflow: hidden;
            }
            
            .octopus-navbar-nav a::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.2), transparent);
                transition: left 0.6s ease;
                pointer-events: none;
            }
            
            .octopus-navbar-nav a:hover::before {
                left: 100%;
            }
            
            .octopus-navbar-nav a:hover {
                color: #00f5ff;
                background: rgba(0, 245, 255, 0.1);
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 8px 25px rgba(0, 245, 255, 0.3);
                text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
            }
            
            .octopus-navbar-nav a.active {
                color: #00f5ff;
                background: rgba(0, 245, 255, 0.15);
                box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
                }
                50% {
                    box-shadow: 0 0 25px rgba(0, 245, 255, 0.6);
                }
            }
            
            .octopus-navbar-toggle {
                display: none;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .octopus-navbar-toggle:hover {
                color: #00f5ff;
                transform: scale(1.2) rotate(180deg);
                background: rgba(0, 245, 255, 0.1);
                box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
            }
            
            .octopus-navbar-toggle.active {
                transform: rotate(90deg);
                color: #ff00ff;
            }
            
            /* 响应式设计 */
            @media (max-width: 768px) {
                .octopus-navbar-nav {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    background: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(20px);
                    flex-direction: column;
                    padding: 20px;
                    gap: 15px;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                
                .octopus-navbar-nav.active {
                    transform: translateX(0);
                }
                
                .octopus-navbar-toggle {
                    display: block;
                }
                
                .octopus-navbar-nav a {
                    width: 100%;
                    text-align: center;
                    padding: 12px 20px;
                    border-radius: 12px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * 创建导航条HTML
     */
    createNavbar() {
        // 检查是否已存在导航条
        const existingNavbar = document.querySelector('.octopus-navbar');
        if (existingNavbar) {
            existingNavbar.remove();
        }
        
        const navbar = document.createElement('nav');
        navbar.className = 'octopus-navbar';
        
        const container = document.createElement('div');
        container.className = 'octopus-navbar-container';
        
        // 创建品牌链接
        const brand = document.createElement('a');
        brand.href = this.config.brand.href;
        brand.className = 'octopus-navbar-brand';
        brand.textContent = this.config.brand.text;
        
        // 创建导航菜单
        const nav = document.createElement('ul');
        nav.className = 'octopus-navbar-nav';
        
        this.config.navItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            a.dataset.id = item.id;
            
            // 设置当前页面的active状态
            if (item.href === this.currentPage) {
                a.classList.add('active');
            }
            
            li.appendChild(a);
            nav.appendChild(li);
        });
        
        // 创建移动端切换按钮
        const toggle = document.createElement('button');
        toggle.className = 'octopus-navbar-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', '切换导航菜单');
        
        // 组装导航条
        container.appendChild(brand);
        container.appendChild(nav);
        container.appendChild(toggle);
        navbar.appendChild(container);
        
        // 插入到页面顶部
        document.body.insertBefore(navbar, document.body.firstChild);
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 移动端菜单切换
        const toggle = document.querySelector('.octopus-navbar-toggle');
        const nav = document.querySelector('.octopus-navbar-nav');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                
                // 切换按钮图标
                toggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
            });
        }
        
        // 点击导航链接后关闭移动端菜单
        document.querySelectorAll('.octopus-navbar-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav) {
                    nav.classList.remove('active');
                }
                if (toggle) {
                    toggle.innerHTML = '☰';
                }
            });
        });
        
        // 点击页面其他地方关闭移动端菜单
        document.addEventListener('click', (e) => {
            if (nav && toggle && 
                !nav.contains(e.target) && 
                !toggle.contains(e.target) && 
                nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.innerHTML = '☰';
            }
        });
        
        // ESC键关闭移动端菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav && toggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.innerHTML = '☰';
            }
        });
    }
    
    /**
     * 调整页面内容的顶部间距
     */
    adjustBodyPadding() {
        // 为页面内容添加顶部间距，避免被导航条遮挡
        const existingStyle = document.getElementById('octopus-body-padding');
        if (existingStyle) return;
        
        const style = document.createElement('style');
        style.id = 'octopus-body-padding';
        style.textContent = `
            body {
                padding-top: 80px !important;
            }
            
            @media (max-width: 768px) {
                body {
                    padding-top: 70px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * 更新导航配置
     * @param {Object} newConfig 新的配置对象
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.createNavbar();
        this.bindEvents();
    }
    
    /**
     * 添加导航项
     * @param {Object} item 导航项对象 {href, text, id}
     * @param {number} index 插入位置，默认添加到末尾
     */
    addNavItem(item, index = -1) {
        if (index === -1) {
            this.config.navItems.push(item);
        } else {
            this.config.navItems.splice(index, 0, item);
        }
        this.createNavbar();
        this.bindEvents();
    }
    
    /**
     * 移除导航项
     * @param {string} id 导航项ID
     */
    removeNavItem(id) {
        this.config.navItems = this.config.navItems.filter(item => item.id !== id);
        this.createNavbar();
        this.bindEvents();
    }
    
    /**
     * 设置当前活动页面
     * @param {string} href 页面链接
     */
    setActivePage(href) {
        this.currentPage = href;
        
        // 更新active状态
        document.querySelectorAll('.octopus-navbar-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
    
    /**
     * 销毁导航条
     */
    destroy() {
        const navbar = document.querySelector('.octopus-navbar');
        const styles = document.getElementById('octopus-navbar-styles');
        const bodyPadding = document.getElementById('octopus-body-padding');
        
        if (navbar) navbar.remove();
        if (styles) styles.remove();
        if (bodyPadding) bodyPadding.remove();
    }
}

// 自动初始化导航条
let octopusNavbar;

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        octopusNavbar = new OctopusNavbar();
    });
} else {
    octopusNavbar = new OctopusNavbar();
}

// 导出到全局作用域，方便其他脚本使用
window.OctopusNavbar = OctopusNavbar;
window.octopusNavbar = octopusNavbar;

// 兼容旧的toggleNavbar函数
window.toggleNavbar = function() {
    const nav = document.querySelector('.octopus-navbar-nav');
    const toggle = document.querySelector('.octopus-navbar-toggle');
    
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    }
};