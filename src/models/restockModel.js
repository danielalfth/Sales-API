import { supabase } from "../config/supabaseClient.js";

export const RestockModel = {
  async create({ product_id, supplier, quantity }) {
    // Insert restock record
    const { data: restock, error: insertError } = await supabase
      .from("restocks")
      .insert([{ product_id, supplier, quantity }])
      .select()
      .single();
    if (insertError) throw insertError;

    // Increment product stock by quantity
    const { data: product, error: rpcError } = await supabase.rpc(
      "increment_stock",
      { p_product_id: product_id, p_qty: quantity }
    );
    if (rpcError) throw rpcError;

    return { restock, updated_stock: product };
  },
};
