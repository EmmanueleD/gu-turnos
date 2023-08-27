import { supabase } from './supabaseClient'

export async function getSupaData({ tableName, columns = '*' }) {
  if (!tableName) return;

  const { data, error } = await supabase
    .from(tableName)
    .select(columns)

  if (error) return error.message;

  return data;
}

export async function putSupaData({tableName, newItem}){
  if(!tableName || !newItem ) return

  const {error} = await supabase
    .from(tableName)
    .update(newItem)
    .eq('id', newItem.id)

  if(error) return error.message

  return true
}