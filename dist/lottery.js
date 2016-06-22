(function($) {
    $.fn.lottery = function(options) {
        /*配置项*/
        var $that = this;
        var settings = $.extend({
            'amount': $that.find(options.prizeClass).length, //选项数量
            'continue': true, //是否继续运行
            'constant':false,//匀速运动
            'speed': 100, //初始运行速度
            'round': 2, //几圈
            'start': 0,//初始开始地方 
            'activeClass': 'active', //走过选项时添加的class
            'goalClass': 'goal', //给目标添加的class
            'finish' : function () {
            }
        }, options);       
        var count = getStart() || 0, //计算一共走了多少步,初始值是开始的位子
            initRound, secondLastRound, lastRound; //三个状态,为了修改speed
        /*初始化*/
        function init() {
            settings.index = settings.continue ? getStart() : settings.start, //当前指向哪个奖品
            settings.end = options.end >= 0 ? (options.end > $that.find(options.prizeClass).length - 1 ? Math.floor(Math.random() * $that.find(options.prizeClass).length) : options.end) : Math.floor(Math.random() * $that.find(options.prizeClass).length), //哪儿结束    
            $(settings.clickSelector).unbind('click', settings.event); //解除click事件,在抽奖动画完成前,不能再点击
            $that.find(settings.prizeClass + '-' + settings.index).removeClass(settings.activeClass + ' ' + settings.goalClass); //每次开始前清除所有添加的class
            initRound = timer();
        }


        /*获取哪儿开始*/
        function getStart() {
            var str = $that.find('.' + settings.activeClass).attr('class');
            return str ? parseInt(str.substring(str.indexOf(options.prizeClass.substring(1) + '-')).split(' ')[0].split('-')[2]) + 1 : settings.start;
        }

        /*时间器*/
        function timer() {
            return (
                setInterval(function() {
                    settings.index = (settings.index > settings.amount - 1) ? 0 : settings.index;
                    process();
                    settings.index++;
                }, settings.speed)
            )
        }

        /*执行过程 输入参数当前位置*/
        function process() {
            var index = settings.index;
            var prev = (index == 0) ? settings.amount - 1 : index - 1;
            $that.find(settings.prizeClass + '-' + index).addClass(settings.activeClass); //当前奖品增加class
            $that.find(settings.prizeClass + '-' + prev).removeClass(settings.activeClass); //之前的去掉class
            if(settings.constant){//匀速运动
            	if (count >= settings.amount * settings.round + settings.end) { //结束
	                clearInterval(initRound);
	                $that.find(settings.prizeClass + '-' + settings.index).addClass(settings.goalClass);
	                $(settings.clickSelector).bind('click', settings.event); //重新绑定click事件
	                settings.finish($that.find(settings.prizeClass + '-' + settings.end));//程序运行完以后的回调函数
	            }
            }else{//非匀速运动
	            if (count == settings.amount * (settings.round - 1)) { //如果是倒数第二圈速度慢一点
	                clearInterval(initRound);
	                settings.speed = settings.speed + 50;
	                secondLastRound = timer();
	            } 
	            if (count == settings.amount * settings.round) { //最后一圈速度更慢
	                clearInterval(secondLastRound);
	                settings.speed = settings.speed + 100;
	                lastRound = timer();

	            }  
	            if (count == settings.amount * settings.round + settings.end) { //结束
	                clearInterval(lastRound);
	                $that.find(settings.prizeClass + '-' + settings.index).addClass(settings.goalClass);
	                $(settings.clickSelector).bind('click', settings.event); //重新绑定click事件
	                settings.finish($that.find(settings.prizeClass + '-' + settings.end));//程序运行完以后的回调函数
	            }
	        }
            count++;
        }

        /*运行程序*/
        init();

        return $that;//返回jQuery对象
    };
})(jQuery);
