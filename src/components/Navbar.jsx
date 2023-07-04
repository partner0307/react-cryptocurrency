import {
	FundOutlined,
	HomeOutlined,
	MenuOutlined,
	MoneyCollectOutlined
} from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(undefined);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 800) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	const menuItems = [
		{
			key: 'Home',
			icon: <HomeOutlined />,
			label: <Link to={'/'}>Home</Link>,
		},
		{
			key: 'Cryptocurrencies',
			icon: <FundOutlined />,
			label: <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>,
		},
		{
			key: 'Exchanges',
			icon: <MoneyCollectOutlined />,
			label: <Link to={'/exchanges'}>Exchanges</Link>,
		},
		{
			key: 'News',
			icon: <MoneyCollectOutlined />,
			label: <Link to={'/news'}>News</Link>,
		},
	];

	return (
		<div className='nav-container'>
			<div className='logo-container'>
				<Avatar src={icon} size='large' />
				<Typography.Title level={2} className='logo'>
					<Link to={'/'}>Cryptocurrency</Link>
				</Typography.Title>
				<Button
					className='menu-control-container'
					onClick={() => setActiveMenu(!activeMenu)}
				>
					<MenuOutlined />
				</Button>
			</div>
			{activeMenu && <Menu theme='dark' items={menuItems}></Menu>}
		</div>
	);
};

export default Navbar;
