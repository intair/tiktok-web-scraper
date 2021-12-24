/**
 * @author intair
 * @since 12/23/2021
 */

const axios = require('axios');

const fs = require('fs')

const { JSDOM }= require("jsdom");

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
	
	const parse = (str, l, r) => str.split(l)[1].split(r)[0];

	const ProfileUsername = parse(data, `"uniqueId":"`, `",`),
		ProfilePFPURL = new JSDOM(data).window.document.querySelector("#main > div.jsx-834240835.main-body.page-with-header.middle.em-follow > div.jsx-2958430982.share-layout.compact.middle > div > header > div.share-info > div.jsx-260838931.image-wrap.big.user-page-header > span > img").getAttribute("src"),
		ProfileName = parse(data, `"nickname":"`, `",`),
		isVerified = parse(data, `"verified":`, `,`),
		isPrivate = parse(data, `"privateAccount":`, `,`),
		ProfileBio = parse(data, `signature":"`, `"`).replace(/\\n/g, "\n"),
		ProfileFollowing = parse(data, `"followingCount":`, `,`),
		ProfileFollowers =  parse(data, `"Followers">`, `<`),
		ProfileLikes = parse(data, `"Likes">`, `<`)

console.log
(`Username => @${ProfileUsername}
Name= > ${ProfileName}
Profile Pictue URL = > ${ProfilePFPURL}
Verified? => ${isVerified}
Private? => ${isPrivate}
Bio => ${ProfileBio ? ProfileBio : "No Bio"}
Following => ${ProfileFollowing}
Followers => ${ProfileFollowers}
Likes => ${ProfileLikes}`);

	} catch (e) {
		console.log('User not found!');
	}
}

User('USER-HERE')