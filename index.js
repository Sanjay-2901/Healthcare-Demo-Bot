(function () {
  fetch(
    `https://api.copper-ai-agent-dev.yavar.ai/v1/chatbots/${window.botId}/customer`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.botKey}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const primaryColor = data?.color_attributes?.primary || '#2c3e50';

      const link = window.document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://copper-ai-agent-script.yavar.ai/index.css';
      document.head.appendChild(link);

      // Prevent the pinch zoom in mobile device
      const meta = window.document.createElement('meta');
      meta.name = 'viewport';
      meta.content =
        'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);

      const fontAwesomeCDN = document.createElement('link');
      fontAwesomeCDN.rel = 'stylesheet';
      fontAwesomeCDN.href =
        'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
      document.head.appendChild(fontAwesomeCDN);

      const chatButton = document.createElement('button');
      chatButton.className = 'chat-button';
      chatButton.style.backgroundColor = primaryColor;
      chatButton.onclick = toggleChat;

      const chatButtonImage = document.createElement('i');
      chatButtonImage.className = 'bi bi-chat-dots';
      chatButtonImage.style.fontSize = '28px';
      chatButton.appendChild(chatButtonImage);

      const chatWindow = document.createElement('div');
      chatWindow.className = 'chat-window';

      const chatCloseButton = document.createElement('button');
      chatCloseButton.className = 'chat-close-button';
      chatCloseButton.onclick = toggleChat;

      const chatCloseButtonImage = document.createElement('i');
      chatCloseButtonImage.className = 'bi bi-x-circle';
      chatCloseButtonImage.style.fontSize = '25px';
      chatCloseButton.appendChild(chatCloseButtonImage);
      chatWindow.appendChild(chatCloseButton);

      if (isDarkBackground(primaryColor)) {
        chatButtonImage.style.color = 'white';
        chatCloseButtonImage.style.color = 'white';
      }

      const chatIframe = document.createElement('iframe');
      chatIframe.className = 'chat-iframe';
      chatIframe.frameBorder = 0;
      // http://localhost:5173
      // https://ai-agent.yavar.ai
      chatIframe.src = `https://ai-agent.yavar.ai/?access_token=${window.botKey}&bot_id=${window.botId}`;
      chatIframe.allow = 'microphone';
      chatWindow.appendChild(chatIframe);

      document.body.appendChild(chatButton);
      document.body.appendChild(chatWindow);

      function toggleChat() {
        if (
          chatWindow.style.display === 'none' ||
          chatWindow.style.display === ''
        ) {
          chatWindow.style.display = 'block';
        } else {
          chatWindow.style.display = 'none';
        }
      }
    })
    .catch((error) => {
      console.error('Bot details not found', error);
    });
})();

function isDarkBackground(color) {
  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
