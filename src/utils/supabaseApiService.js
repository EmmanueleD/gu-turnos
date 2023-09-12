import { supabase } from './supabaseClient'
import { useDataStore } from '../store/dataStore';  



function handleError(error) {
  const dataStore = useDataStore()
  dataStore.showToast({
    message:`Error: ${error.message}`,
    severity:'alert-info'
  })
  return error.message
}

function handleSuccess(message) {
  const dataStore = useDataStore()
  dataStore.showToast({
    message,
    severity:'alert-success'
  })
}

export async function getSupaData({ tableName, columns = '*' }) {
  if (!tableName) return;

  const { data, error } = await supabase
    .from(tableName)
    .select(columns)

  if(error) return handleError(error)
  if(data) handleSuccess(`Informacion de ${tableName} recibida`)

  return data
}

export async function getSupaDataWithFilter({ tableName, columns = '*', filterColumn = 'id', filterValue }) {
  if (!tableName) return;

  const { data, error } = await supabase
    .from(tableName)
    .select(columns)
    .eq(filterColumn, filterValue)

  if(error) return handleError(error)
  if(data) handleSuccess(`Informacion de ${tableName} recibida`)

  return data
}

export async function putSupaData({tableName, newItem}){
  if(!tableName || !newItem ) return

  const {error} = await supabase
    .from(tableName)
    .update(newItem)
    .eq('id', newItem.id)

  if(error) return handleError(error)
  handleSuccess('Item modificado con exito')
  return true
}

export async function postSupaData({tableName, newItem}){
  if(!tableName) return

  const {data, error} = await supabase
    .from(tableName)
    .insert([newItem])
    .select()

  if(error) return handleError(error)
  if(data) handleSuccess('Nuevo item creado con exito')

  return data
}

export async function deleteSupaData({tableName, item}){
  if(!tableName || !item) return

  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', item.id)

  if(error) return handleError(error)
  handleSuccess('Item eliminado')
  return true
}