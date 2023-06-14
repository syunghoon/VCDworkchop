const filterButtons = document.querySelectorAll('.filter-buttons button');
const imageItems = document.querySelectorAll('.item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        console.log(category);
        console.log('clicked');

        // 모든 이미지 항목을 숨김 처리
        imageItems.forEach(item => {
            item.style.display = 'none';
        });

        // 선택한 카테고리에 해당하는 이미지 항목만 보이도록 처리
        if (category === 'all') {
            imageItems.forEach(item => {
                item.style.display = 'flex';
            });
        } else {
            const filteredItems = document.querySelectorAll(`.item[data-categories*="${category}"]`);
            filteredItems.forEach(item => {
                item.style.display = 'flex';
            });
        }

        // 활성 버튼 스타일 변경
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        this.classList.add('active');
    });

    $('.item').mouseover(function () {
        const item = $(this);

        // 이미 캡션을 추가한 경우에는 추가적인 처리를 하지 않음
        if (item.data('captionAdded')) {
            return;
        }
        const captionDiv = item.find('.caption'); // 아이템 내에서 캡션 div를 찾습니다.
        const captionClone = captionDiv.clone(); // 캡션 div를 복사합니다.

        // 문서의 Mousemove 이벤트 핸들러
        $(document).mousemove(function (event) {
            const mouseX = event.clientX; // 마우스의 X 좌표
            const mouseY = event.clientY; // 마우스의 Y 좌표

            // 캡션의 위치를 body 좌표 기준으로 설정합니다.
            captionClone.css({
                top: mouseY + 50 + 'px',
                left: mouseX + 50 + 'px',
                display: 'inline-block'
            });
        });

        $('body').append(captionClone); // 캡션 div를 body에 추가합니다.

        // 아이템에서 Mouseout 이벤트 핸들러
        item.mouseout(function () {
            captionClone.remove(); // 추가한 캡션 div를 제거합니다.
            $(document).off('mousemove'); // 문서에서 Mousemove 이벤트 핸들러를 제거합니다.
        });
    });

    $('.item').mouseover(function () {
        const pastelToneColors = [
            '#FFD1DC', '#FFB6C1', '#FFC0CB', '#FF69B4', '#FFC3A0', '#FFA07A',
            '#FF7F50', '#FFA500', '#FFD700', '#FFDEAD', '#FFB90F', '#FFFACD',
            '#FFFFE0', '#FAFAD2', '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE',
            '#FFC0CB', '#F0E68C', '#F5DEB3', '#FAF0E6', '#FDF5E6', '#FFEFD5',
            '#FFE4B5', '#FFDAB9', '#FFE4C4', '#F0F8FF', '#F0FFF0', '#FFF5EE'
        ];

        const getRandomColor = () => {
            return pastelToneColors[Math.floor(Math.random() * pastelToneColors.length)];
        };

        $('.container').css({
            transition: 'background-color 2s',
            backgroundColor: getRandomColor()
        });
    });

});

let x = 0;
let targetX = 0;
const speed = 0.1;

const main = $('.title-main');
const sub = $('.title-sub');

$(window).on("mousemove", (event) => {
    x = event.pageX - window.innerWidth / 2;
});

const loop = () => {
    targetX += (x - targetX) * speed;

    main.css("transform", `translateX(${targetX / 35}px)`);
    sub.css("transform", `translateX(${-targetX / 20}px)`);
    window.requestAnimationFrame(loop);
};
loop();

window.onload = () => {
    $('.container').css({
        display: 'none'
    });
    const box = document.querySelector(".title-caption");

    $('.title').mouseover(() => {
        $(".title-caption").css({
            opacity: 1
        })
    });

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let speed = 0.1;

    window.addEventListener("mousemove", (event) => {
        x = event.pageX;
        y = event.pageY;
    });

    const loop = () => {
        // console.log(1);

        targetX += (x - targetX) * speed;
        targetY += (y - targetY) * speed;

        //console.log(targetX.toFixed(2), targetY.toFixed(2));
        box.style.top = targetY + 25 + "px";
        box.style.left = targetX + 25 + "px";

        window.requestAnimationFrame(loop);
    };
    loop();

    $('.title').click(function () {
        $('.entrance').css('opacity', 0).fadeOut(1000, function () {
            $('.container').css('display', 'block').animate({
                opacity: 1
            }, 1000);
        });
    });
};

$('.about').hover(function () {
    $(this).find('.about-caption').fadeIn(300);
}, function () {
    $(this).find('.about-caption').fadeOut(300);
});

$('.filter').hover(function () {
    $(this).find('.filter-buttons').fadeIn(300);
}, function () {
    $(this).find('.filter-buttons').fadeOut(300);
});