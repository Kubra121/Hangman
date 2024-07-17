
interface MessageProps {
    message: string;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => (
    <div
        style={{
            fontFamily: "fantasy",
            fontSize: '50px',
            position: 'fixed',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '30px',
            border: '6px solid black',
            borderRadius: '30px',
            zIndex: 9999,
        }}
    >
        {message}
    </div>
);

export default MessageComponent;