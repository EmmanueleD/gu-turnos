<template>
  <div class="p-4">
    <h1 class="font-bold text-4xl mb-4">
      {{ currentStaff.title }}
    </h1>
    <div class="flex">
      <div class="w-100 md:w-1/4 pr-2 pb-2">
        <div class="card border border-primary p-4 shadow-lg">
          <h2 class="font-bold text-2xl mb-4">Detalles</h2>
          <div class="flex flex-col mb-4">
            <label>Nombre</label>
            <input
              type="text"
              class="input input-bordered w-full"
              v-model="currentStaff.title"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label>Color del fondo</label>
            <input
              type="color"
              class="input input-bordered w-full"
              v-model="currentStaff.backgroundColor"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label>Color del texto y del borde</label>
            <input
              type="color"
              class="input input-bordered w-full"
              v-model="currentStaff.textColor"
            />
          </div>
          <div class="flex flex-col items-end mb-4">
            <button @click="deleteCurrentStaff" class="btn btn-error mb-4">
              Eliminar
            </button>
            <button @click="saveCurrentStaff" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 md:w-3/4 pr-2 pb-2">
        <div class="card border border-primary p-4 shadow-lg w-full">
          <h2 class="font-bold text-2xl mb-4">Turnos frecuentes</h2>
          <div class="collapse bg-base-200 w-full md:w-1/2 mb-4">
            <input type="checkbox" v-model="newRecurringShiftVisible" />
            <div class="collapse-title text-xl font-medium">
              <span class="mr-2">{{
                newRecurringShiftVisible ? "-" : "+"
              }}</span>
              Crea un nuevo turno frecuente
            </div>
            <div class="collapse-content">
              <div class="w-100 md:w-1/3 mb-4">
                <div class="flex flex-col mb-4">
                  <label>Hora de inicio</label>
                  <input
                    type="time"
                    class="input input-bordered w-full"
                    v-model="tempShift.startTime"
                  />
                </div>
                <div class="flex flex-col mb-4">
                  <label>Hora de fin</label>
                  <input
                    type="time"
                    class="input input-bordered w-full"
                    v-model="tempShift.endTime"
                  />
                </div>
              </div>
              <h4 class="font-bold text-lg mb-2">
                Selecciona los dias en que se repite el turno
              </h4>
              <div class="w-100 md:w-1/3 mb-4">
                <label class="label cursor-pointer">
                  <span class="label-text">Lunes</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[1].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Martes</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[2].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Miercoles</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[3].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Jueves</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[4].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Viernes</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[5].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Sabado</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[6].checked"
                  />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Domingo</span>
                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox"
                    v-model="mapDaysOfWeek[0].checked"
                  />
                </label>
              </div>
              <div class="w-full flex justify-end">
                <button @click="saveRecurrentShift" class="btn btn-primary">
                  Guardar nuevo turno frecuente
                </button>
              </div>
            </div>
          </div>

          <div class="collapse bg-base-200 w-full">
            <input type="checkbox" v-model="shiftListVisible" />
            <div class="collapse-title text-xl font-medium">
              <span class="mr-2">{{ shiftListVisible ? "-" : "+" }}</span>
              Turnos frecuentes
            </div>
            <div class="collapse-content">
              <Loading v-if="loadingGetRecurrentShifts" />
              <div v-else>
                <div
                  v-for="shift in recurrentShifts"
                  :key="shift.id"
                  class="flex justify-between items-center border border-primary bg-white rounded px-4 py-2 mb-4"
                >
                  <div class="flex justofy-start items-center">
                    <input
                      @change="saveRecurrentShift(shift)"
                      type="checkbox"
                      checked="checked"
                      class="checkbox mr-4"
                      v-model="shift.active"
                    />
                    <div class="mr-4">
                      <div class="flex">
                        <span
                          v-for="(day, index) in shift.daysOfWeek"
                          :key="index"
                          class="font-bold text-gray-700 mr-2"
                        >
                          {{ mapDaysOfWeek[day].text }}
                        </span>
                      </div>
                      <div>
                        {{ formatTime({ timeString: shift.startTime }) }} -
                        {{ formatTime({ timeString: shift.endTime }) }}
                      </div>
                    </div>
                  </div>
                  <button
                    @click="deleteRecurrentShift(shift)"
                    class="align-self-end btn btn-outline btn-error btn-xs"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from "@/store/dataStore";
