window.onload = function () {
    // 初始化页面工具
    // 搜索
    search();
    //  轮播图
    banner();
    // 倒计时
    downTime();
}
var search = function () {
    var search = document.querySelector(".jd_search_box");
    var banner = document.querySelector('.jd_banner');
    // 距离范围
    var height = banner.offsetHeight;
    /*监听滚动事件*/
    window.onscroll = function () {
        //    当前页面滚动的距离

        // var top = document.body.scrollTop;
        /*谷歌*/
        var top = document.documentElement.scrollTop;   /*IE*/
        var opacity = 0;

        if (top > height) {
            opacity = 0.85;
        } else {
            opacity = 0.85 * (top / height);
        }
        search.style.background = 'rgba(201,21,35,'+ opacity + ')'
    }

};
var banner = function () {
    /*大容器*/
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    // querySelector用的选择器就是css当中的有效选择器
    var imageBox = banner.querySelector("ul:first-child");
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

     // 过渡
    var addTransition = function(){
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
        // 清过渡
    var removetransition = function (){
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }

    // 位移
    var settranslatex = function(translatex){
        imageBox.style.transform = 'translateX('+(translatex)+'px)';
        imageBox.style.webkitTransform = 'translateX('+(translatex)+'px)';
    }

    // 无缝滚动&无缝滑动
    var index = 1;
    var timer = setInterval(function(){
        index ++;
        // 过渡
        addTransition();
        // 位移
        settranslatex(-index*width);
    },1000);

    imageBox.addEventListener('transitionend',function(){
        // 自动滚动的无缝
        if(index >=9){
            index = 1;
            // 瞬间定位
            // 清过渡
            removetransition();
            // 位移
            settranslatex(-index*width);
        }
        // 滑动的时候也需要无缝
        else if(index<=0){
            index = 8;
            // 瞬间定位
            // 清过渡
            removetransition();
            // 位移
            settranslatex(-index*width);
        }
        // 根据索引设置点
        // index的取值范围0-8
        setpoint();  /*此时index的取值范围1-8*/
    })

    // 设置点的方法
    var setpoint = function (){
        // 清除样式
        for(var i=0;i<points.length;i++){
            var obj = points[i];
            obj.classList.remove('now');
        }
        // 给对应的加上样式
        points[index-1].classList.add('now');
    }

    // 绑定事件
    var startx = 0;
    var distancex = 0;
    var ismove = false;
    imageBox.addEventListener('touchstart',function(e){
        // 清除定时器
        clearInterval(timer);
        // 记录起始位置的x坐标
        startx = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        ismove = true;
        // 记录滑动过程中的x坐标
        var movex = e.touches[0].clientX;
        // 计算位移，有正负方向
        distancex = movex-startx;
        // 元素将要的定位=当前定位+手指移动的距离
        var translatex = -index * width + distancex;

        removetransition();/*清过渡*/
        // 做位移
        settranslatex(translatex);

    });

    imageBox.addEventListener('touchend',function(e){
        if(ismove){
            if(Math.abs(distancex)<width/3){
                // 吸附
                addTransition();
                settranslatex(-index*width)
            }else{
                // 切换
                // 往右滑，上一张
                if(distancex>0){
                    index--
                }else{
                    index++
                }
                // 左滑，下一张
                addTransition();
                settranslatex(-index*width);
            }
        }

        // 最好做一次参数的重置
        startx = 0;
        distancex = 0;
        ismove = false;
        // 加上定时器
       clearInterval(timer);  /*先清除一遍，避免重复*/
        timer = setInterval(function(){
            index ++;
            // 过渡
            addTransition();
            // 位移
            settranslatex(-index*width);
        },1000);
    });
}

// 倒计时盒子
var downTime = function () {
    var time = 2*60*60;
    var spans = document.querySelector('.sk_time').querySelectorAll('span');

    var timer = setInterval(function(){
        time--;

        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);
}