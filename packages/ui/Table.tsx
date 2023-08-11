"use client";

export function Table({
  headers,
  body,
}: {
  headers: string[];
  body: string[][];
}) {
  return (
    <table className="table-auto m-5">
      <thead>
        <tr className="text-left">
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, idx) => (
          <tr key={idx}>
            {row.map((col, jdx) => (
              <td key={`${idx}${jdx}`}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
