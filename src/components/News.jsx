import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Loader } from '../components';
import defaultImage from '../images/default-image.png';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const { data } = useGetCryptosQuery(100);
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 12,
	});
	if (!cryptoNews?.value) return <Loader />;

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className='select-news'
						placeholder='Select a Crypto'
						optionFilterProp='children'
						onChange={value => setNewsCategory(value)}
						filterOption={(input, option) =>
							option.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value='Cryptocurrency'>Cryptocurrency</Option>
						{data?.data?.coins?.map(currency => (
							<Option value={currency.name} key={currency.name}>
								{currency.name}
							</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews?.value?.map((news, index) => (
				<Col key={index} xs={24} sm={12} lg={8}>
					<a
						href={news.url}
						target='_blank'
						rel='noreferrer'
						className='news-link'
					>
						<Card hoverable className='news-card'>
							<div className='news-image-container'>
								<Title className='news-title' level={4}>
									{news.name}
								</Title>
								<img
									style={{
										maxWidth: '100px',
										maxHeight: '100px',
									}}
									src={
										news?.image?.thumbnail?.contentUrl ||
										defaultImage
									}
									alt=''
								/>
							</div>
							<p className='news-description'>
								{news.description}
							</p>
							<div className='provider-container'>
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail
												?.contentUrl || defaultImage
										}
										alt=''
									/>
									<Text className='provider-name'>
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished)
										.startOf('ss')
										.fromNow()}
								</Text>
							</div>
						</Card>
					</a>
				</Col>
			))}
		</Row>
	);
};

export default News;
