import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import PropTypes from 'prop-types';

function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className="content">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout