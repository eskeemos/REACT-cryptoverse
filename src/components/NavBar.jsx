import React , {useState, useEffect}from 'react'
import icon from '../images/cryptocurrency.png';
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd'

const NavBar = () => {
  const [ActiveMenu, setActiveMenu] = useState(true);
  const [ScreenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(ScreenSize < 768){
      setActiveMenu(false)
    }else{
      setActiveMenu(true);
    }
  }, [ScreenSize])

  return (
    <div className="nav-cont">
      <div className="logo-cont">
        <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>
          <Button className="menu-control-cont" onClick={() => setActiveMenu(!ActiveMenu)}>
            <MenuOutlined />
          </Button>
      </div>
      {ActiveMenu && (
        <Menu theme="dark">
          <Menu.Item icon={< HomeOutlined/>} key="Home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={< FundOutlined />} key="Cryptocurrencies">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={< MoneyCollectOutlined />} key="Exchanges">
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={< HomeOutlined />} key="News">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default NavBar
