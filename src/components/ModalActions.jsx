export const useModalActions = (element_id) => {
    const open = () => {
        const modal = document.getElementById(element_id)
        if (modal) {
            modal.showModal();
        }
    };

    const close = () => {
        const modal = document.getElementById(element_id)
        if (modal) {
            modal.close();
        }
    }

    return { open, close }
};