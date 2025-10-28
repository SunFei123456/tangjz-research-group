// ==========================================
// 导航栏功能
// ==========================================
function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}

// jQuery初始化
$(document).ready(function () {
    setTimeout(function () { test(); });
});

$(window).on('resize', function () {
    setTimeout(function () { test(); }, 500);
});

$(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () { test(); });
});

// 确保移动端默认收起导航栏
$(window).on('load resize', function() {
    if ($(window).width() <= 991) {
        $(".navbar-collapse").hide();
    } else {
        $(".navbar-collapse").show();
    }
});

// ==========================================
// 导航菜单吸顶效果
// ==========================================
let navbarContentInitialOffset = null;
let ticking = false;

function updateStickyNav() {
    const navbarContent = document.getElementById('navbarSupportedContent');
    const navbar = document.querySelector('.navbar-mainbg');

    // 记录初始位置
    if (navbarContentInitialOffset === null && navbarContent) {
        navbarContentInitialOffset = navbarContent.getBoundingClientRect().top + window.scrollY;
    }

    // 使用 requestAnimationFrame 优化性能
    if (!ticking) {
        window.requestAnimationFrame(function () {
            // 当滚动到菜单位置时，固定它
            if (window.scrollY >= navbarContentInitialOffset) {
                navbarContent.classList.add('sticky');
                navbar.classList.add('has-sticky-nav');
            } else {
                navbarContent.classList.remove('sticky');
                navbar.classList.remove('has-sticky-nav');
            }
            ticking = false;
        });
        ticking = true;
    }
}

// 使用节流优化滚动事件
window.addEventListener('scroll', updateStickyNav, { passive: true });

// ==========================================
// 时间更新功能
// ==========================================
function updateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long'
    };
    const dateStr = now.toLocaleDateString('zh-CN', options);
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = dateStr;
    }
}

// ==========================================
// 轮播图功能
// ==========================================
function moveToSelected(element) {
    const selected = typeof element === 'string'
        ? (element === 'next' ? document.querySelector('#carousel .selected').nextElementSibling
            : document.querySelector('#carousel .selected').previousElementSibling)
        : element;

    if (!selected) return;

    const next = selected.nextElementSibling;
    const prev = selected.previousElementSibling;
    const nextSecond = next ? next.nextElementSibling : null;
    const prevSecond = prev ? prev.previousElementSibling : null;

    const all = Array.from(document.querySelectorAll('#carousel > div'));
    all.forEach(el => el.className = '');

    selected.classList.add('selected');
    if (prev) prev.classList.add('prev');
    if (next) next.classList.add('next');
    if (prevSecond) prevSecond.classList.add('prevLeftSecond');
    if (nextSecond) nextSecond.classList.add('nextRightSecond');

    let el = nextSecond ? nextSecond.nextElementSibling : (next ? next.nextElementSibling : null);
    while (el) {
        el.classList.add('hideRight');
        el = el.nextElementSibling;
    }
    el = prevSecond ? prevSecond.previousElementSibling : (prev ? prev.previousElementSibling : null);
    while (el) {
        el.classList.add('hideLeft');
        el = el.previousElementSibling;
    }
}

// ==========================================
// 页面初始化
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // 绑定键盘导航
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            moveToSelected('prev');
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            moveToSelected('next');
            e.preventDefault();
        }
    });

    // 绑定轮播图点击
    document.querySelectorAll('#carousel > div').forEach(function (div) {
        div.addEventListener('click', function () {
            moveToSelected(this);
        });
    });

    // 绑定轮播图按钮
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            moveToSelected('prev');
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            moveToSelected('next');
        });
    }

    // 初始化其他功能
    updateTime();
});

