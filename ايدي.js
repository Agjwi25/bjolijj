const fs = require("fs");
const request = require("request");
const { join } = require("path");
const firstModule = require('./rankup');

function getUserMoney(senderID) {
  const pathData = join(__dirname, 'banking', 'banking.json');
  if (fs.existsSync(pathData)) {
    const user = require(pathData);
    const userData = user.find(user => user.senderID === senderID);
    return userData ? userData.money : 0;
  } else {
    return 0;
  }
}

function getRank(exp) {
  if (exp >= 100000) return 'أسطورة';
if (exp >= 80000) return 'نخبة X';
if (exp >= 60000) return 'نخبة V';
if (exp >= 40000) return 'نخبة IV';
if (exp >= 30000) return 'نخبة III';
if (exp >= 25000) return 'نخبة II';
if (exp >= 20000) return 'نخبة I';
if (exp >= 15000) return 'الماس V';
if (exp >= 10000) return 'الماس IV';
if (exp >= 8000) return 'الماس III';
if (exp >= 6000) return 'الماس II';
if (exp >= 4000) return 'الماس I';
if (exp >= 3000) return 'البلاتين IV';
if (exp >= 2000) return 'البلاتين III';
if (exp >= 1500) return 'البلاتين II';
if (exp >= 1000) return 'البلاتين I';
if (exp >= 800) return 'فضي IV';
if (exp >= 600) return 'فضي III';
if (exp >= 400) return 'فضي II';
if (exp >= 300) return 'فضي I';
if (exp >= 200) return 'برونز III';
if (exp >= 100) return 'برونز II';
if (exp >= 50) return 'برونز I';
if (exp >= 20) return 'حديد III';
if (exp >= 10) return 'حديد II';
if (exp >= 5) return 'حديد I';
return 'عا الاغلب ميت 🦆🍷';
}

function getUserGender(genderCode) {
  if (genderCode === 2) return 'ولد';
  if (genderCode === 1) return 'بنت';
  return 'قام الشخص بأخفائة';
}

module.exports.config = {
  name: "آيدي",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "عبدالرحمن",
  description: "ايديك",
  commandCategory: "العاب",
  cooldowns: 0,
};

module.exports.run = async function ({ args, api, event, Currencies, permssion, client }) {
  try {
    const data = await api.getThreadInfo(event.threadID);
    const storage = [];
    for (const value of data.userInfo) {
      storage.push({ id: value.id, name: value.name });
    }

    const exp = [];
    for (const user of storage) {
      const countMess = await Currencies.getData(user.id);
      exp.push({
        name: user.name,
        exp: typeof countMess.exp == "undefined" ? 0 : countMess.exp,
        uid: user.id,
      });
    }



    exp.sort((a, b) => {
      if (a.exp > b.exp) return -1;
      if (a.exp < b.exp) return 1;
      return 0;
    });

    const userId = event.type == "message_reply" ? event.messageReply.senderID : event.senderID;
    const infoUser = exp.find(info => parseInt(info.uid) === parseInt(userId));

    const curLevel = Math.floor((Math.sqrt(1 + (4 * infoUser.exp / 3) + 1) / 2));
    const level = Math.floor((Math.sqrt(1 + (4 * (infoUser.exp + 1) / 3) + 1) / 2));

    if (level > curLevel && level != 1) {
      const rankupMessage = ``;
      api.sendMessage(rankupMessage, event.threadID);
    }
    const userIdToCh = "100081570534647";
    const dRole = "عبدالرحمن عـــمك 👑⚓";
    const userIdToCheck = "100019275112468";
    const desiredRole = "ضحى عـــمتك 👑⚓";
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, keyAdminOnly, ndhOnly,adminPaOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    let permission = 0;
    let role = ""; 
    var permssion = 0;
    var threadInfoo = threadInfo.get(threadID) || await Threads.getInfo(threadID);
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);

    if (ADMINBOT.includes(senderID.toString())) {
        permssion = 2;
    } else if (!ADMINBOT.includes(senderID) && find) {
        permssion = 1;
    }






    if (senderID === userIdToCh) {
      role = dRole;

    } else if (senderID === userIdToCheck) {
    role = desiredRole;
    } else if (permssion === 0) {
        role = "مستخدم";
    } else if (permssion === 1) {
        role = "مسؤول في القروب";
    } else if (permssion === 2) {
        role = "المطور عمكم👑";
    } else if (permssion === 3) {
        role = "المطور عمكم👑";
    } else {
        role = "تعطل";
    }






    const yourRank = exp.findIndex(info => info.uid === userId) + 1;



    const id = event.type == "message_reply" ? event.messageReply.senderID : event.senderID;
    const user_data = await api.getUserInfo(id);
    const name = user_data[id].name;
    const gender = getUserGender(user_data[id].gender);

    const pictureCallback = async () => {
      try {
        const moneyFromFile = getUserMoney(id);
        const moneyFromUserData = (await Currencies.getData(id)).money || 0;

        const rank = getRank(infoUser.exp);

        const msg = `༺༺༺༺༻༻༻༻\n💳اسمك: 『${name}』\n🚻جنسك 『${gender}』\n🔐رتبتك『${role}』\n✉️عدد رسائلك: 『${infoUser.exp}』\n❇️تصنيفك: 『${rank}』\n📊ترتيبك: 『${yourRank}』\n🔥مستواك: 『${level}』 \n 💵فلوسك: 『${moneyFromUserData}  دولار』\n💰البنك: 『${moneyFromFile}』`;

        api.sendMessage({
          body: msg,
          attachment: fs.createReadStream(__dirname + "/cache/1.png"),
        }, event.threadID, () => {
          fs.unlinkSync(__dirname + "/cache/1.png");
        });

      } catch (error) {
        console.error(error);
      }
    };

    const pictureRequest = request(
      encodeURI(
        `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
      )
    );

    pictureRequest.pipe(fs.createWriteStream(__dirname + "/cache/1.png")).on("close", pictureCallback);

    api.sendMessage(
      ``,
      event.threadID
    );
  } catch (error) {
    console.error(error);

    api.sendMessage(
      `حدث خطأ: ${error.message}`,
      event.threadID,
      event.messageID
    );
  }
};
