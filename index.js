const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const app = express();
const port = 3000;
/*
const bodyParser = require('body-parser');
app.use(bodyParser.json());
*/
app.use(cors());
app.use(express.json());
const salt = "hackathon";
app.get("/getpwd", (req, res) => {
  password = req.query.pwd;
  // 입력된 비밀번호를 SHA-512로 해싱
  hashedPassword = crypto.createHash("sha512").update(salt+password).digest("hex");
  if (hashedPassword === storedPassword) {
    res.json({ Match: true });
  } else {
    res.json({ Match: hashedPassword+",,,,,"+storedPassword });
  }
});

app.post("/setpwd", (req, res) => {
  const { password } = req.body;
  // 입력된 비밀번호를 SHA-512로 해싱
  hashedPassword = crypto.createHash("sha512").update(salt+password).digest("hex");
  storedPassword = hashedPassword;
  if (hashedPassword === storedPassword) {
    res.json({ Match: password });
  } else {
    res.json({ Match: false });
  }
});


const verify = {};
app.post('/signup', function (req, res) {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'email.address.confirm1@gmail.com', // 본인의 Gmail 주소 입력
      pass: 'irsv azkh sgmr idua' // 생성한 앱 비밀번호 입력
    }
  });

  const { nickname, email } = req.body;
  Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  alphabet = "abcdefghijklmnopqrstuvwxyz";
  verify[email] = "";
  verify[email] += Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : Alphabet[Math.floor(Math.random() * Alphabet.length)] : Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : alphabet[Math.floor(Math.random() * alphabet.length)] + '';
  verify[email] += Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : Alphabet[Math.floor(Math.random() * Alphabet.length)] : Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : alphabet[Math.floor(Math.random() * alphabet.length)] + '';
  verify[email] += Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : Alphabet[Math.floor(Math.random() * Alphabet.length)] : Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : alphabet[Math.floor(Math.random() * alphabet.length)] + '';
  verify[email] += Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : Alphabet[Math.floor(Math.random() * Alphabet.length)] : Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : alphabet[Math.floor(Math.random() * alphabet.length)] + '';
  verify[email] += Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : Alphabet[Math.floor(Math.random() * Alphabet.length)] : Math.floor(Math.random() * 2) == 0 ? Math.floor(Math.random() * 10) : alphabet[Math.floor(Math.random() * alphabet.length)] + '';

  const mailOptions = {
    from: 'email.address.confirm1@gmail.com', // 발신자 이메일
    to: email, // 수신자 이메일
    subject: 'ClanTalk - 이메일 인증',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      안녕하세요! ${nickname}님,<br>아래 인증코드를 입력하여 회원가입을 완료하세요.<div style="display: flex; justify-content: center;"><span style="background-color: dodgerblue; color: #fff; padding: 20px; border-radius: 15px; letter-spacing: 5px; font-weight: bold; margin-top: 50px;">${verify[email]}</span></div>
    </body>
    </html>`
  };
  // 이메일 보내기
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('이메일 발송 실패:', error);
      res.status(500).json({ success: false, message: '이메일 발송 실패' });
    } else {
      console.log('이메일 발송 성공:', info.response);
      res.json({ success: true, message: '이메일 발송 성공' });
    }
  });

});

const emailRemainingTimes = {}; // 이메일 주소와 쿨타임을 저장할 객체
const timerInterval = {};
app.get('/getRemainingTime', (req, res) => {
  const email = req.query.email;
  if (!emailRemainingTimes[email]) {
    emailRemainingTimes[email] = 5 * 60; // 이메일 주소에 대한 쿨타임 초기화
    timerInterval[email] = setInterval(function () {
      if (emailRemainingTimes[email] <= 0) {
        clearInterval(timerInterval[email]);
        emailRemainingTimes[email] = null;

      } else {
        emailRemainingTimes[email]--;
      }
    }, 1000); // 1초마다 갱신
  }

  res.json({ remainingTime: emailRemainingTimes[email] });
});

app.get('/verify', (req, res) => {
  const email = req.query.email;
  const verifyCode = req.query.verifyCode;
  if (verify[email] == verifyCode) {
    res.json({ verify: true });
  } else {
    res.json({ verify: false });
  }
});


app.listen(port, function () { console.log("API and Server is Ready!") });

app.get('*', function (req, res) {
  res.status(404).send("404 Page Not Found");
});