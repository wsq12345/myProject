import axios from 'axios'
export const getSong = () => {

		return new Promise((resolve, reject) => {
				let data = axios.get('https://api.apiopen.top/musicRankings');
				data.then((response) => {
					resolve(response.data.result[0].content);
				}).catch((e) => {
					console.log(e);
				})
			})
}
