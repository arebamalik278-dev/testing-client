import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;