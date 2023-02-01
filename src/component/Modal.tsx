import { FaTimes } from "react-icons/fa";
import ReactModal from "react-modal";

export default function Modal({ image, onClose }: {
    image: string | undefined,
    onClose: () => void
}) {
    return <ReactModal
        isOpen={!!image}
        onRequestClose={onClose}
        style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '3rem'
            }
        }}
    >
        <button
            className="absolute top-0 right-0 m-2"
            onClick={onClose}
        >
            <FaTimes />
        </button>
        <img src={image} alt="selected" className="object-cover w-full h-full" />
    </ReactModal>
}