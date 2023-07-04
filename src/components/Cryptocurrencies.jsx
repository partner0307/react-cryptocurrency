import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../components';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 8 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter(coin => {
			return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <Loader />;

	return (
		<>
			{!simplified && (
				<div className='search-crypto'>
					<Input
						placeholder='Search crypto currency'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 33]} className='crypto-card-container'>
				{cryptos?.map(currency => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className='crypto-card'
						key={currency.uuid}
					>
						<Link to={`/crypto/${currency.uuid}`}>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										alt={`${currency.name} logo`}
										className='crypto-image'
										src={currency.iconUrl}
									/>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Market Cap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {currency.change}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
