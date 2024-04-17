function getPercentage(number: number, total: number): number {
  return Math.round((number / total) * 100);
}

export default getPercentage;
