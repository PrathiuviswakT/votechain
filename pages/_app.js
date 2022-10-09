import '../styles/globals.css'
//INTERNAL INPORT
import{ VotingProvider } from "../context/Voter";
import NavBar from "../components/NavBar/NavBar";
const MyApp = ({ Component, pageProps }) => ( 
  <VotingProvider> 
    <div>
      <div> 
        <Component {...pageProps} />; 
      </div> 
    </div> 
  </VotingProvider> 
  ); 

export default MyApp
