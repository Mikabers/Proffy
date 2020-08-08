const createProffy = require('./createProffy');
const Database = require('./db');

Database.then(async (db) => {

    proffyValue = {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "85 93242-4934",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam metus est, imperdiet id diam sit amet, blandit viverra orci. Nullam vulputate at diam a pellentesque. Duis varius a elit vel dignissim. Curabitur suscipit nunc nec libero porttitor, et rhoncus lectus convallis.",
    };
 
    classValue = {
        subject: "Geografia",
        cost: 20,
    };

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ];

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // Consultar o dados inseridos

    const selectedProffys = await db.all("SELECT * FROM proffys");

    //console.log(selectedProffys);

    /**
     * Consultar as classes de um determinado professor
     * e trazer junto os dados do professor
     */

     const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
     `);
     
     // console.log(selectClassesAndProffys);

    // O horário que a pessoa trabalha, por exemplo é das 8h - 18h
    // O Horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // O time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
    `)

    // console.log(selectClassesSchedules);
});