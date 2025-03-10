// import
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware"; 
import { AppwriteException, ID, Models } from "appwrite"
import { account } from "@/models/client/config";


// interface definitions
export interface UserPrefs {
    reputation: number
}

interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null;
    hydrated: boolean

    setHydrated(): void;
    verifySession(): Promise<void>;

    login(
        email: string,
        password: string,
    ): Promise<{
        success: boolean; 
        error?: AppwriteException | null;
    }> 
    createAccount(
        name: string,
        email: string,
        password: string,
    ): Promise<{
        success: boolean; 
        error?: AppwriteException | null;
    }> 
    logout(): Promise<void>
}


// immer and persist
export const useAuthStore = create<IAuthStore>()(
    // keeping everything in local storage
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            // defining all methods that we created in interface IAuthStore
            setHydrated() {
                set({
                    hydrated: true
                })
            },

            async verifySession() {
                try {
                    const session = await account.getSession("current")
                    // if user deleted manually from backend
                    const user = await account.get<UserPrefs>();

                    set({ session,user })
                } catch (error) {
                    console.log(error);

                    // if user is deleted from appwrite manually, log out and clear session
                    set({ session: null, jwt: null, user: null })
                    
                }
            },
            
            
            async login(email: string, password: string) {
                
                try {
                    const session = await account.createEmailPasswordSession(email, password)
                    const [user, {jwt}] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()

                    ])
                    if(!user.prefs?.reputation)
                        await account.updatePrefs<UserPrefs>({
                    reputation: 0
                })

                set({session, user, jwt})

                return { success: true}
                    
                } catch (error) {

                    console.log(error);
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    } 
                }
            },
            async createAccount(name: string, email: string, password: string) {
                try {
                    await account.create(ID.unique(), email, password, name) 
                    return { success: true }
                    
                } catch (error) {
                    console.log(error);
                    
                    return {      
                        success: false,
                        error: error instanceof AppwriteException ? error: null,
                    }
                }
                
            },
            
            async logout() {
                try {
                    await account.deleteSessions()
                    set({session: null, jwt: null, user: null})
                } catch (error) {
                    console.log(error);
                    
                }
            },
        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if(!error)
                        state?.setHydrated()
                }
            }
        }
    )
)