require("dotenv").config();
const axios = require("axios");

const fs = require("fs");
const path = require("path");

const indexFile = path.join(__dirname, "index.txt");
const webhookUrl = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.WEBHOOK_KEY}`;

const startDate = "2024-05-15";
const resources = [
  "[【最日常】学会老外天天都在用的16句，不知不觉口语变流利｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口语 ](https://www.bilibili.com/video/BV1wP411A7KR/)",
  "[【超级好用】老外最经常用的15句表达，看完让你很流利地进行日常交流，随时能用｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1oR4y1Q7id/)",
  "[【绝对好用】看完就可以替换掉各种你想说的very，像母语者一样说出最自然的英语，随时能用｜地道 英语口语｜不用very｜stop saying very in	](https://www.bilibili.com/video/BV17N4y1w7MA/)",
  "[【太好用】老外在日常交流中一直反复使用的12句，看完让你的口语瞬间流利，随时能用｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口	](https://www.bilibili.com/video/BV1sg411a7J5/)",
  "[【值得收藏】学会10个母语者在生活中最常说的 短语动词，让你的口语瞬间地道｜英语 短语动词｜地道 英语口语｜phrasal verbs in English｜	](https://www.bilibili.com/video/BV1kd4y1F7Nv/)",
  "[【看完就会】超多美剧原声句子，让你像母语者一样流利地讲电话｜地道 英语口语｜日常 英语｜电话 英语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1PG4y147r5/)",
  "[【原声跟读】美剧中真实场景对话，看完让你从听不太懂到脱口而出｜地道 英语口语｜生活 英语｜听力 跟读｜phrases in English	](https://www.bilibili.com/video/BV1Rd4y1t7Yd/)",
  "[【每天都能用到的】在情境中不知不觉掌握这些老外一直用的表达，让你轻松说流利英文｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1oe4y1M7qc/)",
  "[【大量原声情境】你一定要会的老外每天都在用的句子，让你越说越流利｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1Ne4y1M77A/)",
  "[【真好用】这些老外超爱用的超短句（不超过3个单词），看完就可以脱口而出｜地道 英语口语｜日常 英语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1ng411J79p/)",
  "[【 超级日常】日常生活中那些你想说可能不知道的句子，看完之后全部脱口而出（大量跟读练习）｜地道 英语口语｜日常 英语｜phrases in	](https://www.bilibili.com/video/BV1ND4y1E7DA/)",
  "[【看完就会】日常生活中母语者挂在嘴边的句子，配有大量原声跟读，看完之后让你张口就来｜地道 英语口语｜日常 英语	](https://www.bilibili.com/video/BV1fD4y1j7Db/)",
  "[【有用的万能词】像老外一样用最高频、简单的词说出最地道的句子，看完真的就会了｜地道 英语口语｜phrases in Engli	](https://www.bilibili.com/video/BV1NG4y1j7ss/)",
  "[【硬核干货】老外最爱用的20句，逐句跟读原声情境，看完真的就会了｜地道 英语口语｜日常 英语｜phrases in English｜	](https://www.bilibili.com/video/BV1Qd4y157Db/)",
  "[【瞬间就会】看完各种电话场合不用愁，轻松和老外流利地讲电话｜地道 英语口语｜商务 英语｜电话 英语｜phrases in English｜商务 英语口语	](https://www.bilibili.com/video/BV1WP4y1z7im/)",
  "[【真的太好用】看完就能像老外一样说出最自然的口语，随时都能用｜地道 英语口语｜phrases in English｜生活 英语口语	](https://www.bilibili.com/video/BV1o8411u7hn/)",
  "[【随时可用】这10个超强句型让你和老外一样流利地说英文，真的很有用｜地道 英语口语｜英语 句型｜sentence patterns in english｜zah	](https://www.bilibili.com/video/BV1ZY411i77s/)",
  "[超级强的万能句，让你在各种聊天场合都不卡顿，像母语者一样自然｜地道 英语口语｜日常 英语｜生活 英语｜phrases in English	](https://www.bilibili.com/video/BV17g4y1p7P4/)",
  "[【多场景听力训练】美国人最爱用的25个最日常的句子，你能听懂多少｜地道 英语｜美式发音干货总结｜Speak Fast English｜ZaharaEnglish	](https://www.bilibili.com/video/BV1h24y1N7sr/)",
  "[【实用到爆表】原来这才是听不懂老外的最真实原因，美国人这30句让你看完秒懂如何进行有效的听力训练｜地道 英语｜美式发音干货总结｜Speak Fast Engli	](https://www.bilibili.com/video/BV1BM4y1E757/)",
  "[【无敌实用】职场中老外最爱用的25句，看完瞬间秒懂美国人，让你沟通超顺畅｜地道 英语口语｜英语 听力｜phrases in English｜Zahara Eng	](https://www.bilibili.com/video/BV1Ke411Z7nk/)",
];

function saveIndex(index) {
  fs.writeFileSync(indexFile, index.toString());
}

function loadIndex() {
  if (fs.existsSync(indexFile)) {
    return parseInt(fs.readFileSync(indexFile, "utf8"));
  }
  return 0;
}

function getDateString() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
    date.getDay()
  ];

  return `${month}.${day}/${weekDay}`;
}

// 发送消息的函数
async function sendMessage() {
  const currentDate = new Date();
  const currentIndex = Math.floor(
    Math.abs(currentDate - new Date(startDate)) / 1000 / 60 / 60 / 24
  );
  console.log(currentIndex);

  // hack code: seems there is time zone issue
  const resource = resources[(currentIndex + 1) % resources.length];

  const messageContent = `
	⭐ 【${getDateString()}】 大家早上好呀！
	
  💪用碎片化时间，系统化学习口语听力
	
	✍🏻今日加餐视频：
	${resource}

  
  👆🏻 点击上方文字跳转，开始练习吧~ 🚀
	`;

  const message = {
    msgtype: "markdown",
    markdown: {
      content: messageContent,
    },
  };

  try {
    const response = await axios.post(webhookUrl, message);
    console.log("Message sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}

// 调用函数
sendMessage();
