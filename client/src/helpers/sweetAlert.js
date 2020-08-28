// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

class SweetAlert {
  static showAlertFail (message) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }

  static showAlertSuccess (message) {
    Swal.fire({
      title: 'SUCCESS!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
}

export default SweetAlert
