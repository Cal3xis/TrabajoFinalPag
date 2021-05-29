const { request } = require('express');
const express = require('express' );
const app = express();
const hbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const { env } = require('process');
require('dotenv').config();
//Config Mail//
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
      console.log("Listo para enviar correo!");
  });
//Settings//
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));

app.engine('.hbs', hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname :"hbs"
}));

const PORT = process.env.PORT || 3000;


app. get ('/',(req, res)=>{
    res.render('pagina',{
        ruta:"/Styles/EstiloPag.css"
    });
})

app. get ('/Nosotros',(req, res)=>{
    res.render('nosotros',{
        ruta: "/Styles/EstiloNosotros.css"
    })
})

app. get ('/Contacto',(req, res)=>{
    res.render('contacto',{
        ruta:"/Styles/EstiloContacto.css"
    });
})

app. post ('/Contacto', async(req, res)=>{
     // send mail with defined transport object
    await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to:process.env.MAIL_USER, // list of receivers
    subject: `${req.body.fullname} Requere de su atención sobre ${req.body.asunto}`, // Subject line
    html: `<h1>Nombre:${req.body.fullname}</h1>
        <h1>Correo:${req.body.email}</h1>
        <h1>Telefono:${req.body.phone}</h1>
        <h1>Empresa:${req.body.empresa}</h1>
        <h1>Solicita la siguiente información:</h1>
    <h1>${req.body.message}</h1>` // html body
  });
    res.redirect('/');
})

app. get ('/Servicios',(req, res)=>{
    res.render('servicios',{
        ruta:'/Styles/EstilosServicios.css'
    });
})

app. get ('/Proyectos',(req, res)=>{
    res.render('proyectos',{
        ruta:'/Styles/EstiloProyectos.css'
    })
})
app. use ((req, res)=>{
    res.render('404',{
        ruta:'/Styles/Estilos404.css'
    });
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

