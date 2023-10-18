
export const renderHomepage = (req, res) => {
    res.render('home', {
        rutaCSS: "home",
        rutaJS: "home",
        email: req.user.email,
        userRole: req.user.role
    })
}

export const renderRealTimeProducts = (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    })
};

export const renderMessages = (req, res) => {
    res.render('messages', {
        rutaCSS: "messages",
        rutaJS: "messages"
    })
};

export const renderLogin = (req, res) => {
    res.render('login', {
        rutaCSS: "login",
        rutaJS: "login",
    })
};

export const renderRegister = (req, res) => {
    res.render('register', {
        rutaCSS: "register",
        rutaJS: "register"
    })
};