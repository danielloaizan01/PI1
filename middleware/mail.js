const mail  = {
    user: '',
    pass: ''
}

let transporter = nodemailer.createTransport({
    host: "",
    port: 2525,
    tls: {
        rejectAnauthorized: false
    },
    secure: false,
    auth: {
        user: mail.user,
        pass: mail.pass,
    }, 
});

const sendEmail = async(email, subject, html) => {
    try {

        await trasporter.sendMail({
            from: `PIF <${mail.user}`
        })
        
    } catch (error) {
        
    }

}

let info = await transporter.sendMAil({

})