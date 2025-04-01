// Initialize Facebook SDK
export const initFacebookSDK = () => {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: '936619743392459',
      xfbml: true,
      version: 'v18.0'
    });
  };

  // Load Facebook SDK
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}; 