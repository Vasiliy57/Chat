import { toast } from 'react-toastify'
export const showNotification = (
  type: 'info' | 'error' | 'success' | 'warning',
  content: string
) => {
  const options = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  } as const

  switch (type) {
    case 'info':
      toast.info(content, options)
      break
    case 'error':
      toast.error(content, options)
      break
    case 'success':
      toast.success(content, options)
      break
    case 'warning':
      toast.warning(content, options)
      break
    default:
      break
  }
}
