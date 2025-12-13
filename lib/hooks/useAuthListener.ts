'use client';

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useAppDispatch } from "../store";
import { clearUser, setError, setLoading, setUser } from "../store/slices/authSlice";
import { AuthUser } from "../types/user";
import { User as FirebaseUser } from "firebase/auth";

const mapUser = (user: FirebaseUser): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  phoneNumber: user.phoneNumber,
  emailVerified: user.emailVerified,
  providerId: user.providerId,
});

/**
 * Subscribes to Firebase Auth state and keeps Redux in sync.
 */
export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        dispatch(setUser(user ? mapUser(user) : null));
      },
      (error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    );

    return () => unsubscribe();
  }, [dispatch]);
}

