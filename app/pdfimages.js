const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

let main = async function () {
  let files = GetExistedArgv()

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

		let result
		let cmd = `pdfimages "${file}" -png ./`
		try {
			result = await ShellExec(cmd)
		}
		catch (e) {
			console.error(e)
		}
  }
}

main()
