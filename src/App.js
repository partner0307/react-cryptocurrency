import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import {
	Cryptocurrencies,
	CryptoDetail,
	Exchanges,
	Homepage,
	Navbar,
	News,
} from './components';
import { Layout, Typography, Space } from 'antd';

function App() {
	return (
		<div className='app'>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='main'>
				<Layout>
					<div className='routes'>
						<Routes>
							<Route path='/' element={<Homepage />}></Route>
							<Route
								path='/exchanges'
								element={<Exchanges />}
							></Route>
							<Route
								path='/cryptocurrencies'
								element={<Cryptocurrencies />}
							></Route>
							<Route
								path='/crypto/:coinId'
								element={<CryptoDetail />}
							></Route>
							<Route path='/news' element={<News />}></Route>
						</Routes>
					</div>
				</Layout>
				<div className='footer'>
					<Typography.Title
						level={5}
						style={{ color: 'white', textAlign: 'center' }}
					>
						Cryptocurrency <br />
						All rights reserved
					</Typography.Title>
					<Space>
						<Link to='/'>Home</Link>
						<Link to='/cryptocurrencies'>Cryptocurrencies</Link>
						<Link to='/exchanges'>Exchanges</Link>
						<Link to='/news'>News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}

export default App;
