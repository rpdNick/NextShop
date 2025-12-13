// Firestore profile data
export interface UserProfile {
  email: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Serializable subset of FirebaseUser for Redux state
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  providerId: string;
}

// Auth slice state
export interface AuthState {
  user: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

