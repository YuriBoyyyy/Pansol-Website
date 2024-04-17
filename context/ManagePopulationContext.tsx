import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface ChildrenProp {
  children: React.ReactNode;
}

interface Values {
  selectedFieldName: string;
  selectedAgeFilterType: string;
  setSelectedFieldName: Dispatch<SetStateAction<string>>;
  setSelectedAgeFilterType: Dispatch<SetStateAction<string>>;
  lowerRange: number;
  setLowerRange: Dispatch<SetStateAction<number>>;
  higherRange: number;
  exactAge: number;
  setExactAge: Dispatch<SetStateAction<number>>;
  setHigherRange: Dispatch<SetStateAction<number>>;
  ageGreaterThan: number;
  ageLessThan: number;
  selectedSex: string;
  setAgeGreaterThan: Dispatch<SetStateAction<number>>;
  setAgeLessThan: Dispatch<SetStateAction<number>>;
  setSelectedSex: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setSelectedReligion: Dispatch<SetStateAction<string>>;
  setSelectedPurok: Dispatch<SetStateAction<string>>;
  setRegisteredVoter: Dispatch<SetStateAction<boolean | undefined>>;
  setVaccinationStatus: Dispatch<SetStateAction<string>>;
  status: string;
  selectedReligion: string;
  selectedPurok: string;
  registeredVoter: boolean | undefined;
  vaccinationStatus: string;
}

export const PopulationContext = createContext<Values | null>(null);

export const usePopulation = () => {
  return useContext(PopulationContext);
};

function ManagePopulationContext({ children }: ChildrenProp) {
  const [selectedFieldName, setSelectedFieldName] = useState<string>("");
  const [selectedAgeFilterType, setSelectedAgeFilterType] =
    useState<string>("");
  const [exactAge, setExactAge] = useState<number>(0);
  const [lowerRange, setLowerRange] = useState<number>(0);
  const [higherRange, setHigherRange] = useState<number>(0);
  const [ageGreaterThan, setAgeGreaterThan] = useState<number>(0);
  const [ageLessThan, setAgeLessThan] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [selectedReligion, setSelectedReligion] = useState<string>("");
  const [selectedPurok, setSelectedPurok] = useState<string>("");
  const [registeredVoter, setRegisteredVoter] = useState<boolean>();
  const [vaccinationStatus, setVaccinationStatus] = useState<string>("");

  // SET THE VALUES
  const values = useMemo(() => {
    const items: Values = {
      selectedFieldName,
      setSelectedFieldName,
      lowerRange,
      higherRange,
      setHigherRange,
      setLowerRange,
      exactAge,
      setExactAge,
      selectedAgeFilterType,
      setSelectedAgeFilterType,
      ageGreaterThan,
      setAgeGreaterThan,
      ageLessThan,
      setAgeLessThan,
      setSelectedSex,
      selectedSex,
      setStatus,
      status,
      selectedReligion,
      setSelectedReligion,
      selectedPurok,
      registeredVoter,
      vaccinationStatus,
      setSelectedPurok,
      setRegisteredVoter,
      setVaccinationStatus,
    };
    return items;
  }, [
    ageGreaterThan,
    ageLessThan,
    exactAge,
    higherRange,
    lowerRange,
    registeredVoter,
    selectedAgeFilterType,
    selectedFieldName,
    selectedPurok,
    selectedReligion,
    selectedSex,
    status,
    vaccinationStatus,
  ]);

  return (
    <PopulationContext.Provider value={values}>
      {children}
    </PopulationContext.Provider>
  );
}

export default ManagePopulationContext;
