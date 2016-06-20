(function($) {
    $.fn.lottery = function(options) {
        var $that = this,
            count = 0,//计算一共走了多少步
            initRound, secondLastRound, lastRound;//三个状态,为了修改speed
        var settings = $.extend({
            'amount': $that.find(options.prizeSelector).length,
            'index': options.start || getStart(),
            'start' : getStart(),
			'end' : Math.ceil(Math.random()*$that.find(options.prizeSelector).length),
			'speed': 100,
			'round': 2,
			'active': 'active' 
        }, options);

        $(settings.clickSelector).unbind('click', settings.event);//解除click事件,在抽奖动画完成前,不能再点击
        $that.find(settings.prizeSelector).removeClass(settings.active);
console.log(settings.index);
        function getStart() {
        	var str = $that.find('.'+options.active).attr('class');
        	if(str){
        		return parseInt(str.substring(str.indexOf(options.prizeSelector.substring(1)+'-')).split(' ')[0].split('-')[2]) + 1;
        	}
        	return 0;
        }
        function timer() {
            return (
                setInterval(function() {
                    settings.index = (settings.index > settings.amount - 1) ? 0 : settings.index;
                    process(settings.index);
                    settings.index++;
                }, settings.speed)
            )
        }

        function process(index) {
            index = settings.index;
            var prev = (index == 0) ? settings.amount - 1 : index - 1;
            $that.find(settings.prizeSelector + '-' + index).addClass(settings.active);//当前奖品增加class
            $that.find(settings.prizeSelector + '-' + prev).removeClass(settings.active);//之前的去掉class
            count++;
            if (count == settings.amount * (settings.round - 1)) {//如果是倒数第二圈速度慢一点
                clearInterval(initRound);
                settings.speed = settings.speed + 50;
                secondLastRound = timer();
            }
            if (count == settings.amount * settings.round) {//最后一圈速度更慢
                clearInterval(secondLastRound);
                settings.speed = settings.speed + 100;
                lastRound = timer();

            }
            if (count >= settings.amount * settings.round + settings.end) {//结束
                clearInterval(lastRound);
                $(settings.clickSelector).bind('click', settings.event);//重新绑定click事件
            }
        }
        var initRound = timer();
        return $that;
    };
})(jQuery);
