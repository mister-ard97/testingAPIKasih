const fs=require('fs')
const handlebars=require('handlebars')
const pdf=require('html-pdf')


module.exports={
    pdfcreate: (html, replacements, options,obj, cb) => {
        //reads html file
        console.log('pdfcreate')
        fs.readFile(html, {encoding: 'utf-8'}, async (err, readHTML) => {
            if(err){
                // console.log(err)
                throw err
            }
            else{
                // compiles html file and replaces fields
                let template = await handlebars.compile(readHTML);
                let htmlToPdf = template(replacements);

                // creates pdf stream from html
                console.log('finishpds')
                return pdf.create(htmlToPdf, options).toStream(async (err, stream) => {
                    if(err){
                        // console.log(err)
                        throw err
                    }
                    else{
                        return cb(stream, obj)
                    }
                });
            }
        })
    }
}