const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = ['russianbooks']
const cover = ['hardcover', 'softcover']
const publishing = ['Bukva-land', 'Samovar', 'Vladis', 'Rosman', "AST", 'Фламинго']
const age = ['0-3', '3-5', '5-7', '7-9', 'all']
// const title = ['Рассказы для детей', 'Русские народные сказки', 'Потешки', 'Сказки Чуковского', 'Букварь', 'Эмоции']
const authors = ['Барто Агния Львовна', 'Успенский Владимир Петрович', 'Радищева Нина Ивановна', 'Драгунский Кирилл Мефодиев']
const images = [
  '/img/russianbooks/bukvaland_1_readMyself_bedTimeStories.png',
  '/img/russianbooks/bukvaland_2_readMyself_bedTimeStories.png',
  '/img/russianbooks/bukvaland_3_readMyself_bedTimeStories.png',
  '/img/russianbooks/bukvaland_4_readMyself_bedTimeStories.png',
  '/img/russianbooks/bukvaland_5_learnLetters.png',
  '/img/russianbooks/vladis_1_readMyself.png', 
]

const features = [
  'panorama',
  'non-panorama',
]

const usage = [
  'learnLetters',
  'readMyself',
  'bedTimeStories'
]

const discount = [
  '10',
  '25'
]


module.exports = {
  async up(db) {
    return db.collection('russianbooks').insertMany([...Array(50)].map(() => {
    const type = usage[Math.floor(Math.random() * usage.length)]
    const characteristics = [
      {
      type: 'learnLetters',
      cover: getRandomArrayValue(cover),
      publishing: getRandomArrayValue(publishing),
      age: getRandomArrayValue(age),
      collection: collections[0],
      author: getRandomArrayValue(authors),
      images: getRandomArrayValue(images),
      features: faker.datatype.boolean(),
    },
    {
      type: 'readMyself',
      cover: getRandomArrayValue(cover),
      publishing: getRandomArrayValue(publishing),
      age: getRandomArrayValue(age),
      collection: collections[0],
      author: getRandomArrayValue(authors),
      images: getRandomArrayValue(images),
      features: faker.datatype.boolean(),
    },
    {
      type: 'bedTimeStories',
      cover: getRandomArrayValue(cover),
      publishing: getRandomArrayValue(publishing),
      age: getRandomArrayValue(age),
      collection: collections[0],
      author: getRandomArrayValue(authors),
      images: getRandomArrayValue(images),
      features: faker.datatype.boolean(),
    }
    ]

    const currentCharacteristics = characteristics.find(
      (item) => item.type === type
    )

    return {
      category: 'russianbooks',
      type,
      price: +faker.string.numeric(2),
      name: faker.lorem.sentence(2),
      description: faker.lorem.sentences(5),
      characteristics: currentCharacteristics,
      images: images.filter((item) => item.includes(type)),
      vendorCode: faker.string.numeric(4),
      inStock: faker.string.numeric(2),
      isBestSeller: faker.datatype.boolean(),
      isNew: faker.datatype.boolean(),
      popularity: +faker.string.numeric(3),
      isDiscount: faker.datatype.boolean() ? getRandomArrayValue(discount) : "",
    }
    }))
  },

  async down(db) {
    return db.collection('russianbooks').updateMany([])
  }
};


