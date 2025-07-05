const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOrderConfirmationEmail = async (toEmail, orderDetails) => {
    const mailOptions = {
        from: `"Boolstop Shop" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Conferma del tuo ordine su BoolStop",
        html: `<h2>Grazie per il tuo ordine!</h2>
        <p>Riceverai i tuoi videogiochi al piu presto. Ecco i dettagli:</p>
        <ul>
            ${orderDetails.items.map(item => `<li>${item.name} x ${item.amount}</li>`).join("")}
        </ul>
        <p><strong>Totale:</strong> € ${orderDetails.total}</p>`
    };

    await transporter.sendMail(mailOptions);

}

module.exports = {
    sendOrderConfirmationEmail,
}