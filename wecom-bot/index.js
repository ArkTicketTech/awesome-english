require("dotenv").config();
const axios = require("axios");

const fs = require("fs");
const path = require("path");

const indexFile = path.join(__dirname, "index.txt");
const webhookUrl = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.WEBHOOK_KEY}`;

const startDate = "2024-05-12";
const resources = [
  "[【最牛保姆级听力】美国人在工作中最真实的聊天，你能听懂多少？](https://b23.tv/A0Oqf9q)",
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
  const currentIndex = Math.ceil(
    Math.abs(currentDate - new Date(startDate)) / 1000 / 60 / 60 / 24
  );
  console.log(currentIndex);

  const resource = resources[currentIndex % resources.length];

  const messageContent = `
	⭐大家早上好呀
	${getDateString()}
	
	✍🏻今日加餐视频：
	《保姆级听力训练》
	
	用碎片化时间，系统化学习口语听力
	
	今日共习内容:
	${resource}
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
