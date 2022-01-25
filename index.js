/**
 * @author intair
 * @since 12/23/2021
 * @fixed 1/10/2021
 */

// Replace USER-HERE with a Valid Username
const user = 'charlidamelio'

const axios = require('axios');

const getTikTokURL = (tiktok_username) => `https://www.tiktok.com/@${tiktok_username}`;

async function User(tiktok_username) {
	const url = getTikTokURL(tiktok_username);

	try {
	const { data } = await axios.get(url, {
		headers: {
			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
			'upgrade-insecure-requests': '1',
			authority: 'www.tiktok.com',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate'
		}
	});
	
	const parse = (str, l, r) => str.split(l)[1]?.split(r)[0] || "N/A";

	const ProfileUsername = parse(data, `"uniqueId":"`, `",`),
		ProfileName = parse(data, `"nickname":"`, `",`),
		isVerified = parse(data, `"verified":`, `,`),
		isPrivate = parse(data, `"privateAccount":`, `,`),
		ProfileBio = parse(data, `signature":"`, `"`).replace(/\\n/g, "\n"),
		ProfileLink = parse(data, `"tiktok-847r2g-SpanLink e1h20w7z2">`, `</span>`),
		ProfileFollowing = parse(data, `"followingCount":`, `,`),
		ProfileFollowers =  parse(data, `"followers-count">`, `</`),
		ProfileLikes = parse(data, `"likes-count">`, `</`)

	console.log(`Username => @${ProfileUsername}\nName= > ${ProfileName}\nVerified? => ${isVerified}\nPrivate? => ${isPrivate}\nBio => ${ProfileBio}\nLinked Website => ${ProfileLink}\nFollowing => ${ProfileFollowing}\nFollowers => ${ProfileFollowers}\nLikes => ${ProfileLikes}`);

	} catch (e) {
		console.log('User Doesn\'t Exist.')
	}
}
User(user)