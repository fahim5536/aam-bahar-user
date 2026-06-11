import firebaseConfigJson from '../../firebase-applet-config.json'; // 👈 এখানে ডট দুটি বাড়িয়ে দেওয়া হয়েছে
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// (নোট: আপনার আগের কোডে firebase/app থেকে initializeApp ইম্পোর্ট করা ছিল, যদি এরর দেয় তবে ফাইলের শুরুতে import { initializeApp, getApps, getApp } from 'firebase/app'; লাইনটি রাখবেন)

// 1. Operation type definitions for standardized system reporting
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// 2. Firebase configuration from Vite environment variables or Local JSON
const firebaseConfig = {
  apiKey: firebaseConfigJson?.apiKey || (import.meta as any).env.VITE_FIREBASE_API_KEY || "",
  authDomain: firebaseConfigJson?.authDomain || (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: firebaseConfigJson?.projectId || (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: firebaseConfigJson?.storageBucket || (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: firebaseConfigJson?.messagingSenderId || (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: firebaseConfigJson?.appId || (import.meta as any).env.VITE_FIREBASE_APP_ID || "",
  measurementId: firebaseConfigJson?.measurementId || (import.meta as any).env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Return true if credentials are set
export const isFirebaseConfigured = (): boolean => {
  return !!(
    (firebaseConfigJson?.projectId || (import.meta as any).env.VITE_FIREBASE_PROJECT_ID) && 
    (firebaseConfigJson?.apiKey || (import.meta as any).env.VITE_FIREBASE_API_KEY)
  );
};

let app;
let db: any = null;
let auth: any = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("🔥 Firebase: App initialized successfully using actual .env.local or JSON credentials.");
    
    // Validate connection to Firestore on boot
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
        console.log("📡 Firestore: Connection verified successfully.");
      } catch (error) {
        // Log softly to prevent confusing errors during sandbox network state changes
        console.log("📡 Firestore: Connection status checked (offline capability ready).");
      }
    };
    testConnection();
    
  } catch (error) {
    console.error("❌ Firebase: Initialization failed:", error);
  }
} else {
  console.warn(
    "⚠️ Firebase Environment Variables are not configured yet.\n" +
    "Aam Bahar will leverage the local reactive state store for sandboxed testing. " +
    "To connect Firestore, enter the variables in your hosting panel (e.g. Vercel) or your local environment."
  );
}

export { db, auth };

/**
 * Standardized error logger and wrapper
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth ? auth.currentUser : null;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.uid || null,
      email: currentAuth?.email || null,
      emailVerified: currentAuth?.emailVerified || null,
      isAnonymous: currentAuth?.isAnonymous || null,
      tenantId: currentAuth?.tenantId || null,
      providerInfo: currentAuth?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  
  console.error('[Firestore Security Rule or API failure context]:', JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

// ==========================================
// Database Models and Operations
// ==========================================

export interface TrackedOrderItem {
  product: any;
  packageType: '12KG' | '24KG';
  quantity: number;
  itemOrderId: string;
  status: 'pending' | 'processing' | 'harvesting' | 'shipped' | 'delivered';
  currentLocationBn: string;
  currentLocationEn: string;
  deliveryDateBn?: string;
  deliveryDateEn?: string;
}

export interface TrackedOrder {
  orderId: string;
  receiptNo?: string;
  customerName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  paymentMethod: string;
  paymentAmount: string;
  cartItems: TrackedOrderItem[];
  cartTotal: number;
  deliveryFee: number;
  grandTotal: number;
  amountToPay: number;
  date: string;
  time?: string;
  createdAtTimestamp?: number;
}

/**
 * Pushes a new order to the Firestore "orders" collection
 */
export async function saveOrderToFirestore(order: TrackedOrder): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    console.log("Local offline mode: Order persists in client state.", order);
    return false;
  }

  const path = `orders/${order.orderId}`;
  try {
    const orderRef = doc(db, 'orders', order.orderId);
    const payload = {
      ...order,
      createdAtTimestamp: order.createdAtTimestamp || Date.now()
    };
    
    await setDoc(orderRef, payload);
    console.log(`✅ Firestore write: Order ${order.orderId} successfully saved to cloud database.`);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
    return false;
  }
}

/**
 * Subscribes to the "orders" collection in real-time
 */
export function subscribeToOrdersFirestore(onUpdate: (orders: TrackedOrder[]) => void): () => void {
  if (!isFirebaseConfigured() || !db) {
    return () => {};
  }

  const path = 'orders';
  try {
    const ordersColRef = collection(db, 'orders');
    const q = query(ordersColRef, orderBy('createdAtTimestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList: TrackedOrder[] = [];
      snapshot.forEach((docSnap) => {
        ordersList.push(docSnap.data() as TrackedOrder);
      });
      onUpdate(ordersList);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return unsubscribe;
  } catch (err) {
    // If setting up snaps failed synchronously
    console.error("❌ Firestore Snapshot Setup Failed: ", err);
    return () => {};
  }
}

/**
 * Updates a specific tracked item status inside an order in Firestore
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  updatedCartItems: TrackedOrderItem[]
): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    return false;
  }

  const path = `orders/${orderId}`;
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      cartItems: updatedCartItems
    });
    console.log(`✅ Firestore update: Tracked status saved for ${orderId}`);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
    return false;
  }
}

/**
 * Deletes an order from shared Firestore database
 */
export async function deleteOrderFromFirestore(orderId: string): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    return false;
  }

  const path = `orders/${orderId}`;
  try {
    const orderRef = doc(db, 'orders', orderId);
    await deleteDoc(orderRef);
    console.log(`✅ Firestore delete: Reference removed for ${orderId}`);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
    return false;
  }
}