const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

const categoryMap = {
  "ADMIN": "ادارية",
  "OWNER": "المطور",
  "MEDIA": "ترفيه",
  "GAME": "ترفيه",
  "FUN": "ترفيه",
  "ECONOMY": "عضو المجموعة",
  "GENERAL": "عضو المجموعة",
  "TOOL": "ادارية",
  "TOOLS": "ادارية",
  "INFO": "عضو المجموعة",
  "UTILITY": "ادارية",
  "RANK": "ادارية",
  "CONFIG": "ادارية",
  "CUSTOM": "ادارية",
  "SYSTEM": "ادارية",
  "AI": "ترفيه",
  "BOX CHAT": "ترفيه",
  "IMAGE": "ترفيه",
  "WIKI": "ترفيه",
  "LOVE": "ترفيه",
  "ARYAN": "المطور",
  "CONTACTS ADMIN": "ادارية",
  "SOFTWARE": "ادارية",
  "OTHER": "المطور",
  "المـطور︙🪬": "المطور",
};

module.exports = {
  config: {
    name: "اوامر",
    version: "1.0",
    author: "𝙺-𝙰𝚉𝚄𝙼𝙰",
    countDown: 5,
    role: 0,
    shortDescription: {
      ar: "عرض استخدام الأمر وقائمة جميع الأوامر"
    },
    longDescription: {
      ar: "عرض استخدام الأمر وقائمة جميع الأوامر مع معلومات مفصلة"
    },
    category: "معلومات",
    guide: {
      ar: "{pn} [فارغ | <اسم الأمر>]"
    },
    priority: 1
  },
  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      let msg = "✦ أوامر نازي ✦\n⋆⭒˚｡⋆━━━✦━━━⋆˚｡⭒⋆\n";
      const categories = {};
      for (const [name, value] of commands) {
        if (value.config.role > role) continue;
        const category = value.config.category || "غير مصنف";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories)
        .filter(cat => cat !== "معلومات")
        .map(category => {
          let catName = categoryMap[category] || category;
          return { category, catName };
        })
        .filter(({ catName }) => ["عضو المجموعة", "المطور", "ترفيه", "ادارية"].includes(catName))
        .forEach(({ catName, category }) => {
          msg += `✧ ${catName.toUpperCase()} ✧\n`;
          msg += `\n`;
          const names = categories[category].commands.sort();
          names.forEach(cmd => {
            msg += ` ❖ ${cmd.padEnd(15)}\n`;
          });
          msg += `⋆⭒˚｡⋆━━━✦━━━⋆˚｡⭒⋆\n`;
        });

      msg += `نازي يحتوي حاليًا على ${commands.size} أوامر. استخدم ${prefix}help متبوعًا باسم الأمر لمزيد من التفاصيل حول الأمر`;
      msg += ` ⋆⭒˚｡⋆━━━✦━━━⋆˚｡⭒⋆\n`;
      await message.reply({ body: msg });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));
      if (!command) {
        await message.reply(`الأمر "${commandName}" غير موجود`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "غير معروف";
        const longDescription = configCommand.longDescription?.ar || "لا يوجد وصف";
        const guideBody = configCommand.guide?.ar || "لا يوجد دليل";
        const usage = guideBody.replace(/{pn}/g, prefix + configCommand.name);
        let response = `✦ الاسم ✦\n ${configCommand.name}\n\n`;
response += `❖ معلومات ❖\n`;
response += ` 📜 الوصف: ${longDescription}\n`;
response += ` 🔗 الأسماء البديلة: ${configCommand.aliases ? configCommand.aliases.join(", ") : "لا يوجد"}\n`;
response += ` 🏆 الدور: ${roleText}\n`;
response += ` ⏳ وقت الانتظار: ${configCommand.countDown || 1}ثانية\n`;
response += ` 🛠️ المؤلف: ${author}\n\n`;
response += `❖ الاستخدام ❖\n ${usage}\n\n`;
response += `❖ ملاحظات ❖\n 🔹 المحتوى بين <XXXXX> يمكن تعديله\n 🔹 المحتوى بين [a|b|c] يعني a أو b أو c\n`;
await message.reply(response);
}
}
};

function roleTextToString(roleText) {
switch (roleText) {
case 0:
return "0 (جميع المستخدمين)";
case 1:
return "1 (مديرو المجموعة)";
case 2:
return "2 (مديرو البوت)";
default:
return "دور غير معروف";
}
	}
