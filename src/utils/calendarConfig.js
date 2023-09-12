
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"
import interactionPlugin from "@fullcalendar/interaction"
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid"
import adaptivePlugin from '@fullcalendar/adaptive'
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';

import { useDataStore } from '@/store/dataStore'

const dataStore = useDataStore()

export function getCalendarConfig({onEventDrop, onEventResize, onDateSet, editable} ) {
    return {
        
            plugins: [resourceTimelinePlugin, interactionPlugin, resourceTimeGridPlugin, adaptivePlugin, listPlugin, dayGridPlugin],
          
            schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
            headerToolbar: {
              left: "prev,next today",
              center: "title",
              right:
                "resourceTimelineOneDay,resourceTimelineWeek listWeek dayGridWeek resourceTimeGridOneDay,resourceTimeGridTwoDay,resourceTimeGridThreeDay,resourceTimeGridFourDay,resourceTimeGridFiveDay,resourceTimeGridWeek",
            },
            initialView: "resourceTimeline",

            height: 'auto',
          
            eventDrop: onEventDrop,
            eventResize: onEventResize,
            datesSet: onDateSet,

            locale:esLocale,
          
            views: {

              dayGridWeek: { 
                type:'dayGridWeek',
                eventTimeFormat: { hour: 'numeric',
                minute: '2-digit', }
              },
              resourceTimelineOneDay: {
                type: 'resourceTimelineDay',
                duration: { days: 1 },
                buttonText: 'Timeline day'
              },
              resourceTimelineWeek: {
                type: 'resourceTimelineDay',
                duration: { days: 7 },
                buttonText: 'Timeline week',
                slotDuration:'24:00:00',
              },
              resourceTimeGridOneDay: {
                type: 'resourceTimeGrid',
                duration: { days: 1 },
                buttonText: '1 day'
              },
              resourceTimeGridTwoDay: {
                type: 'resourceTimeGrid',
                duration: { days: 2 },
                buttonText: '2 days'
              },
              resourceTimeGridThreeDay: {
                type: 'resourceTimeGrid',
                duration: { days: 3 },
                buttonText: '3 days'
              },
              resourceTimeGridFourDay: {
                type: 'resourceTimeGrid',
                duration: { days: 4 },
                buttonText: '4 days'
              },
              resourceTimeGridFiveDay: {
                type: 'resourceTimeGrid',
                duration: { days: 5 },
                buttonText: '5 days'
              },
              resourceTimeGridSixDay: {
                type: 'resourceTimeGrid',
                duration: { days: 6 },
                buttonText: '6 days'
              }
            },


            resources: [
              {
                id: 1,
                title: "Enc.",
              },
              {
                id: 2,
                title: "Caja",
              },
              {
                id: 3,
                title: "Bar",
              },
              {
                id: 4,
                title: "Venta",
              },
              {
                id: 5,
                title: "Run.",
              },
            ],
          
            events: dataStore.calendarEvents,
          

            firstDay: 1,
            resourceAreaWidth:'10%',
            editable,
            droppable: editable,
            eventResourceEditable: editable,
            eventDurationEditable: editable,
            eventResizableFromStart: editable,
            eventStartEditable: editable,
            datesAboveResources: editable,
            slotDuration:'00:15:00',
            snapDuration:'00:05:00',
            weekends: true,
            eventOverlap: true,
            displayEventTime:true,
            displayEventEnd: true,

          
            
            minTime: '06:00:00', 
            maxTime: '24:00:00', 
           
    }
  }