import { defineStore } from "pinia";
export const useShareDriveStore = defineStore('sharedrivestore', {
    const available = ref(true)
    const vehicle = ref('')
    const location = ref('')
    const destination = ref('')

    const availableDrivers = [
        {id: 'D1', name: 'Driver1'},
        {id: 'D2', name: 'Driver2'},
        {id: 'D3', name: 'Driver3'}

    ]
})