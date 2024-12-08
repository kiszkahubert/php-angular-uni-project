const { Client } = require('pg');
const nodemailer = require('nodemailer');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hubert.kiszkavp@gmail.com',
    pass: 'cuhc wgdl hxnv iqaa',
  },
});
async function listenForNewFormData() {
  try {
    await client.connect();
    await client.query('LISTEN new_formdata');
    client.on('notification', async (msg) => {
      console.log('Otrzymano powiadomienie:', msg.payload);
      const formData = JSON.parse(msg.payload);
      console.log('Nowe dane formularza:', formData);
      const mailOptions = {
        from: 'hubert.kiszkavp@gmail.com', 
        to: 'hubert.kiszkavp@gmail.com',
        subject: 'Nowe dane formularza',
        text: `Imię: ${formData.name}\nE-mail: ${formData.email}\nTelefon: ${formData.phone_number}\nTemat: ${formData.topic}\nWiadomość: ${formData.message}`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail został wysłany!');
      } catch (error) {
        console.error('Błąd przy wysyłaniu e-maila:', error);
      }
    });
  } catch (error) {
    console.error('Błąd połączenia lub nasłuchu:', error);
  }
}

listenForNewFormData();
