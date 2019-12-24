import $ from 'jquery'
export default {
  install(Vue, options) {
      // Dete对象转日期时间
      Vue.prototype.kPopup = function (str) {
          var div = '<div class="mark"></div>';
          $('body').append(div)
          $('.mark').html(str);
          $('.mark').show();
          setTimeout(function() {
            $('.mark').hide();
            $('.mark').remove();
          }, 2000)
      }
  }
}
