'use client'
import { createContext,useEffect,useState,useContext} from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
    session: Session | null;
    loading:boolean;
};



const AuthContext = createContext<AuthContextType>({session:null,loading:true});

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const [ session, setSession ] = useState<Session | null>(null);
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
            setLoading(false);
        });

        const { data:listener } = supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })

        return()=>{
            listener?.subscription.unsubscribe();
        }
    },[])
    return(
        <AuthContext.Provider value={{session,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
