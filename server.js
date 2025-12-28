const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "APP_PASSWORD"
    }
});

function sendCode(email, code) {
    transporter.sendMail({
        from: "Lorn <your_email@gmail.com>",
        to: email,
        subject: "رمز التحقق",
        text: `رمز التحقق الخاص بك هو: ${code}`
    });
}
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const code = generateCode();

    // احفظ المستخدم + الكود في قاعدة البيانات
    // password لازم تشفيره (bcrypt)

    sendCode(email, code);

    res.json({ message: "تم إرسال كود التحقق" });
});
