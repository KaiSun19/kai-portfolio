// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const mail = require('@sendgrid/mail');


mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {

  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.fullname}\r\n
    Email: ${body.email}\r\n
    Subject : ${body.subject}\r\n
    Message: ${body.message}
  `;

  await mail.send({
    to: 'kai@kaidev.co.uk',
    from: 'kai@kaidev.co.uk',
    subject: `${body.subject}`,
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }).then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  
  res.status(200).json({ name: 'ok' })

}

