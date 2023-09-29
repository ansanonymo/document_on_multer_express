# Here I document on Multer


This file contians : 

- [Installation Syntax](#installation-syntax)
- [Basic on Multer](#basic-on-multer)
- [Multer Middleware](#multer-middlewares)
- [Error Handling](#error-handling)

## Installation Syntax

**Using NPM :**

```bash
npm install --save multer
```

**Using Yarn :**

```bash
yarn add multer
```

<hr />
<br />

## Basic on Multer

Multer is a  node.js middleware for handling `multipart/form-data` which is primarly used for uploading files.

> 🟢 Must be used `enctype="multipart/form-data"` in form.

**Basic Setup Multer :**
```js
const multer = reuire("multer");
const upload = multer({dest: "folder_path_where_uploads"});

// upload single file
app.use(upload.single("fileds_name"),(req,res,next)=>{
    req.file; // is the file
});

app.use(upload.array("fileds_name",12), (req,res,next)=>{
    req.files; // is array of files.
})

const cpUpload = upload.fields(
    {
        name : "fileds_name",
        maxCount : 1
    },
    {
        name : "another_fields_name",
        maxCount : 3
    }
);

app.use(cpUpload,(req,res,next)=>{
    req.files; // here stored all files
})
```

### Ready the middleware

```js
const upload = multer(option);

// here one of option is dist which is location of dist folder
upload = multer({
    dest : "path where file are upload"
})
```

### File Object

> 🟢 Multer middleware store the file details into file object and add it with request object, which can access next middleware.

**Basic File Object :**

```js
{
  fieldname: 'field name which is used in input name attribute',
  originalname: 'original file name with extension',
  encoding: 'encoding type of the file like 7bit',
  mimetype: 'mime type like image/png',
  destination: 'destination where the file has uploaded',
  filename: 'the name of the file within the destination',
  path: 'full path of uploaded file',
  size: file_size_in_byte
}
```

### multer(options)

> 🟢 By default, multer will rename the files so as to avoid naming conflicts.

**Here all option of multer :**

| Key          | Description                                                      |
| ---          | -----------                                                      |
| dest         | Simple string path where store the files.                        |
| storage      | If more control over uploads, then used storage instead of dest. |
| limits       | Limits of the uploaded data.                                     |
| preservePath | Keep the full path of files instead of just the base name.       |



**All optino description :**

<details>
<summary>dest</summary>

> 🟢 It take a simple stirng path where upload the files. Don't used with storage option.

</details>

<details>
<summary>storage</summary>

> 🟢 `DiskStorage` engine gives full control on stroing files to disk. Here is syntax to make `DiskStorage`

```js
const storage = multer.diskStorage(
    {
        destination : function(req,file,cb){
            cb(null,'/here/file/going/to/store');
        },

        filename : function(req, file,cb){
            cb(null,'return_the_file_name_with_extension');
        }
    }
);

// used storage in multer middleware
const upload = multer({storage : storage});
```

> 🔴 You are responsible for creating the directory when providing `destination` as a function. When passing string then multer will  make sure that the directory is created for you.


> 🔴 CallBack function `cb` accept to argument, first is error, if error happen.


> 🟢 The `momoryStorage` engine stores the files in memory or ram as **Buffer* objects. It doesn't have any option.

```js
const storage = multer.memoryStorage();
const upload = multer({storage : storage});
```
</details>

<details>
<summary>limits</summary>

> 🟢 Limits is a object which is specifying size limits of the file or files.

**Here is the all limits option :**

| Key           | Description                                           | Default Value      |
| ---           | -----------                                           | -------------      |
| fieldNameSize | Max field name size                                   | 100 bytes          |
| fieldSize     | Max field size (in bytes)                             | 1 MB               |
| fields        | Max number of non-file fields                         | Infinity           |
| fieldsSize    | For multipart forms, the max file size                | Infinity           |
| files         | For multipart form, the max number of file fields     | Infinity           |
| parts         | the max number of parts (fields + files)              | Infinity           |
| headerPairs   | the max number of header key => value pairs to parse. | 2000               |

</details>

<details>
<summary>fileFilter</summary>

> 🟢 `fileFilter` option keep a function to control which files should be uploaded and which should be skipped. 

**File filter function look like :**

```js
function fileFilter(req,file,cb){
    // this function should call cb with boolean

    cb(null,true); // accept the file
    cb(null,false); // reject the file
    cb(new Error("this is error.")); // throw a error.
}
```
</details>

<hr />
<br />

## Multer middlewares

<details>
<summary>.single(fieldname)</summary>

> 🟢 Accept a single file with the name fieldname. This single file will be stored in `req.file`.

</details>

<details>
<summary>.array(fieldname,maxCount)</summary>

> 🟢 Accept an array of files, all with the `fieldname`. Optionally error out if more than maxCount files are uploaded. The array of files will be stored in `req.files.`

</details>

<details>
<summary>.fields(fields)</summary>

> 🟢 Accept a mix of files, specified by a `fields` array of objects.

The fields objects : 

```js
[
    {name : "fieldname", maxCount : 1},
    {name : "anotherFieldName", maxCount : 8}
]
```

</details>

<details>
<summary>.none()</summary>

> 🟢 Accept only text fields. If any file upload is made, error with code "LIMIT_UNEXPECTED_FILE" will be issued.

</details>

<details>
<summary>.any()</summary>

Accepts all files that comes over the wire. An array of files will be stored in `req.files`.

</details>

<hr />
<br />

## Error Handling

```js
const multer = require("multer");

// create the middleware
const upload = muter().single("avater");


app.post("/route",(req,res)=>{
    // use the multer inside the another middleware

    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            // here handle the multer error
        }
    })else if(err){
        // for unknown error
    }

    // here all fine.
})
```