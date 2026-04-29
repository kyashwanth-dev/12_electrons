import { useNotificationStore } from '../context/NotificationContext'

/**
 * Hook to trigger in-app notifications on events
 */
export const useEventNotifications = () => {
  const { addNotification } = useNotificationStore()

  const notifyComponentAdded = (componentName) => {
    addNotification({
      title: 'Please Wait!',
      body: `Your ${componentName} will be collected soon...`,
    })
  }

  const notifyComponentRepair = (componentName) => {
    addNotification({
      title: 'Repair Request Received 🔧',
      body: `${componentName} has been sent for repair`,
    })
  }

  const notifyBuyRequest = (componentName) => {
    addNotification({
      title: 'Buy Request Submitted 🛒',
      body: `Your buy request is under processing. We will deliver ${componentName} to you shortly.`,
    })
  }

  const notifyRentRequest = (componentName) => {
    addNotification({
      title: 'New Rent Request! 📦',
      body: `Someone wants to rent your ${componentName}`,
    })
  }

  const notifyRepairRequest = (componentType) => {
    addNotification({
      title: 'New Repair Request! 🔧',
      body: `${componentType} needs repair support, we will collect your component soon...`,
    })
  }

  const notifyLoginSuccess = (userEmail) => {
    addNotification({
      title: 'Welcome back! 👋',
      body: `Logged in as ${userEmail}`,
    })
  }

  const notifyLogout = () => {
    addNotification({
      title: 'Goodbye!',
      body: 'You have been logged out',
    })
  }

  return {
    notifyComponentAdded,
    notifyComponentRepair,
    notifyBuyRequest,
    notifyRentRequest,
    notifyRepairRequest,
    notifyLoginSuccess,
    notifyLogout,
  }
}
