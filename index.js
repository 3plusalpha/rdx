const listeners = []

export const rdxMiddleware = () => next => action => {
    listeners.forEach(listener => {
        if (!action || !action.type || !listener.cb) {
            return
        }
        if (action.type === listener.actionType) {
            listener.cb(action)
        }
    })
    return next(action)
}

export const listenTo = (actionType, cb) => {
    if (!actionType) {
        console.warn(`No action type provided`)
        return
    }
    if (!cb) {
        console.warn(`No callback for action type ${actionType} provided`)
        return
    }

    listeners.push({
        actionType,
        cb 
    })
}