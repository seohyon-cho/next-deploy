'use client';
import clsx from 'clsx';
import styles from './unsplash.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function Unsplash() {
	const { ImgPanelOpen, setImgPanelOpen } = useGlobalData();
	const [Pics, setPics] = useState([]);
	const [ImgUrl, setImgUrl] = useState('');
	console.log(ImgUrl);

	useEffect(() => {
		const fetchUnsplash = async () => {
			const num = 18;
			const flickr_api = process.env.NEXT_PUBLIC_FLICKR_API;
			const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
			const method_interest = 'flickr.interestingness.getList';
			const interestURL = `${baseURL}${method_interest}`;
			const data = await fetch(interestURL);
			const response = await data.json();
			console.log(response.photos.photo);
			setPics(response.photos.photo);
		};

		fetchUnsplash();
	}, []);

	return (
		<>
			{ImgPanelOpen && (
				<aside className={clsx(styles.unsplash)}>
					<h1>Unsplash</h1>
					<button onClick={() => setImgPanelOpen(false)}>close</button>
					<div>
						{Pics.map((pic, idx) => {
							return (
								<p key={pic.id}>
									<Image
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
										priority
										fill
										onClick={() => setImgUrl(`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`)}
									/>
								</p>
							);
						})}
					</div>
				</aside>
			)}
		</>
	);
}
