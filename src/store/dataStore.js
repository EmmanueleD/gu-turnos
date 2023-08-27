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
            calendarEvents:true
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
                    this.calendarEvents = res
                })
                .catch(err =>{
                    this.error = err
                })
                .finally(()=>{
                    this.storeLoading.calendarEvents = false
                })
        },
    },
})