const express = require('express');
const app = express();

let result = '',
  count = 0,
  life = true;

// app.get('/', (req, res) => {
//   res.send();
// });

app.get('/:input', (req, res) => {
  if (life) {
    const { input } = req.params;

    if (!(Number(input * 1) && input.length === 3)) {
      throw new Error('Bad Request');
    }

    let B = 0,
      S = 0;
    count += 1;

    for (let i = 0; i < 3; i++) {
      if (result.indexOf(input[i]) !== -1) {
        if (result[i] === input[i]) {
          S += 1;
        } else {
          B += 1;
        }
      } else {
      }
    }

    if (B === 3) {
      console.log(`${count}번째 시도 : ${input}`);
      console.log(`3B`);
      res.send(`${count}번째 시도 : ${input} 3B`);
    } else if (S === 3) {
      life = false;
      console.log(`${count}번째 시도 : ${input}`);
      console.log(`3S`);
      console.log(`${count}번만에 맞히셨습니다.`);
      console.log(`게임을 종료합니다.`);
      res.send(
        `${count}번째 시도 : ${input} 3S ${count}번만에 맞히셨습니다. 게임을 종료합니다.`,
      );
    } else {
      console.log(`${count}번째 시도 : ${input}`);
      console.log(`${B}B${S}S`);
      res.send(`${count}번째 시도 : ${input} ${B}B${S}S`);
    }
  } else {
    console.log(`${count}번만에 맞히셨습니다.`);
    console.log(`게임이 종료되었습니다.`);
    res.send(`${count}번만에 맞히셨습니다. 게임이 종료되었습니다.`);
  }
});

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

app.listen(3000, () => {
  const refNumberSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * (9 - i));
    result += refNumberSet[randomNumber];
    refNumberSet.splice(randomNumber, 1);
  }

  console.log('컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!');
});
