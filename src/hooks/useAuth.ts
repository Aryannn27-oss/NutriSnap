import { useAuthContext } from "@/components/features/auth/AuthContext";

export function useAuth() {
  const context = useAuthContext();
  return {
    user: context.user,
    loading: context.loading,
    profileData: context.profileData,
    signIn: context.signInWithEmail,
    signUp: context.signUpWithEmail,
    signOut: context.signOutUser,
    signInWithGoogle: context.signInWithGoogle,
    updateProfile: context.updateUserProfileData,
  };
}
