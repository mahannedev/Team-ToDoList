import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPAEBASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey)