$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
        $('#ipt').val('')
        resetui()// 重置滚动条的位置
        getMsg(text)//调用getMsg函数,发起请求，获取聊天记录
    })

    // 获取机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            type: 'POST',
            url: 'http://www.tuling123.com/openapi/api',
            data: {
                // key:'38b7b21c7a3741ddb39769d021a59473',我的
                key: '758ecd943dd644b59ff2d1f73759500d',//免费的
                info: text,
            },
            success: function (res) {
                console.log(res)
                if (res.code === 100000) {
                    // 接收聊天消息
                    var msg = res.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
                } else if (res.code === 40004) {
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>我累了，明天再聊吧~</span></li>')
                }
                resetui()//重置滚动条
                // getVoice(msg)//调用语音函数getVoice
            }
        })
    }
    // 机器人音频
    //     function getVoice(text) {
    //         $.ajax({
    //             method: 'POST',
    //             url: '?',
    //             data: {
    //                 text:text
    //             },
    //             success: function (res) {
    //                 console.log(res);
    //                 if (res.code === 100000) {
    //                     //播放语音
    //                     $('#voice').attr('src',res.?)
    //                 }
    //             }
    //        })
    //    }
    // 回车发送消息 弹起回车的对应的文本码是13
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            // console.log('弹起回车了');
            $('#btnSend').click()
        }
    })
})
