// src/function/SwalHelper.js
import Swal from "sweetalert2";

/**
 * Common Swal popup
 * @param {Object} params
 *  title - string, title of the alert
 *  text - string, description
 *  icon - 'success' | 'error' | 'warning' | 'info' | 'question'
 *  confirmButtonText - string
 *  cancelButtonText - string (optional)
 *  showCancelButton - boolean (optional)
 *  timer - number in ms (optional)
 */
export const showSwal = ({
    title = '',
    text = '',
    icon = 'info',
    confirmButtonText = 'OK',
    cancelButtonText = 'Cancel',
    showCancelButton = false,
    timer = null
}) => {
    const options = {
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton
    };

    if (showCancelButton) options.cancelButtonText = cancelButtonText;
    if (timer) options.timer = timer;

    return Swal.fire(options);
};