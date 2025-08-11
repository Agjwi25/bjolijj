module.exports.config = {
    name: "اغاني",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عمر",
    description: "شرح",
    usages: "ا",
    commandCategory: "العاب",
    cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/musci.mp3";

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    if (userAnswer === correctAnswer) {
        Currencies.increaseMoney(event.senderID, 100);
        api.sendMessage(`تهانينا ${userName} لقد غرفت الاغنيه وحصلت على 100 دولار`, event.threadID);

        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(`خطأ، حاول مرة أخرى`, event.threadID);
    }

    fs.unlinkSync(tempImageFilePath);
};

module.exports.run = async function ({ api, event, args }) {
    const questions = [
      
      
      { music: "https://audio.jukehost.co.uk/Sx4ETAtAACy6FrREiD8nGNL6n7EA6kkV", answer: "ابشرك" },

      { music: "https://audio.jukehost.co.uk/SjcbNla60Vh8AjmXgfCVV6gAl3868xs2", answer: "كنت وحدي" },    

   
      { music: "https://audio.jukehost.co.uk/n0WHZw5930ghlIxQxGAEQRsoymqthGHs", answer: "ثلاث دقات" },
      

      { music: "https://audio.jukehost.co.uk/0tflU0NsHNbwUx95shr6Xe5cy6BeQs0R", answer: "قولي متى" },

      { music: "https://audio.jukehost.co.uk/w1w0Vnmp7IbNtyuqOPmob2Bgoyct0CCk", answer: "تسونامي" },    

   
      { music: "https://audio.jukehost.co.uk/q32mY6zuC0z1VdFudBMfhSN8aVTE7IQm", answer: "لو بص بعيني" },
      

      { music: "https://audio.jukehost.co.uk/VLt36FgTYMczzPjlA073SUkjSaPiy2Qt", answer: "ما بلاش" },

      { music: "https://audio.jukehost.co.uk/b2YgNUQ7BhpEvkyiv7fGEzAvGGb3dTiY", answer: "يا ستار" },    

   
      { music: "https://audio.jukehost.co.uk/4vpwME1SA5sEPNXqq4VKBkZRGKEitt3r", answer: "كن انت" },
    

      { music: "https://audio.jukehost.co.uk/RTU6m7JPCasP9mlVPk1l5misEsplBr09", answer: "مسيطرة" },

      { music: "https://audio.jukehost.co.uk/AzX5JKNxDRxQHXMeTxZ9g4emr90VGXdz", answer: "هذا الحل" },    

   
      { music: "https://audio.jukehost.co.uk/9m8sBEhOi4tTAXvVeaKTe5XWNxGh7iaV", answer: "غلطانة" },
      { music: "https://audio.jukehost.co.uk/4oTaqKAaktFiVW5Wh19GYr449dwd6G9a", answer: "انت معلم" },

      { music: "https://audio.jukehost.co.uk/AtHY1KDtRTZHN3ZdjFfidlOxom1PX0Kj", answer: "مال حبيبي مالو" },    

   
      { music: "https://audio.jukehost.co.uk/En211DwKAYPLMMiw8qj03rFIPud89LNh", answer: "عشق موت" },
    
    
{ music: "https://audio.jukehost.co.uk/tkFPRWzwkZIoce7LiL1yUhCyJLYGKVNN", answer: "على بالي" },
      

    { music: "https://audio.jukehost.co.uk/iLCZo2hqmTaUDnpRCYDTs6iLxCfQFWpT", answer: "مشاعر" },

    { music: "https://audio.jukehost.co.uk/RPCZBcEYOACow4o92GHNyk7Yx127k1TQ", answer: "الحديقة السرية" },    

   
    { music: "https://audio.jukehost.co.uk/VTYqUovCgZxiiBN8UcXaPT4sa3Po6J5M", answer: "باتمان" },
      

    { music: "https://audio.jukehost.co.uk/ba9z1xnzTo9ypYjBJkFdcWqSQynfAmXD", answer: "هزيم الرعد" },

     { music: "https://audio.jukehost.co.uk/FxFPAFfjt6bKkDCwemZIkv1XV6MsKZl2", answer: "ماوكلي" },    

   
    { music: "https://audio.jukehost.co.uk/moac0ggvirDBNeyMjZy59lsSW6PNzEeh", answer: "نعم انته" },
    

     { music: "https://audio.jukehost.co.uk/CbOCSk5jPGdAQkBmiGmBtF2SB9aLKw6E", answer: "البخت" },

    { music: "https://audio.jukehost.co.uk/AGZeP7c48PQZ6wLNz27lSEZoH6SMgxD1", answer: "اسرار المحيط" },    

   
    { music: "https://audio.jukehost.co.uk/do4ctGiXB7woz8b4E34aGw8M2gM6Jmyf", answer: "كونان" },
     { music: "https://audio.jukehost.co.uk/7LrJJCgamI02bkm5Ev396WY5VmFVsI6x", answer: "دايس" },

    { music: "https://audio.jukehost.co.uk/AGybmbthtmwnBhv9JlAEsbIf4X3nxUFn", answer: "فرسان الارض" },    

   
    { music: "https://audio.jukehost.co.uk/SKNToKpSPNkSAsfJ2nJ8bQ4hE4BLuOvZ", answer: "انا واخي" },
      
     { music: "https://audio.jukehost.co.uk/SwUuS686PZiwEpjJb9UOYIboSSCMPXP6", answer: "انا واختي" },

    { music: "https://audio.jukehost.co.uk/lqlxSnerbO3nxU6PwHjwwwBN0QulbiMj", answer: "سر الحياة" },    

   
    { music: "https://audio.jukehost.co.uk/VQr1IUqcGqoOVjICtK95YOVGlUje3M7R", answer: "القناص" },
     { music: "https://audio.jukehost.co.uk/YYuMHtgCqoMZTtz5wPLryT4QULY9EG1N", answer: "الملاذ الاخير" },

    { music: "https://audio.jukehost.co.uk/URsLMvUwen52hqZHkamg1fRFSRwDsPuP", answer: "البوساء" },    
   { music: "https://audio.jukehost.co.uk/3ks3WKqMS99B3fsoNVKUNxPKTtESJOgQ", answer: "حبي الك" },
     { music: "https://audio.jukehost.co.uk/AKMMURUFBPjO1vSlPc2C2gLPXf2FvO4R", answer: "ريمي" },

    { music: "https://audio.jukehost.co.uk/Vl00rWymtmwSudfBtZUo0IXUJNUTPwcj", answer: "ابطال ديجيتال" },
   
    { music: "https://audio.jukehost.co.uk/Fq6PSXWc6PZRYCYQBz2zzoHG9nyLKgZ9", answer: "عهد الاصدقاء" },  

   { music: "https://audio.jukehost.co.uk/4iib3eRmvSZRBCOB4CCcdAyYrtzYKGCk", answer: "صقور الارض" },
     { music: "https://audio.jukehost.co.uk/URsLMvUwen52hqZHkamg1fRFSRwDsPuP", answer: "البوساء" },

    { music: "https://audio.jukehost.co.uk/URsLMvUwen52hqZHkamg1fRFSRwDsPuP", answer: "البوساء" },

      
    ];

  
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const correctAnswer = randomQuestion.answer;

    const imageResponse = await axios.get(randomQuestion.music, { responseType: "arraybuffer" });
    fs.writeFileSync(tempImageFilePath, Buffer.from(imageResponse.data, "binary"));

    const attachment = [fs.createReadStream(tempImageFilePath)];
    const message = `ما اسم الاغنيه؟`;

    api.sendMessage({ body: message, attachment }, event.threadID, (error, info) => {
        if (!error) {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                correctAnswer: correctAnswer
            });
        }
    });
};
