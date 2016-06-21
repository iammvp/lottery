# lottery
lottery是一个简单的老虎机抽奖插件,它非常容易使用.

### 配置选项
```
| 属性          |                     描述                             |               备注                  |
|:-----------   |:---------------------------------------------------  | :-----------------------------------|
|'clickSelector'| 点击开始的jQuery选择器                               | 必须|
|'event'        | 点击事件的回调函数名,为了防止抽奖动画完成前再次点击  | 必须|
|'prizeClass'   | 所有参与抽奖的选项的共同类(例如 '.lottery')          | 必须|
|'continue'     | 连续抽奖时,开始位置是否重置                          | 可选,默认值true,不重置|
|'speed'        | 运动速度单位ms                                       | 可选,默认值100|
|'constant'     | 抽奖是否匀速运动                                     | 可选,默认false,快结束时速度会变慢|
|'round'        | 转动几圈                                             | 可选,默认值2|
|'start'        | 初始开始地方                                         | 可选,默认值0|
|'activeClass'  | 通过奖品选项时添加的class                            | 可选,默认值'active'|
|'goalClass'    | 完成后给被选中奖品添加的class                        | 可选,默认值'goal'|

```
### 使用
```html
    <div id="lottery">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td class="lottery-unit lottery-unit-0"><img src="images/bell.png" alt='bell'></td>
                <td class="lottery-unit lottery-unit-1"><img src="images/cherry.png" alt='cherry'></td>
                <td class="lottery-unit lottery-unit-2"><img src="images/diamond.png" alt='diamond'></td>
                <td class="lottery-unit lottery-unit-3"><img src="images/goldbar.png" alt='goldbar'></td>
            </tr>
            <tr>
                <td class="lottery-unit lottery-unit-11"><img src="images/goldclover.png" alt='goldclover'></td>
                <td colspan="2" rowspan="2">
                    <a href="#"></a>
                </td>
                <td class="lottery-unit lottery-unit-4"><img src="images/grape.png" alt='grape'></td>
            </tr>
            <tr>
                <td class="lottery-unit lottery-unit-10"><img src="images/heart.png" alt='heart'></td>
                <td class="lottery-unit lottery-unit-5"><img src="images/horseshoe.png" alt='horseshoe'></td>
            </tr>
            <tr>
                <td class="lottery-unit lottery-unit-9"><img src="images/lemon.png" alt='lemon'></td>
                <td class="lottery-unit lottery-unit-8"><img src="images/plum.png" alt='plum'></td>
                <td class="lottery-unit lottery-unit-7"><img src="images/watermelon.png" alt='watermelon'></td>
                <td class="lottery-unit lottery-unit-6"><img src="images/ryby.png" alt='ryby'></td>
            </tr>
        </table>
    </div>
```
```javascript
    $('#lottery td a').click(function e(event) {
        event.preventDefault();
        $('table').lottery({
            'clickSelector': $('#lottery td a'),
            'prizeClass': '.lottery-unit',
            'event': e,
            'finish': function(data) {
                alert(data.find('img').attr('alt'));
            }
        });
    });
```
### Demo(示例)
[九宫格](http://iammvp.github.io/lottery/examples/index.html)



