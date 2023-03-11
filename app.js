/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const puppeteer = require('puppeteer');

const arrVin = fs.readFileSync('./vinfile.txt', 'utf-8').split('\n');

function fileHandler(vin, status) {
  fs.appendFile('./results.txt', `${vin} - ${status}\n`, (err) => {
    if (err) throw err;
    console.log('Записано в файл!');
  });
}

async function check(vint) {
  // console.log(typeof (vin), 'Внутри функции');
  const openBrowser = await puppeteer.launch();
  const page = await openBrowser.newPage();
  page.setDefaultNavigationTimeout(10000);
  try {
    console.log(`1. Начало ${vint}`);
    await page.goto('https://vin.drom.ru/');
    console.log('2. Ожидание инпута');
    await page.waitForSelector('#App > div > div.ekyhurd0.custom-1dyuwgp.e1ousbph0 > div.custom-1fz99xi.e11nz0r20 > div:nth-child(1) > div:nth-child(2) > div > form > div > input');
    console.log('3. Клик на инпут');
    await page.click('#App > div > div.ekyhurd0.custom-1dyuwgp.e1ousbph0 > div.custom-1fz99xi.e11nz0r20 > div:nth-child(1) > div:nth-child(2) > div > form > div > input');

    for (let i = 0; i < vint.length; i += 1) {
      page.keyboard.press(`${vint[i]}`);
      console.log(`4.${i + 1}. ${vint[i]}`);
    }
    console.log('5. Ожидание кнопки');
    await page.waitForSelector('#App > div > div.ekyhurd0.custom-1dyuwgp.e1ousbph0 > div.custom-1fz99xi.e11nz0r20 > div:nth-child(1) > div:nth-child(2) > div > form > button');
    console.log('6. Пошел запрос!');
    await page.click('#App > div > div.ekyhurd0.custom-1dyuwgp.e1ousbph0 > div.custom-1fz99xi.e11nz0r20 > div:nth-child(1) > div:nth-child(2) > div > form > button');

    await page.waitForSelector('body > div.b-wrapper > div.b-content.b-media-cont.b-media-cont_margin_huge > div.b-left-side > div > div > div.b-media-cont.b-media-cont_margin_b-size-m > div:nth-child(1) > div.e1bmw9hg0.css-16u02xk.e93r9u20');
    await page.screenshot({ path: `./screenshots/${vint}.png` });
    await openBrowser.close();
    fileHandler(vint, 'информация найдена');
  } catch (error) {
    fileHandler(vint, 'н.д');
    console.log(`7. По вин номеру ${vint} нет информации в базе`);
  }
}

async function checkArr(array) {
  for (let i = 0; i < array.length; i += 1) {
    console.log(array[i], 'Массив');
    check(array[i]);
  }
}
async function processArray(array) {
  for (const item of array) {
    await check(item);
  }
  console.log('Массив обработан!');
}
processArray(arrVin);

// checkArr(arrVin);
// checkArr(arrVin);
//   await page.waitForTimeout(5000);
//
//   await page.click('#vinToggleButton');
//   await page.click('#vinToggleButton');
//   await page.$eval('#vinNumber', (el) => el.value = 'XTA211030M0000022');

//   await page.click('#searchByVinNumberButton');

//   await page.waitForSelector('#searchByVinNumberButton');
//   const element = await page.waitForSelector('#searchByVinNumberButton');
//   console.log(element.CDPJSHandle);
//   await page.click('#searchByVinNumberButton');

//   await page.waitForTimeout(2000);
//   await page.screenshot({ path: './screenshots/example.png' });

//   await page.$eval('#vinNumbers', (el) => el.value = 'XTA211030M0000022');

//   await page.waitForSelector('#checkType');
//   await page.$eval('#checkType', (el) => el.value = 'history');

//   await page.click('#getCheckButton');

//   await page.waitForSelector('#result');
// await page.waitForTimeout(1000);
// mirrorbullshit agency
