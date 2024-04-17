import {
  collection,
  orderBy,
  OrderByDirection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../app-service/firebase-config";

function getAgeRangeQuery(
  lowerRange: number,
  higherRange: number,
  order: OrderByDirection
) {
  const collectionRef = collection(db, "residents");
  const q = query(
    collectionRef,
    where("age", ">=", lowerRange),
    where("age", "<=", higherRange),
    orderBy("age", order)
  );

  return q;
}

export function getExactAgeQuery(age: number) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("age", "==", age));

  return q;
}

export function getGreaterThanAgeQuery(age: number, order: OrderByDirection) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("age", ">", age), orderBy("age", order));

  return q;
}

export function getLessThanAgeQuery(age: number, order: OrderByDirection) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("age", "<", age), orderBy("age", order));

  return q;
}

export function getGenderQuery(gender: string) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("gender", "==", gender));

  return q;
}

export function getStatusQuery(status: string) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("status", "==", status));

  return q;
}

export function getReligionQuery(religion: string) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("religion", "==", religion));

  return q;
}

export function getPurokQuery(purok: string) {
  const collectionRef = collection(db, "residents");
  const q = query(collectionRef, where("purok", "==", purok));

  return q;
}

export function getRegisteredVoterQuery(registeredVoter: boolean | undefined) {
  const collectionRef = collection(db, "residents");
  const q = query(
    collectionRef,
    where("registered_voter", "==", registeredVoter)
  );

  return q;
}

export function getVaccinationStatusQuery(vaccinationStatus: string) {
  const collectionRef = collection(db, "residents");
  const q = query(
    collectionRef,
    where("vaccination_status", "==", vaccinationStatus)
  );

  return q;
}

export default getAgeRangeQuery;
