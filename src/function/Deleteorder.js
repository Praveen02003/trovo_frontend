// src/function/Deleteorder.js
import api from "../axios/Axios";
import { showSwal } from "./SwalHelper";

export const Deleteorder = async ({ order, allowedStatuses = ['Placed', 'Shipped', 'Processed'], onSuccess }) => {
    if (!order) return;

    const orderStatus = order.status || order.order_status;

    if (!allowedStatuses.includes(orderStatus)) {
        await showSwal({
            title: 'Cannot Delete',
            text: `Only orders with status ${allowedStatuses.join(', ')} can be deleted.`,
            icon: 'info'
        });
        return;
    }

    const confirm = await showSwal({
        title: 'Are you sure?',
        text: "Do you want to delete this order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    });

    if (confirm.isConfirmed) {
        try {
            const res = await api.get(`/deleteorder/${order.order_id}`);
            await showSwal({
                title: 'Deleted!',
                text: res.data.message || 'Order deleted successfully',
                icon: 'success',
                timer: 2000
            });
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Error deleting order:", err);
            await showSwal({
                title: 'Error!',
                text: 'Failed to delete order. Please try again.',
                icon: 'error'
            });
        }
    }
};