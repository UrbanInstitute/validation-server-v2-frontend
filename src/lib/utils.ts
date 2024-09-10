import { CsvResults } from "@/models/apiResponse";
import Config from "@/services/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as d3 from "d3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

export const byte2Kb = (size: number) => {
  return size / 1024;
};

export const addHyphensToUUID = (uuidString: string) => {
  if (uuidString.length !== 32) {
    throw new Error("Invalid UUID string length");
  }

  // Use a regular expression to insert hyphens at the correct positions
  return uuidString.replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
    "$1-$2-$3-$4-$5"
  );
};

export const removeHyphens = (inputString: string) => {
  return inputString.replace(/-/g, "");
};

export const csv2array = (text: string) => {
  const lines = text.split("\n");
  const headers = lines[0].split(",").map((val) => val.replace("\r", ""));
  const data = [];
  // Iterate through the lines, starting from the second line (index 1)
  let obj: Record<string, string> = {};
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    const values = line.split(",");
    obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j].replace("\r", "");
    }

    data.push(obj);
  }
  return data;
};

export const asNumber = (value: string | number): number => {
  return typeof value === "number" ? value : parseFloat(value);
};

const config = new Config();
export const roundNumber = (
  value: number,
  digits: number = config.config.ROUND_PLACES ?? 0
) => {
  return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
};

export const sumCsvEpsilon = (array: CsvResults) => {
  return array.reduce(
    (accumulator, row) => accumulator + parseFloat(`${row.epsilon}`),
    0
  );
};

export const addCommasToNumber = (value: number | string): string => {
  const numStr = String(value);

  const commaNumberStr = numStr.split(".")[0];

  // Use a regular expression to add commas every three digits
  const formattedNum = commaNumberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (numStr.split(".")[1]) {
    return `${formattedNum}.${numStr.split(".")[1]}`;
  }
  return formattedNum;
};

export const formatNumber = (
  value: number | string,
  digits: number = config.config.ROUND_PLACES ?? 0
) => {
  return addCommasToNumber(
    roundNumber(asNumber(value), digits).toFixed(digits)
  );
};

const formatter = (value: number, digits?: number) => {
  if (Math.abs(value) < 0.001) {
    return digits ? `.${digits}e` : ".2e";
  }
  if (Math.abs(value) < 0.01) {
    return digits ? `.${digits}e` : ".3e";
  }
  if (Math.abs(value) < 100) {
    return digits ? `.${digits}f` : ".4f";
  }
  if (Math.abs(value) < 1000) {
    return digits ? `.${digits}f` : ".3f";
  }
  if (Math.abs(value) < 100000) {
    return digits ? `.${digits}f` : ".2f";
  }
  return digits ? `.${digits}e` : ".2e";
};

export const formatNumberAsText = (value: number, digits?: number) =>
  addCommasToNumber(d3.format(formatter(value, digits))(value));
