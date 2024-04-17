function getVaccinatedPercentage(
  vaccinated: number,
  unvaccinated: number,
  firstDose: number
): number {
  return Math.round(
    (vaccinated / (vaccinated + unvaccinated + firstDose)) * 100
  );
}

export default getVaccinatedPercentage;
