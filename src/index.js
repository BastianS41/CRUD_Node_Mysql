import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import {join,dirname} from "path";
import { fileURLToPath } from "url"
import personasRoutes from './routes/persona.routes.js'

//Inicialization
const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

//Setting
app.set('port', process.env.PORT ||3000);
app.set('views',join(_dirname,'views'));
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.get('/',(req,res)=>{
    res.render('index');
})
app.use(personasRoutes);


//Public files
app.use(express.static(join(_dirname,'public')));

//Run Server
app.listen(app.get('port'),()=>{
    console.log('Server listening on port: ', app.get('port'));
});