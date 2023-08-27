<template>
<div class="flex">
  <div v-if="currentView == 'resourceTimelineOneDay' || currentView == 'resourceTimeline'" class="w-1/4 flex-none collapse bg-base-200 mb-4">
    <input v-model="showPersons" type="checkbox" />
    <div class="collapse-title text-xl font-medium">Agrega una persona</div>
    <div class="collapse-content">
      <People title="Encargad@" :options="encangardoOptions" :addNuovaPersona="addNuovaPersona" />
      <People title="Caja" :options="cajaOptions" :addNuovaPersona="addNuovaPersona" />
      <People title="Barista" :options="baristaOptions" :addNuovaPersona="addNuovaPersona" />
      <People title="Venta" :options="ventaOptions" :addNuovaPersona="addNuovaPersona" />
      <People title="Runner" :options="runnerOptions" :addNuovaPersona="addNuovaPersona" />
    </div>
  </div>

  <div class="flex-grow p-4">
    <div v-if="currentView == 'resourceTimelineOneDay' || currentView == 'resourceTimeline'" class="mb-4">  
    <button class="btn btn-primary mr-2" @click="copyCurrenDateEvents">Copia dia</button>
    <button class="btn btn-primary mr-2" @click="pasteCurrenDateEvents" :disabled="copiedEvents.length == 0">Pega dia</button>
    <button class="btn btn-primary mr-2" @click="deleteCurrenDateEvents">Reset el dia</button>
  </div>


  <FullCalendar 
    ref="fullCalendar"
    class="demo-app-calendar "
    :options="calendarOptions"
  >
    <template v-slot:eventContent="arg">
      {{ arg.timeText }}
      <h3>{{ arg.event.title }}</h3>
    </template>
  </FullCalendar>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue"
import { getCalendarConfig } from '@/utils/calendarConfig.js'

import People from "../components/People.vue"
import FullCalendar from "@fullcalendar/vue3"

import { useDataStore } from '@/store/dataStore'

const dataStore = useDataStore()

const encangardoOptions = dataStore.staff.filter(x => x.resourceId == 1)
const cajaOptions = dataStore.staff.filter(x => x.resourceId == 2)
const baristaOptions = dataStore.staff.filter(x => x.resourceId == 3)
const ventaOptions = dataStore.staff.filter(x => x.resourceId == 4)
const runnerOptions = dataStore.staff.filter(x => x.resourceId == 5)

const showPersons = ref(false)
const fullCalendar = ref(null)
const copiedEvents = ref([])
const currentView = ref(null)

// calendar options functions
const calendarOptions = ref(getCalendarConfig({onEventDrop, onEventResize, onDateSet, editable:true}))

function onEventDrop(eventDropInfo) {
  const { events } = calendarOptions.value
  const currentEvent = events.find(
    (event) => event.id === eventDropInfo.event.id
  )
  const duration = currentEvent.end ? currentEvent.end - currentEvent.start : 0
  currentEvent.start = eventDropInfo.event.start

  if (duration > 0) {
    currentEvent.end = new Date(currentEvent.start.getTime() + duration)
  }

  if (eventDropInfo.newResource) {
    currentEvent.resourceId = eventDropInfo.newResource.id
  }
}

function onEventResize(eventResizeInfo) {
  const { events } = calendarOptions.value
  const currentEvent = events.find(
    (event) => event.id === eventResizeInfo.event.id
  )

  currentEvent.start = eventResizeInfo.event.start
  currentEvent.end = eventResizeInfo.event.end
}

function onDateSet(info){
  currentView.value = info.view.type
}


// utils
function getCurrentDate(){
  return  fullCalendar.value.getApi().getDate()
}

function addNuovaPersona(people) {
  const today = getCurrentDate()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0)
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0)

  calendarOptions.value.events.push({
    id: people.title + "-" + new Date().toString(),
    title: people.title,
    backgroundColor: people.backgroundColor,
    textColor: people.textColor,
    borderColor:people.textColor,
    resourceId: people.resourceId,
    start: start,
    end: end,
  })
}

function copyCurrenDateEvents() {
  const date = getCurrentDate()
  const { events } = calendarOptions.value
  copiedEvents.value = events.filter(
    (event) => {
      return new Date(event.start).toDateString() === date.toDateString()
    }
  ).map(event => ({...event}))
}

function pasteCurrenDateEvents() {
  const date = getCurrentDate()
  const { events } = calendarOptions.value
  copiedEvents.value.forEach(copiedEvent => {
    const duration = copiedEvent.end ? new Date(copiedEvent.end).getTime() - new Date(copiedEvent.start).getTime() : 0
    const newEvent = {...copiedEvent, id: copiedEvent.title + "-" + new Date().toString()}
    newEvent.start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date(copiedEvent.start).getHours(), new Date(copiedEvent.start).getMinutes())
    if (duration > 0) {
      newEvent.end = new Date(newEvent.start.getTime() + duration)
    }
    events.push(newEvent)
  })
}

function deleteCurrenDateEvents(){
  const date = getCurrentDate()
  calendarOptions.value.events = calendarOptions.value.events.filter(
    (event) => new Date(event.start).toDateString() !== date.toDateString()
  )
}

</script>
