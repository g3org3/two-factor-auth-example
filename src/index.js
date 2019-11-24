const speakeasy = require('speakeasy')

const generateUrl = (secret, issuer, username) => `otpauth://topt/${issuer}:${username}?secret=${secret}&issuer=${issuer}`
const generateQRCode = (url) => `https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${url}`

function main() {
	// INIT
	const { base32 } = speakeasy.generateSecret({ length: 20 }) 
	const url = generateUrl(base32, 'FFYN', 'jorge.adolfo') 
	const qrlink = generateQRCode(url)
	console.log({ url, qrlink })

	// VERIFY
	const [secret, token] = process.argv.slice(2)
	const isValid = speakeasy.totp.verify({ secret, encoding: 'base32', token })
	console.log({ isValid })

	// CODE
	const code = speakeasy.totp({ secret, encoding: 'base32' })
	console.log({ code })
}
main()

