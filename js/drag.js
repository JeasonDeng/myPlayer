(function (w) {
  w.$ = {}
  w.$.drag = function (testNode, callback) {
    testNode.onmousedown = function (e) {
      e = e || event
      // 兼容 IE8 以下全局鼠标事件捕获
      // 事件捕获 - 把所有事件揽到自己身上
      if (testNode.setCapture) {
        testNode.setCapture()
      }

      var initPosition = { x: 0, y: 0 }
      var startPosition = { x: 0, y: 0 }

      initPosition.x = this.offsetLeft
      initPosition.y = this.offsetTop
      startPosition.x = e.clientX
      startPosition.y = e.clientY
      document.onmousemove = function (e) {
        e = e || event
        var endPosition = { x: 0, y: 0 }
        endPosition.x = e.clientX
        endPosition.y = e.clientY

        var L = endPosition.x - startPosition.x + initPosition.x

        if (L < 0) {
          L = 0
        } else if (L > testNode.parentNode.parentNode.clientWidth - testNode.clientWidth) {
          L = testNode.parentNode.parentNode.clientWidth - testNode.clientWidth
        }
        testNode.style.left = L + 'px'
        callback && callback()
      }
      document.onmouseup = function () {
        //  IE8 以下释放全局鼠标事件捕获
        if (document.releaseCapture) {
          document.releaseCapture()
        }
        document.onmousemove = document.onmouseup = null
      }
      // 阻止浏览器默认行为
      return false
    }
  }
})(window)