import {
  putSupaData,
  postSupaData,
  getSupaDataWithFilter,
  deleteSupaData,
} from "@/utils/supabaseApiService";
import { formatTime } from "@/utils/dateTimeUtils.js";

import Loading from "@/components/Loading.vue";

const route = useRoute();
const router = useRouter();
const dataStore = useDataStore();
const currentStaff = ref(null);

const newRecurringShiftVisible = ref(false);
const shiftListVisible = ref(true);

const loadingGetRecurrentShifts = ref(false);
const recurrentShifts = ref([]);

const tempShift = ref({
  staff_id: 0,
  daysOfWeek: [],
  startTime: "",
  endTime: "",
});

const mapDaysOfWeek = ref([
  {
    value: 0,
    checked: false,
    text: "Domingo",
  },
  {
    value: 1,
    checked: false,
    text: "Lunes",
  },
  {
    value: 2,
    checked: false,
    text: "Martes",
  },
  {
    value: 3,
    checked: false,
    text: "Miercoles",
  },
  {
    value: 4,
    checked: false,
    text: "Jueves",
  },
  {
    value: 5,
    checked: false,
    text: "Viernes",
  },
  {
    value: 6,
    checked: false,
    text: "Sabado",
  },
]);

if (route.params.idStaff) {
  currentStaff.value = dataStore.staff.filter(
    (x) => x.id == route.params.idStaff
  )[0];
}

function saveCurrentStaff() {
  putSupaData({ tableName: "staff", newItem: currentStaff.value });
}

function buildTempShift(shift) {
  tempShift.value.title = currentStaff.value.title;
  tempShift.value.resourceId = currentStaff.value.resourceId;
  tempShift.value.backgroundColor = currentStaff.value.backgroundColor;
  tempShift.value.textColor = currentStaff.value.textColor;
  tempShift.value.staff_id = currentStaff.value.id;
  tempShift.value.daysOfWeek = shift.daysOfWeek;
  tempShift.value.startTime = shift.startTime;
  tempShift.value.endTime = shift.endTime;
}

function saveRecurrentShift(shift) {
  mapDaysOfWeek.value.forEach((day) => {
    if (day.checked) tempShift.value.daysOfWeek.push(day.value);
  });
  tempShift.value.staff_id = currentStaff.value.id;

  if (shift.id) {
    buildTempShift(shift);
    putSupaData({ tableName: "recurrent-shift", newItem: shift })
      .then((res) => {
        if (res) {
          resetTempShift();
        }
      })
      .finally(() => {
        getRecurrentShiftsForCurrentStaff();
        dataStore.fetchData();
      });
  } else {
    buildTempShift(tempShift.value);
    postSupaData({ tableName: "recurrent-shift", newItem: tempShift.value })
      .then((res) => {
        if (res) {
          resetTempShift();
        }
      })
      .finally(() => {
        getRecurrentShiftsForCurrentStaff();
        dataStore.fetchData();
      });
  }
}

function deleteRecurrentShift(shift) {
  deleteSupaData({ tableName: "recurrent-shift", item: shift }).then((res) => {
    if (res) {
      getRecurrentShiftsForCurrentStaff();
    }
  });
}

function resetTempShift() {
  newRecurringShiftVisible.value = false;
  tempShift.value = {
    staff_id: 0,
    daysOfWeek: [],
    startTime: "",
    endTime: "",
  };
}

function getRecurrentShiftsForCurrentStaff() {
  loadingGetRecurrentShifts.value = true;
  recurrentShifts.value.splice(0);

  getSupaDataWithFilter({
    tableName: "recurrent-shift",
    filterColumn: "staff_id",
    filterValue: route.params.idStaff,
  })
    .then((res) => {
      recurrentShifts.value = res;
    })
    .finally(() => {
      loadingGetRecurrentShifts.value = false;
    });
}

function deleteCurrentStaff() {
  deleteSupaData({
    tableName: "staff",
    item: {
      id: route.params.idStaff,
    },
  })
    .then(() => {
      dataStore.fetchData();
    })
    .finally(() => {
      router.push("/staff-list");
    });
}

onMounted(() => {
  getRecurrentShiftsForCurrentStaff();
});
</script>
