import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactInfoModal from "./ContactInfoModal";


const UsContact = () => {
    const [usaContact, setUsaContact] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [contact, setContact] = useState([])
    const [showEvenId, setShowEvenId] = useState(false)
    useEffect(() => {
        axios.get('https://contact.mediusware.com/api/country-contacts/United%20States/')
            .then(res => setUsaContact(res.data.results))
    }, [])
    console.log(usaContact);
    const handleModal = (contactInfo) => {
        console.log(contactInfo);
        setContact(contactInfo)
        setShowModal(true)
    }
    const handleCheckboxChange = () => {
        setShowEvenId(!showEvenId); 
    };
    const filteredContacts = showEvenId ? usaContact.filter(c => c.id % 2 === 0) : usaContact; 
    return (
        <div>
            <dialog id="my_modal_1" className="modal" open>
                <div className="modal-box max-w-5xl mx-auto">
                    <h3 className="font-bold text-lg">Contact (USA)</h3>
                    <p className="py-4">
                        {
                           filteredContacts.map((contact, i) =>
                                <p key={contact.id}>
                                    <span>{i + 1}-</span> 
                                    <span>Phone:</span>
                                    <button onClick={()=> handleModal(contact)}>{contact.phone}</button> <span style={{marginRight: "5px"}}>{contact.country.name}</span>
                                    <span>{contact.id}</span>
                                </p>)
                        }
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" style={{ border: "2px solid #46139f", marginRight: "5px" }}>Close</button>
                            <Link to="/problem-2/all-contact">
                                <button className="btn" style={{backgroundColor: "#46139f", color: "white", marginRight: "5px"}}>All Contact</button>
                            </Link>
                            <Link to="/problem-2/us-contact">
                                <button className="btn" style={{backgroundColor: "#ff7f50", color: "white"}}>Us Contact</button>
                            </Link>
                        </form>
                    </div>
                    <label>
                        <input type="checkbox" checked={showEvenId} onChange={handleCheckboxChange} />
                        Only Even
                    </label>
                </div>
            </dialog>
            <ContactInfoModal contactInfo={contact} showModal={showModal} setShowModal={setShowModal}></ContactInfoModal>
        </div>
    );
};

export default UsContact;