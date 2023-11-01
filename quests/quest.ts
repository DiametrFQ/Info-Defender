import IQuest from "./IQuest";

const Quest2: IQuest = {
  name: "hdmi",
  description: {
    backCoord: [900, 600],
    coord: [760, 500],
    text: `Сотрудник: "Вчера всё работало,\n а сегодня монитор не загорается"`,
    textDescription: "asdasd",
  },
  answers: [
    {
      text: "Подключен ли монитор к компьютеру?", //coord 110
      event: {
        deleteAnswers: [1, 2],
        setQuestText: "Кто-то украл hdmi!",
        setAnswerText: "Найти кабель!",
        setAnswerEvent: {
          deleteAnswers: [0],
          questDestroy: true,

          createBubbles: [
            {
              coord: [1490, 550],
              nameImg: "buble_keyboard",
              eventAfterDeath: {
                createBubbles: [
                  {
                    coord: [750, 750],
                    nameImg: "buble_no_keyboard",
                  },
                ],
              },
            },
            {
              coord: [1110, 450],
              nameImg: "buble_HDMI",
              eventAfterDeath: {
                createBubbles: [
                  {
                    coord: [750, 750],
                    nameImg: "buble_no_mon",
                    eventAfterDeath: {
                      questNotice: true,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      text: "Постучать по монитору)))", //coord 220
      event: {
        deleteAnswers: [1],
        setQuestText: "Так делают только\n подлые ящеры",
      },
    },
    {
      text: "Подключен ли монитор к разетке?", //coord 330 ...
      event: {
        deleteAnswers: [1],
        setQuestText: "Монитор подключен к разетке",
      },
    },
  ],
};
const Quest3: IQuest = {
  name: "hdmi",
  description: {
    coord: [760, 500],
    backCoord: [900, 600],
    text: `Сотрудник:"С приходом электриков,\n у меня компьютер стал жить своей жизнью"`,
    textDescription: "asdasd",
  },
  answers: [
    {
      text: `Посмотреть, к какой сети подключен компьютер сотрудника (Проверить имя сети (SSID))`, //coord 110
      event: {
        deleteAnswers: [1, 2, 3, 4],
        setAnswerText: "То есть...",
        setQuestText: `SSID не соответствует корпоративной wi-fi сети`,
        setAnswerEvent: {
          setQuestText:
            "Обнаружена поддельная wi-fi точка,\n осмотри офис и замерить уровень сигнала,\n чтобы найти точку раздачи!",
          setAnswerText: "То есть...",
          setAnswerEvent: {
            questDestroy: true,
          },
        },
        createBubbles: [
          {
            coord: [1350, 450],
            nameImg: "buble_questions",
            eventAfterDeath: {},
          },
        ],
      },
    },
    {
      text: "Получить mac адрес сети", //coord 220
      event: {
        deleteAnswers: [1, 2, 3, 4],
        numberSetAnswer: 0,
        setAnswerText: "То есть...",
        setQuestText: `mac адрес не сходится`,
        setAnswerEvent: "fooWiFi",
      },
    },
    {
      text: "Подключен ли монитор к разетке?", //coord 220
      event: {
        deleteAnswers: [1, 2, 3, 4],
        numberSetAnswer: 0,
        setAnswerText: "То есть...",
        setQuestText: `Обнаружино 2 wi-fi сети с одинаковым названием`,
        setAnswerEvent: "fooWiFi",
      },
    },
    {
      text: "Всё в порядке, ты случайно не заметил", //coord 220
      event: {
        deleteAnswers: [3],
        setQuestText: "Нет, тут точно чтото не так",
      },
    },
    {
      text: "Правила фаервола не отрабатывают!", //coord 220
      event: {
        deleteAnswers: [4],
        setQuestText: "Фаервол не виноват!",
      },
    },
  ],
  generalAnswerEvent: [
    {
      name: "fooWiFi",
      numberSetAnswer: 0,
      setAnswerText: "То есть...",
      setAnswerEvent: {
        setQuestText:
          "Обнаружена поддельная wi-fi точка,\n осмотри офис и замерить уровень сигнала,\n чтобы найти точку раздачи!",
        setAnswerText: "То есть...",
        setAnswerEvent: {
          questDestroy: true,
        },
      },
      createBubbles: [
        {
          coord: [1350, 450],
          nameImg: "buble_questions",
          eventAfterDeath: {
            create: {
              description: {
                backCoord: [500, 600],
                coord: [280, 200],
                text: `Электрики решил провести атаку с использованием подменной
                     Wi-Fi сети. Они создал фальшивую точку доступа с
                     названием нашей корпоративной Wi-Fi сети и скопировали
                     окно авторизации. Сотрудники, не подозревая ничего,
                     подключались к этой сети и вводили свои логины и
                     пароли для доступа к сети.
                     Злоумышленники получали доступ к логинам и паролям
                     сотрудников и собрали информацию о том, какие
                     ресурсы они используют и какие данные хранят в
                     системе. Но вы успели предотвратить
                     утечку данных. Отличная работа!`,
                textColor: "#38201c",
              },
              answer: {
                text: `Теперь всё понятно`,
                event: {
                  questDestroy: true,
                },
              },
            },
            questNotice: true,
          },
        },
      ],
    },
  ],
};

export { Quest2, Quest3 };
