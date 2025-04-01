import React, { useEffect } from 'react';
import { initFacebookSDK } from '../../utils/facebookSDK';

const MessengerChat = () => {
  useEffect(() => {
    initFacebookSDK();
  }, []);

  return (
    <div className="fb-customerchat"
      page_id="936619743392459"
      theme_color="#0084ff"
      logged_in_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
      logged_out_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
    />
  );
};

export default MessengerChat; 