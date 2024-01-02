const Notification = ({ message, error }) => {
    const notificationStyle = {
        color: error ? "red" : "green",
        fontSize: 24,
        margin: "20px 0",
        backgroundColor: "lightgrey",
        border: error ? "4px solid red" : "4px solid green",
        borderRadius: 10,
        width: 500,
    };

    if ((message === null) | (message?.length === 0)) {
        return null;
    }

    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
