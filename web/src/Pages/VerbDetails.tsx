import { useParams } from "react-router-dom"

function VerbDetails() {
    
    const { id } = useParams();

    return (
        <h1>Verb details {id}</h1>
    );
  }
  
  export default VerbDetails;