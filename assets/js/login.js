$(function () {
  // 【1】.点击“去注册账号”的链接(注册显)
  $('#link_reg').on('click', function () {
    $('.reg-box').show().siblings('.login-box').hide()
  })

  // 【2】.点击“去登录”的链接(登录显)
  $('#link_login').on('click', function () {
    $('.login-box').show().siblings('.reg-box').hide()
  })

  // 【3】.从 layui中获取 form对象 + layer提示消息
  var form = layui.form
  var layer = layui.layer

  // 【4】.通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value, item) {
      // value：表单的值、item：表单的DOM对象
      // 密码框value值 和 确认密码框value值 对比(判定是否等于)
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 【5】.监听注册表单的提交事件 
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为 
    e.preventDefault()
    // 2. 发起Ajax的POST请求 
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为 
        $('#link_login').click()
      })
  })

  // 【6】监听登录表单的提交事件 
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为 
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单中的数据(username=bb3&password=333333) 
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页 
        location.href = '/index.html'
      }
    })
  })








});