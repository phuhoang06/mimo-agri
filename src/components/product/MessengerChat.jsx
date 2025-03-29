import React, { useEffect, useRef } from 'react';

const MessengerChat = () => {
  const messengerRef = useRef(null);

  useEffect(() => {
    // Load Facebook SDK for Messenger
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFacebookSDK();
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div 
        ref={messengerRef}
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id="111012438308215" 
      ></div>
    </>
  );
};

export default MessengerChat; 