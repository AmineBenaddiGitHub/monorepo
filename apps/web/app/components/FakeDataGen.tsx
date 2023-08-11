"use client";

import { FormEvent, useState } from "react";

import { Button, MultiSelect, NumberInput, Table } from "ui";
import { trpc } from "../utils/trpc";

type PropertiesType =
  | "bio"
  | "firstName"
  | "lastName"
  | "sex"
  | "jobTitle"
  | "jobType"
  | "phoneNumber";

const options = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "sex", label: "Sex" },
  { value: "bio", label: "Bio" },
  { value: "jobTitle", label: "Job Title" },
  { value: "jobType", label: "Job Type" },
  { value: "phoneNumber", label: "Phone Number" },
];

export function FakeDataGen() {
  const [properties, setProperties] = useState<PropertiesType[]>([]);
  const [length, setLength] = useState<number>(1_000);
  const [headers, setHeaders] = useState<string[]>([]);
  const [body, setBody] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const genData = trpc.generateUsers.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    genData.mutate(
      { properties, length },
      {
        onSuccess: (data) => {
          const dataArray: string[][] = [];
          data.forEach((row) => {
            dataArray.push(Object.values(row));
          });
          setBody(dataArray);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <>
      <form className="flex flex-col gap-2 p-5" onSubmit={handleSubmit}>
        <MultiSelect
          options={options}
          onChange={(e) => {
            setProperties(e.map((option) => option.value) as PropertiesType[]);
            setHeaders(e.map((option) => option.label));
          }}
          required
        />
        <NumberInput
          label="Length"
          value={length}
          onChange={(e) => {
            setLength(e);
          }}
          required
        />
        <Button name="Generate" />
      </form>
      {isLoading && <div className="text-center">Loading...</div>}
      {body.length > 0 && !isLoading && <Table headers={headers} body={body} />}
    </>
  );
}
