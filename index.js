const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const app = express();
const mongoose = require('mongoose');
const port = 3000;
/*
const bodyParser = require('body-parser');
app.use(bodyParser.json());
*/
app.use(cors());
app.use(express.json());


const conn_str = 'mongodb+srv://Moveon0107:1246code@clantalk.f4vjw3q.mongodb.net/?retryWrites=true&w=majority';
try {
  await mongoose.connect(conn_str, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  nickname: { type: String, unique: true },
  birthdate: Date,
  gender: String,
});

const User = mongoose.model('User', userSchema);

app.post("/userInfoUpdate", async (req, res) => {
  const { email, password, nickname, birthdate, gender } = req.body;

  // 중복 이메일 확인
  const existingEmailUser = await User.findOne({ email });
  const isEmailDuplicate = !!existingEmailUser;

  // 중복 닉네임 확인
  const existingNicknameUser = await User.findOne({ nickname });
  const isNicknameDuplicate = !!existingNicknameUser;

  if (isEmailDuplicate || isNicknameDuplicate) {
    const response = {};
    if (isEmailDuplicate) {
      response.email = true;
      res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
    }
    if (isNicknameDuplicate) {
      response.nickname = true;
      res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
    }
    return res.status(400).json(response);
  }


  // 중복되지 않으면 회원가입 처리
  const newUser = new User({ email, password, nickname, birthdate, gender });
  await newUser.save()
    .then(result => {
      console.log('새로운 사용자가 데이터베이스에 저장되었습니다.');
    })
    .catch(error => {
      console.error('사용자 저장 중 오류 발생: ', error);
      res.status(400).json({ message: '예상치 못한 오류로 회원가입에 실패했습니다.' });
    });;
  res.json({ message: '회원가입이 완료되었습니다.' });
});

const salt = "hackathon";
app.get("/getpwd", (req, res) => {
  password = req.query.pwd;
  // 입력된 비밀번호를 SHA-512로 해싱
  hashedPassword = crypto.createHash("sha512").update(salt + password).digest("hex");
  if (hashedPassword === storedPassword) {
    res.json({ Match: true });
  } else {
    res.json({ Match: false });
  }
});

app.post("/setpwd", (req, res) => {
  const { password } = req.body;

  // 입력된 비밀번호를 SHA-512로 해싱
  hashedPassword = crypto.createHash("sha512").update(salt + password).digest("hex");
  storedPassword = hashedPassword;
  if (hashedPassword === storedPassword) {
    res.json({ Match: true });
  } else {
    res.json({ Match: false });
  }
});


const timerInterval = {};
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
    subject: '이메일 인증',
    html: `안녕하세요! ${nickname}님,<br>아래 인증코드를 입력하여 회원가입을 완료하세요.<div style="display: flex; justify-content: center;"><span style="background-color: dodgerblue; color: #fff; padding: 20px; border-radius: 15px; letter-spacing: 5px; font-weight: bold; margin-top: 50px;">${verify[email]}</span></div>`
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
    emailRemainingTimes[email] = 5 * 60; // 이메일 주소에 대한 쿨타임 초기화
    clearInterval(timerInterval[email]);
    timerInterval[email] = setInterval(function () {
      if (emailRemainingTimes[email] <= 0) {
        clearInterval(timerInterval[email]);
        emailRemainingTimes[email] = null;

      } else {
        emailRemainingTimes[email]--;
      }
    }, 1000); // 1초마다 갱신
  });

});

const emailRemainingTimes = {};
app.get('/getRemainingTime', (req, res) => {
  const email = req.query.email;
  res.json({ remainingTime: Number(emailRemainingTimes[email]) });
});



const verify = {};
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
