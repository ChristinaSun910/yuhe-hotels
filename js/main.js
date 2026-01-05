// 轮播图功能
class Carousel {
    constructor() {
        this.slides = document.querySelector('.carousel-slides');
        this.slidesCount = document.querySelectorAll('.carousel-slide').length;
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5秒自动轮播
        
        this.init();
    }
    
    init() {
        // 设置初始位置
        this.updateSlidePosition();
        
        // 添加事件监听
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 为每个指示器添加点击事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 开始自动轮播
        this.startAutoSlide();
        
        // 鼠标悬停时暂停自动轮播
        document.querySelector('.carousel').addEventListener('mouseenter', () => this.stopAutoSlide());
        document.querySelector('.carousel').addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    updateSlidePosition() {
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // 更新指示器状态
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slidesCount) % this.slidesCount;
        this.updateSlidePosition();
        this.resetAutoSlide();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slidesCount;
        this.updateSlidePosition();
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlidePosition();
        this.resetAutoSlide();
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// 移动端菜单切换
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 关闭移动端菜单当点击链接时
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// 设置默认日期为今天和明天
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

document.getElementById('checkin').value = formatDate(today);
document.getElementById('checkin').min = formatDate(today);
document.getElementById('checkout').value = formatDate(tomorrow);
document.getElementById('checkout').min = formatDate(tomorrow);

// 入住日期变化时，离店日期的最小值设置为入住日期的下一天
document.getElementById('checkin').addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    const minCheckoutDate = new Date(checkinDate);
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    document.getElementById('checkout').min = formatDate(minCheckoutDate);
    
    // 如果当前离店日期早于新的最小日期，则更新离店日期
    const checkoutDate = new Date(document.getElementById('checkout').value);
    if (checkoutDate <= checkinDate) {
        document.getElementById('checkout').value = formatDate(minCheckoutDate);
    }
});

// 酒店筛选功能
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // 更新激活状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // 获取筛选条件
        const filter = this.getAttribute('data-filter');
        
        // 筛选酒店卡片
        document.querySelectorAll('.hotel-card').forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const categories = card.getAttribute('data-category');
                if (categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// 从酒店卡片点击"立即预订"时，自动选择对应酒店
document.querySelectorAll('.hotel-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const hotelName = this.getAttribute('data-hotel');
        document.getElementById('hotel-select').value = hotelName;
        
        // 滚动到预订区域
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
});

// 表单提交处理
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hotel = document.getElementById('hotel-select').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const rooms = document.getElementById('rooms').value;
    const name = document.getElementById('name').value;
    
    // 在实际应用中，这里会发送数据到服务器
    // 这里只是模拟一个成功的预订请求
    alert(`预订请求已提交！\n\n酒店: ${hotel}\n入住日期: ${checkin}\n离店日期: ${checkout}\n住客人数: ${guests}人\n房间数量: ${rooms}间\n预订人: ${name}\n\n我们的客服人员将在24小时内与您联系确认预订详情。`);
    
    // 重置表单
    this.reset();
    
    // 重置日期
    document.getElementById('checkin').value = formatDate(today);
    document.getElementById('checkout').value = formatDate(tomorrow);
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
});

// 初始化轮播图
const carousel = new Carousel();

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});