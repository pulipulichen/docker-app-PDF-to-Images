const ShellExec = require('./lib/ShellExec')
const GetFiles = require('./lib/GetFiles')
const isColab = require('./lib/isColab')

const path = require('path')
const fs = require('fs')

let main = async function () {
  let files = GetFiles()

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.endsWith('.pdf') === false) {
      continue
    }

    let filename = path.basename(file)
		let dirname = path.dirname(file)
    let filenameNoExt = filename
    if (filenameNoExt.endsWith('.pdf')) {
      filenameNoExt = filenameNoExt.slice(0, -4)
    }

		fs.mkdirSync(`/output/${filenameNoExt}/`, {recursive: true})

		let result
		let cmd = `pdfimages "${file}" -png "/output/${filenameNoExt}/"`
		console.log(cmd)
		try {
			result = await ShellExec(cmd)
		}
		catch (e) {
			console.error(e)
		}

    // ----------------------------------------------------------------

    if (isColab) {
      try {
  			await ShellExec(`cd "/output/${filenameNoExt}/"; zip -r -j "../${filenameNoExt}.zip" ./*`)
  		}
  		catch (e) {
  			console.error(e)
  		}
    }
  }
}

main()
