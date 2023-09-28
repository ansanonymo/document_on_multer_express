# Here I document on Form Input File

This file contains : 

- [Input File](#input-file)
- [Additional Attribute of Input File Fields](#additional-attribute-of-input-file-fields)

## Input File

Here is the simple html input file structure :

```html
<form 
    action="url_to_hit"
    method="method_type"
    enctype="multipart/form-data"
    >
    <input 
        type="file" 
        name="named_the_file" />

    <input 
        type="submit"
        value="button_text" />

</form>
```


## Additional Attribute of Input File Fields

#### accept

> 🟢 The accept attribute value is a string that define the file types. This string is a comma-separated list of unique file type specifiers.

Here is unique file type specifier forms : 

1. A valid case-insensitive filename extension, start with a dot ("."). For example : `.pdf`, `.docx` etc.
2. A valid MiME type string, with no extensions.
3. The string `audio/*` meaning "any audio file".
4. The string `video/*` meaning "any video file".
5. The string `image/*` meaning "any image file".

[Example File is Here](./practice_html/accept.html)

#### multiple

> 🟢 It's boolean attribute, it's allow the user select multiple files.

[Here is example file](./practice_html/multiple.html)

