const showErrorMessage = (mensaje, confirmButtonText = 'OK') => showMessage(mensaje, 'error', confirmButtonText)

const showSuccessMessage = (mensaje, confirmButtonText = 'OK') => showMessage(mensaje, 'success', confirmButtonText)

const showMessage = (mensaje, icon, confirmButtonText = 'OK') => {
    return Swal.fire({
        icon,
        title: mensaje,
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonText
    })
}

export { showErrorMessage, showSuccessMessage }