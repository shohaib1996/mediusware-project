import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactInfoModal from "./ContactInfoModal";


const AllContact = () => {
    const [allContacts, setAllContacts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [contact, setContact] = useState([])
    const [showEvenId, setShowEvenId] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        axios.get(`https://contact.mediusware.com/api/contacts/?page=${page}&page_size=20`)
            .then(res => setAllContacts(res.data.results))
    }, [page])
    console.log(allContacts);
    const handleModal = (contactInfo) => {
        console.log(contactInfo);
        setContact(contactInfo)
        setShowModal(true)
    }
    const handleCheckboxChange = () => {
        setShowEvenId(!showEvenId); 
    };
    const filteredContacts = showEvenId ? allContacts.filter(c => c.id % 2 === 0) : allContacts; 
    return (
        <div>
            <dialog id="my_modal_1" className="modal" open>
                <div className="modal-box max-w-5xl mx-auto">
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="py-4">
                        {
                            filteredContacts.map((contact, i) => <p key={contact.id}>
                                <span>{i + 1}-</span>
                                <span>Phone:</span>
                                <button onClick={() => handleModal(contact)}>{contact.phone}</button>
                                <span style={{ marginRight: "5px" }}>{contact.country.name}</span>
                                <span>ID: {contact.id}</span>
                            </p>)
                        }
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" style={{ border: "2px solid #46139f", marginRight: "5px" }}>Close</button>
                            <Link to="/problem-2/all-contact">
                                <button className="btn" style={{ backgroundColor: "#46139f", color: "white", marginRight: "5px" }}>All Contact</button>
                            </Link>
                            <Link to="/problem-2/us-contact">
                                <button className="btn" style={{ backgroundColor: "#ff7f50", color: "white" }}>Us Contact</button>
                            </Link>
                        </form>
                    </div>
                    <label>
                        <input type="checkbox" checked={showEvenId} onChange={handleCheckboxChange} />
                       Only Even
                    </label>
                </div>
                <div>
                    <button onClick={() => setPage(page - 1)} style={{color: "white", backgroundColor: "green", marginRight: "5px"}}>prev</button>
                    <button onClick={() => setPage(page + 1)} style={{color: "white",  backgroundColor: "green" }}>Next</button>
                </div>
            </dialog>
            <ContactInfoModal showModal={showModal} setShowModal={setShowModal} contactInfo={contact}></ContactInfoModal>
        </div>
    );
};

export default AllContact;