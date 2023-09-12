import { defineStore } from 'pinia'
import { getSupaData } from '@/utils/supabaseApiService'

export const useDataStore = defineStore({
    id: 'data',
    state: () => ({
        staff: [],
        calendarEvents: [],
        storeError:null,
        storeLoading:{
            staff:true,
            calendarEvents:true,
            calendarRecurrentEvents:true,
        },
        toast:{
            message:null,
            severity:null
        }
        
    }),
    actions: {
        async fetchData() {
            this.staff.splice(0)
            this.calendarEvents.splice(0)

            getSupaData({ tableName: 'staff' })
                .then(res =>{
                    this.staff = res
                })
                .catch(err =>{
                    this.error = err
                })
                .finally(()=>{
                    this.storeLoading.staff = false
                })
            
            getSupaData({ tableName: 'calendar-event' })
                .then(res =>{
                    res.forEach(event =>{
                        this.calendarEvents.push(event)
                    })
                })
                .catch(err =>{
                    this.error = err
                })
                .finally(()=>{
                    this.storeLoading.calendarEvents = false
                })

            getSupaData({tableName:'recurrent-shift'})
                .then(res =>{
                    res.forEach(event =>{
                        if (event.active) this.calendarEvents.push(event)
                    })
                })
                .catch(err =>{
                    this.error = err
                })
                .finally(()=>{
                    this.storeLoading.calendarRecurrentEvents = false
                })
        },
        showToast(toast){
            this.toast.message = toast.message
            this.toast.severity = toast.severity
            setTimeout(() => {
                this.toast.message = null
                this.toast.severity = null
            }, (3000));
        }
    },
})