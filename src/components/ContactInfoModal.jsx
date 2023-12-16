/* eslint-disable react/prop-types */

const ContactInfoModal = ({ contactInfo, showModal, setShowModal }) => {
    console.log(contactInfo);
    return (
        <>
            {showModal && <dialog id="my_modal_1" className="modal" open>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        <span>{contactInfo.phone}</span>
                        <span>{contactInfo.country.name}</span>
                        <span>Id:{contactInfo.country.id}</span>
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={()=> setShowModal(false)} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>}
        </>
    );
};

export default ContactInfoModal;