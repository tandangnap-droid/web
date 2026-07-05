// js/captcha.js
const OWO_ID = "408785106942164992";
const CAPTCHA_TEXTS = ["please click", "fill the boxes", "hunt is empowered by"];

module.exports = function startCaptchaDetector(client, channelId, idUser, state) {
  console.log("👁️ Captcha detector đang chạy...");

  function patchChannel(channel) {
    if (!channel || !channel.send || channel.__patched) return;
    const originalSend = channel.send.bind(channel);
    channel.send = async function (...args) {
      if (state.captcha || state.paused) return null;
      return originalSend(...args);
    };
    channel.__patched = true;
  }

  client.on("messageCreate", (message) => {
    if (message.author.id !== OWO_ID || message.channel.id !== channelId) return;
    
    const content = message.content.toLowerCase();
    if (CAPTCHA_TEXTS.some(t => content.includes(t))) {
      state.captcha = true;
      state.paused = true;
      client.channels.cache.forEach(patchChannel);
      console.log("⚠️ CAPTCHA DETECTED!");
    }
  });
};
