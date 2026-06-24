const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// حط آيديات الرومات هنا
const VOICE_CHANNELS = [
  "1510694717569106005",
  "1510694717569106001",
  "1510694717569106006",
  "1510694717569106004",
  "1510694717569106000",
];

client.once('clientReady', async () => {
  console.log(`✅ تم تسجيل الدخول: ${client.user.tag}`);

  for (const channelId of VOICE_CHANNELS) {
    try {
      const channel = await client.channels.fetch(channelId);

      if (!channel) {
        console.log(`❌ لم يتم العثور على الروم: ${channelId}`);
        continue;
      }

      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: false, // المايك مفتوح
        selfDeaf: false  // غير مكتوم
      });

      console.log(`✅ دخل الروم: ${channel.name}`);

    } catch (err) {
      console.log(`❌ خطأ في الروم ${channelId}`);
      console.error(err);
    }
  }
});

client.login(process.env.TOKEN);