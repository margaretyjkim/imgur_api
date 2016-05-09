const rootUrl = 'https://api.imgur.com/3/gallery/t'
const apiKey = '3c5f0028d9be1ff'

module.exports = {
	get (url) {
		return fetch(rootUrl + url, {
			headers: {
				'Authorization': 'Client-ID' + apiKey
			}
		})
		.then((response) => {
			return response.json()
		})
	}
}