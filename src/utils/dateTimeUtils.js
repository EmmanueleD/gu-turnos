export function formatDateTime({dateString}){
    return new Date(dateString).toLocaleDateString('es', {
        year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit'
    })
}

export function formatDate({dateString}){
    return new Date(dateString).toLocaleDateString('es', {
        year:'numeric', month:'short', day:'2-digit'
    })
}

export function formatTime({timeString}){
    const [hours, minutes, seconds] = timeString.split(':')
    return `${hours}:${minutes}`
}