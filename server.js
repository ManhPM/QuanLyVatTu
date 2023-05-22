const express = require("express");
const {sequelize} = require("./models");
const {rootRouter} = require("./routers")
const { Taikhoan, Nhanvien } = require("./models");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { engine } = require('express-handlebars');
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override')
const session = require('express-session');
const path = require("path");
const port = 3000;
const app = express();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/logingmail', function(req, res) {
  res.status(200).render("authgoogle")
});

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', async (req, res) =>  {
  console.log(userProfile.emails[0].value)

  const taiKhoan = await Taikhoan.sequelize.query(
    "SELECT TK.username FROM taikhoans as TK, nhanviens as NV WHERE NV.email = :email AND NV.maNV = TK.maNV",
    {
      replacements: {
        email: userProfile.emails[0].value,
      },
      type: QueryTypes.SELECT,
    }
  );
  if(taiKhoan[0]){
    const token = jwt.sign({ username: taiKhoan[0].username }, "manhpham2k1", {
      expiresIn: 60 * 60 * 6,
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .render("taikhoans/formlogin", {
        message: "Đăng nhập thành công!",
        flag: 1
      });
  }
  else {
    res.status(500).render("taikhoans/formlogin", {
      message: "Đăng nhập không thành công!"})
  }
});
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '103088923087-3dj12u41miqs0bucrs33k9c11rqor28f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
  

app.use(cookieParser());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(methodOverride('_method'));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
  const token = req.cookies.access_token;
  if(!token){
    res.render('taikhoans/formlogin')
  }
  else{
    res.render('taikhoans/formlogin', {
      message: "Bạn đã đăng nhập rồi!",
      flag: 1
    })
  }
  
})
//dùng router
app.use(rootRouter);

//lắng nghe sự kiện kết nối
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công!.');
      } catch (error) {
        console.error('Kết nối thất bại:', error);
      }
})