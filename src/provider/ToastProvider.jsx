import { Toaster } from "react-hot-toast";

const ToastProvider = ( {children} ) => {
    return (
        <>
            <Toaster position="top-right" />
            {children}
        </>
    );
};

export default ToastProvider;