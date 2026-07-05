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
    if (message.author.id !== OWO_ID) return;
    if (message.channel.id !== channelId) return;
    
    // Logic quét Captcha
    if (message.content.includes("captcha")) {
       state.captcha = true;
       console.log("⚠️ CAPTCHA DETECTED!");
    }
  });
};
