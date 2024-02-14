// [CODED BY: HUI ANGELES]
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import Footer from '../components/Footer';
import '../styles/Homepage/homecontainer.css';

export default function Home() {
    const data = {
        title: "CodeHealth Pharmacy",
        content: "Bridging the Gap Between Code Crafters and Wellness Seekers!",
        destination: "/products",
        label: "Shop Now"
    }

	return(
        <>
            <Banner data={data}/>
            <Highlights data={data}/>
            <Footer/>
        </>
	);
}