function toSnakeCase(str: string): string {
  return str
    .split(/\s|_|(-)/)
    .map((word) => word.toLowerCase())
    .join("_");
}

export default toSnakeCase;
