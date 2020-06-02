import { useState } from 'react';

import Head from 'next/head';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';

import fetch from 'isomorphic-unfetch'
// import houses from '../houses.json';


import { useStoreActions, useStoreState } from 'easy-peasy'


import axios from 'axios'



const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	let dayCount = 0;

	while (end > start) {
		dayCount++;
		start.setDate(start.getDate() + 1);
	}

	return dayCount;
};

const House = (props) => {
	const setShowLoginModal = useStoreActions((actions) => actions.modals.setShowLoginModal);

	const [ numberOfNightsBetweenDates, setNumberOfNightsBetweenDates ] = useState(0);
	const [ dateChosen, setDateChosen ] = useState(false);
	const [startDate, setStartDate] = useState()
	const [endDate, setEndDate] = useState()


	const user = useStoreState(state => state.user.user)


	return (
		<Layout
			content={
				<div className='container'>
					<Head>
						<title>{props.house.title}</title>
					</Head>
					<article>
						<img src={props.house.picture} width='100%' alt='House picture' />
						<p>
							{props.house.type}-{props.house.town}
						</p>
						<p>{props.house.title}</p>
						{props.house.reviewsCount ? (
							<div className='reviews'>
								<h3>{props.house.reviewsCount} Reviews</h3>

								{props.house.reviews.map((review, index) => {
									return (
										<div key={index}>
											<p>{new Date(review.createdAt).toDateString()}</p>
											<p>{review.comment}</p>
										</div>
								)})}
							</div>
) : (
	<></>
)}
					</article>
					<aside>
						<h2>Add dates for prices</h2>
						<DateRangePicker
							datesChanged={(startDate, endDate) => {
								console.log('Le start dia =>', startDate);

								console.log('Le fin dia =>', endDate);

								setNumberOfNightsBetweenDates(calcNumberOfNightsBetweenDates(startDate, endDate));
								setDateChosen(true)
    							setStartDate(startDate)
    							setEndDate(endDate)

							}}
						/>
						{dateChosen && (
							<div>
								<h2>Price per night </h2>
								<p>${props.house.price}</p>
								<h2>Total price for booking </h2>
								<p>${(numberOfNightsBetweenDates * props.house.price).toFixed(2)}</p>
								{user ? (
									<button
									className='reserve'
									onClick={async() => {
										//todo: add code to reserve
										try{
											const response = await axios.post('/api/houses/reserve',{
												houseId:props.house.id,
												startDate,
												endDate
											})
											if (response.data.status=='error'){
												alert(response.data.message)
												return
											}
											console.log(response.data)
										} catch(error){
											console.log(error)
											return
										}
									}}>
									Reserve
									</button>
									) : (
										<button
										className='reserve'
										onClick={() => {
											setShowLoginModal()
										}}>
										Log in to Reserve
										</button>
										)}



							</div>
						)}
					</aside>
					<style jsx>
						{`
							.container {
								display: grid;
								grid-template-columns: 60% 40%;
								grid-gap: 30px;
							}
							aside {
								border: 1px solid #ccc;
								padding: 20px;
							}
							button {
								background-color: rgb(255, 90, 95);
								color: white;
								font-size: 13px;
								width: 100%;
								border: none;
								height: 40px;
								border-radius: 4px;
								cursor: pointer;
							}
						`}
					</style>
				</div>
			}
		/>
	);
};
House.getInitialProps = async ({ query }) => {
	console.log("query => ",query);

	const { id } = query;

	const res = await fetch(`http://localhost:3000/api/houses/${id}`)
	
	const house = await res.json()


	return {
		house
	};
};

export default House;
