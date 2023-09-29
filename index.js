const ex = require("express");
const multer = require("multer");
const pages = require("./data/pages");
const urlsMaker = require("./data/urls");
const helpers = require("./helper/lib");

// intial data
const PORT = 3030;
const urls = urlsMaker(PORT);

const app = ex();

app.use(ex.static("./public"));



// create multer middleware
const upload = multer({
    dest : "./uploads"
});

// create storage
const storage = multer.diskStorage({
    destination : "./MultipleUploads",
    filename : (req,file,cb)=>{
        console.log(file);

        const extName = helpers.getExtension(file.originalname);
        const originalname = file.originalname;

        const name = originalname.replace(extName,"")
                                 .split(" ")
                                 .join("-") +
                                 Date.now().toString();

        const fileName = name+extName;

        cb(null,fileName);
    }
})


// create mmulpleUpload
const multipleUpload = multer({
    storage : storage,
    limits : {
        fileSize : 80000
    }
});


// listening part
app.set("PORT",PORT);

app.post(
    "/singleImage",
    upload.single("simgOne"),
    (req,res,next)=>{
        console.log("file : ");
        console.log(req.file);
        
        
        res.status(200);
        res.redirect(urls.uploadSuccessfully);
        next();
    }
    );

app.post(
    "/multipleImage",
    multipleUpload.fields([
        {name : "mimgOne", maxCount : 1},
        {name : "mimgTwo", maxCount : 2},
        {name: "mimgThree", maxCount : 3}
    ]),
    (req,res,next)=>{
        console.log("files : ");
        console.log(req.files);

        res.status(200);
        res.redirect(urls.uploadSuccessfully);
        next();
    }
);


// listen the application
app.listen(app.get("PORT"),()=>{
    const url = `http://localhost:${app.get("PORT")}`;

    console.log("> App is listening at : ");
    console.log("> "+url);
})