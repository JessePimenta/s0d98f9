"use client";

export function ReleaseInfo() {
  const details = [
    { label: "Type", value: "Album" },
    { label: "Release Date", value: "January 20, 2024" },
    { label: "Label", value: "Record Label" },
    { label: "Genre", value: "Electronic" },
    { label: "Format", value: "Digital" },
    { label: "Total Length", value: "21:45" }
  ];

  return (
    <div className="space-y-4 text-sm">
      {details.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-gray-500">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </div>
  );
}