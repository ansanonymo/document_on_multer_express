const getUrl = port =>{
    const url = "http://localhost:"+port+"/";


    return {
        singleImg : url+"singleImage",
        multipleImg : url+"multipleImage",
        uploadSuccessfully : url+"upload_successfully.html"
    }
}

module.exports = getUrl;