import { supabase } from "../config/supabaseClient.js";

export const CustomerModel = {
  async getAll(name, page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("customers").select("*", { count: "exact" });

    if (name) query = query.ilike("name", `%${name}%`);

    const { data, error, count } = await query.range(from, to);
    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(customer) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customer])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, customer) {
    const { data, error } = await supabase
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Customer deleted successfully" };
  },
};