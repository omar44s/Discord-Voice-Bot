const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// حط آيدي الروم الصوتي هنا
const VOICE_ID = "1510694717569106005";

client.once('clientReady', async () => {
  console.log(`✅ تم تسجيل الدخول ${client.user.tag}`);

  const channel = await client.channels.fetch(VOICE_ID);

  if (!channel) return console.log("❌ ما حصلت الروم");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfMute: false, // غير مكتوم
    selfDeaf: true   // دفن أحمر
  });

  console.log("✅ دخل الروم بنجاح");
});

client.login(process.env.TOKEN);