const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();


//app config
const app = express()

//middlware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


// Configure Mongo
const db = "mongodb://localhost/worksplan";

// Connect to Mongo with Mongoose
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

//user routes 
const authRoutes = require('./routes/authentication/auth');
const userRoutes = require('./routes/authentication/user');

app.use('/api', authRoutes)
app.use('/api', userRoutes)
//general routes
const gdodRoutes = require("./routes/general/gdod");
const hativaRoutes = require("./routes/general/hativa");
const ogdaRoutes = require("./routes/general/ogda");
const pikodRoutes = require("./routes/general/pikod");

app.use('/api',gdodRoutes)
app.use('/api',hativaRoutes)
app.use('/api',ogdaRoutes)
app.use('/api',pikodRoutes)
//kshirot routes 
const kshirotRoutes = require("./routes/kshirot/kshirot");
const trainingRoutes = require('./routes/kshirot/training');
const matagRoutes = require('./routes/kshirot/matag');
const mashaRoutes = require('./routes/kshirot/masha/mashakshirotpikod');
app.use('/api',mashaRoutes)
app.use('/api',kshirotRoutes)
app.use('/api', trainingRoutes)
app.use('/api', matagRoutes)
//workplan routes 
const tipulRoutes = require("./routes/workplan/tipul");
const activeRoutes = require("./routes/workplan/activetipul");
const historyRoutes = require("./routes/workplan/historytipul");

const zkaottipulRoutes = require("./routes/workplan/zkaottipul");
const tipultypeRoutes = require("./routes/workplan/tipultype");
const gofbizoaRoutes = require("./routes/workplan/gofbizoa");
const statusRoutes = require("./routes/workplan/status");
const carRoutes = require("./routes/workplan/car");
const mkatRoutes = require("./routes/workplan/mkat");
const mkabazRoutes = require("./routes/workplan/mkabaz");
const magadRoutes = require("./routes/workplan/magad");
const magadalRoutes = require("./routes/workplan/magadal");
const sadnabizoaRoutes = require("./routes/workplan/sandabizoa");
const gdodbizoaRoutes = require("./routes/workplan/gdodbizoa");
const carteamRoutes = require("./routes/workplan/carteam");

app.use('/api', sadnabizoaRoutes) 
app.use('/api', gdodbizoaRoutes)
app.use('/api', carteamRoutes)

app.use('/api', tipulRoutes) 
app.use('/api', activeRoutes)
app.use('/api', historyRoutes)

app.use('/api', zkaottipulRoutes) 
app.use('/api', tipultypeRoutes) 
app.use('/api', gofbizoaRoutes) 
app.use('/api', statusRoutes) 
app.use('/api', carRoutes)
app.use('/api', mkatRoutes)
app.use('/api', mkabazRoutes)
app.use('/api', magadRoutes)
app.use('/api', magadalRoutes)

//
const zmplanlogRoutes = require("./routes/workplan/zmplanlog");
const zshigraRoutes = require('./routes/workplan/zshigra');
const nexttreatRoutes = require('./routes/workplan/nexttreat');
//
app.use('/api',zmplanlogRoutes)
app.use('/api', zshigraRoutes)
app.use('/api', nexttreatRoutes)


if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });  
  }

  //listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
