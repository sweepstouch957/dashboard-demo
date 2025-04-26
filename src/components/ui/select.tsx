// components/ui/select.tsx

export function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      className="border rounded-lg p-2 text-sm"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}
