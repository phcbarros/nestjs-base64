/**
 * npx ts-node -r tsconfig-paths/register ./src/fetch.ts
 */
const pako = require('pako');

const array = Array.from({ length: 400 })
  .fill('')
  .map((_, index) => ({
    memberNumber: `1234567890${index}`,
    flags: [
      {
        flag: 'potentialFraudulent',
        value: false,
        reasonCode: '1',
        description: `${'a'.repeat(50)}`,
      },
      {
        flag: 'fraudDDD',
        value: false,
        reasonCode: '8',
        description: `${'a'.repeat(50)}`,
      },
      {
        flag: 'fraudDD',
        value: false,
        reasonCode: '7',
        description: `${'a'.repeat(50)}`,
      },
      {
        flag: 'fraudDDD',
        value: false,
        reasonCode: '6',
        description: `${'a'.repeat(50)}`,
      },
    ],
  }));

const payload = {
  members: array,
};

const jsonString = JSON.stringify(payload);
console.log('json', jsonString.length);
const base64String = btoa(jsonString);
console.log('base64', base64String.length);

fetch('http://localhost:3000/receber-base64', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ base64: base64String }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
