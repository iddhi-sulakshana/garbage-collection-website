export default function getRole(role) {
  if (role === "admin") return "Admin";
  if (role === "gc") return "Green Captain";
  if (role === "cs") return "Cleaning Staff";
  if (role === "gtf") return "GTF Member";
  return null;
}
